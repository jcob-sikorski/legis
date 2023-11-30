import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Flex, Layout, Row, Space, Typography } from 'antd';
import { RIGHT_BAR_WIDTH, DEV_START_JSON, NAV_BAR_HEIGHT, LEFT_BAR_WIDTH } from './const';

// Window Components
import Interface from './Interface';
import Visualisation from './Visualisation';
import { useParams, useNavigate } from 'react-router-dom';
import ChooseTemplateModal from './modals/ChooseTemplateModal';

import ReactDOMServer from 'react-dom/server';

import { v4 as uuidv4 } from 'uuid';

import * as Realm from "realm-web";
import { config } from "../../../config";
import axios from 'axios';

import './index.css';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { EyeFilled, EyeOutlined, MobileFilled, MobileOutlined, RedoOutlined } from '@ant-design/icons';
import Sections from './Sections';
import { getPromptForGeneration, updateCssStyles } from '../../../utils';
import MainMenu from '../menu';
import { useApp } from '../../RealmApp';
import Logo from '../menu/Logo';
import { FieldContext } from '../../../models';
import { getOnboardingData } from '../generate/getOnboardingData';
import Questionnaire from '../../../models/Questionnaire';
import MobilePreviewModal from './modals/MobilePreviewModal';
import Site from '../../../models/Site';

import { useDispatch } from 'react-redux';
import { setSite } from '../../../redux/actions';

const Editor: React.FC = () => {
  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const onboarding_collection = mongodb.db("legis").collection("Questionnaire");    
  const site_collection = mongodb.db("legis").collection("Site");

  // Set up your GitHub API credentials and repository name
  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken;

  const dispatch = useDispatch();

  const { site_id } = useParams();
  console.warn("site_id editor", site_id);

  const [json, setJson] = useState(DEV_START_JSON);
  const [data, setData] = useState<any[]>([]);

  const [lawFirmName, setLawFirmName] = useState<string>();
  const [colors, setColors] = useState<string[]>([]);
  const [siteTitle, setSiteTitle] = useState<string>();
  const [siteDescription, setSiteDescription] = useState<string>();

  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  const [isAddingNewSection, setIsAddingNewSection] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [displayHostingBox, setDisplayHostingBox] = useState<boolean>(false);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [legisSubdomain, setLegisSubdomain] = useState<boolean>(true);

  const [isDevMode, setIsDevMode] = useState<boolean>(false);

  const [context, setContext] = useState<FieldContext>();

  const dummyRef = useRef<any>(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  function processJson(json: string) {
    // If is able to parse json, then parse it and set to data. If not, display error in console, but don't crash app.
    try {
        setData(JSON.parse(json))
    } catch {
        console.warn("Custom Error: JSON Formatting Error!")
    }
  }

  function processData(data: any[]) {
    // If is able to parse json, then parse it and set to data. If not, display error in console, but don't crash app.
    try {
      if (json != JSON.stringify(data))
        setJson(JSON.stringify(data))
    } catch {
        console.warn("Custom Error: JSON Parsing Error!")
    }
  }

  // shared functions

  function onAddSection() {
    setIsAddingNewSection(true);
  }

  function onTemplateSelected(template_id: string) {
    const section_id = uuidv4()
    setData([
      ...data, 
      { 
        template_id,
        section_id,
      }
    ]);
    setSelectedSectionId(section_id);
    setSelectedTemplateId(template_id);
    dummyRef.current.scrollIntoView({ block: "start", behavior: 'smooth' });
    // scrollToElement(section_id);
  }

  function checkIfNoSections() {
    return data && data.length === 0;
  }

  function scrollToElement(id: string) {
    // const visualisationContainer: any = document.getElementById('visualisation-container');
    // element.scrollTo({
      //   top: 1000,
      //   behavior: "smooth"
      //  });
      // const yOffset = -10; 
      // const y = element.getBoundingClientRect().top + visualisationContainer.pageYOffset  + yOffset;
      // if (element) visualisationContainer.scrollTo({top: y, behavior: 'smooth'});
      const element: any = document.getElementById(id);
    if (element) element.scrollIntoView({block: "end", behavior: 'smooth'});
    // dummyRef.current.scrollIntoView({ block: "start", behavior: 'smooth' });
    // console.log("el: ", element)
   }
  
  function onMobile() {
    // setIsMobile(true);
    window.open(`/preview/${site_id}`, '', 'width=410,height=700');
  }

   function onGenerate() {
    // navigate to /generate
    navigate(`/generate/${site_id}/0`); // (overwrites only template_body field)

    // create useParams hook to know from where the request goes from onboarding or from editor?
    // if onboarding then to color pallete
    //  else go to editor (color pallete is already saved in mongodb)

    // selected during survey
    const surveyData: any = {
      templateIds: ["THero1", "TContact3", "TContact2"],
      lawyerField: 'Real Estate'
    }
    getPromptForGeneration(surveyData);
   }

   useEffect(() => {
    if (colors?.length > 0) {
      updateCssStyles(colors);
    }
   }, [colors])

   
   useEffect(() => {
    document.title = "Legis | " + (siteTitle || lawFirmName || "Edit your site");
   }, [siteTitle])

   useEffect(() => {
    const connectDomainsFlow = async () => {
      if (isDeploying) {
        console.log("COMITING INDEX HTML TO GITHUB");
        commitIndexHtmlToGithub();
        
        const site = await site_collection.find({ _id: new Realm.BSON.ObjectId(site_id) });

        if (!site.domainConnected) {
          if (legisSubdomain) {
            console.log("CONNECTING DEFAULT SUBDOMAIN");
            connectDefaultSubdomain();

            console.log("NAVIGATING TO OVERVIEW SETTINGS");
            dispatch(setSite(site));
            navigate('/overview-settings')
          } else {
            navigate(`/custom-domain-deployment/${site_id}`);
          }
        } else {
          console.log("NAVIGATING TO OVERVIEW SETTINGS");
          dispatch(setSite(site));
          navigate('/overview-settings')
        }
      }
    };
  
    connectDomainsFlow();
  }, [isDeploying]);
  

  async function handlePublishButton() {
    setDisplayHostingBox(!displayHostingBox);
  }

  function convertToValidDomainName(lawFirmName: string): string {
    // Remove spaces
    lawFirmName = lawFirmName.replace(/\s/g, '');

    // Convert to lowercase
    lawFirmName = lawFirmName.toLowerCase();

    // Check if the domain name starts or ends with a dash
    if (lawFirmName.startsWith('-')) {
      lawFirmName = lawFirmName.substring(1);
    }
    if (lawFirmName.endsWith('-')) {
      lawFirmName = lawFirmName.slice(0, -1);
    }

    // Trim the domain name if it's longer than 63 characters
    if (lawFirmName.length > 63) {
        lawFirmName = lawFirmName.substring(0, 63);
    }

    // Check if the domain name contains any characters other than a-z, 0-9, and -
    if (!/^[a-z0-9-]+$/.test(lawFirmName)) {
      lawFirmName = lawFirmName.replace(/[^a-z0-9-]/g, '');
    }


    return `${lawFirmName}`;
}

  async function connectDefaultSubdomain() {
    const validDomain = convertToValidDomainName(lawFirmName!);
    
    const cnameTarget = 'legisbiz.github.io.';
    
    // API endpoint and request payload
    const apiURL = 'https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://host51.registrar-servers.com:2083/json-api/cpanel';
    const payload = {
      cpanel_jsonapi_version: '2',
      cpanel_jsonapi_module: 'ZoneEdit',
      cpanel_jsonapi_func: 'add_zone_record',
      domain: 'legis.live',
      name: validDomain,
      type: 'CNAME',
      cname: cnameTarget,
    };
    
    const base64Content = btoa(unescape(encodeURIComponent(`${config.cpanelUsername}:${config.cpanelPassword}`)));
    
    // Axios request configuration
    const axios_config = {
      headers: {
        Authorization: `Basic ${base64Content}`,
        'Content-Type': 'application/json',
      }
    };
    
    // Make the API request
    try {
      const response = await axios.post(apiURL, payload, axios_config);
      if (response.status === 200) {
        console.log('CNAME record created successfully!');
      } else {
        console.log('Failed to create CNAME record. Status code:', response.status);
        console.log('Error message:', response.data);
      }
    } catch (error) {
      console.error('Error creating CNAME record:', error);
    }

    try {
      const githubRepoResponse = await axios.put(`https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://api.github.com/repos/${githubUsername}/${site_id}/pages`, {
        cname: `${validDomain}.legis.live`,
        source: "gh-pages"
      }, {
        headers: {
          'Authorization': `token ${githubToken}`
        },
      });
      console.log("Updated the github domain of the site: ", githubRepoResponse.data);
    }
    catch (error) {
      console.error('Error updating the domain of the site:', error);
    }

    const updateResult = await site_collection.updateOne(
      { _id: new Realm.BSON.ObjectId(site_id) },
      { $set: { 
        cname: `${validDomain}.legis.live`,
        domainConnected: 1
        }
      }
    );
    console.log(`Updated ${updateResult.modifiedCount} document.`);
  }


  async function commitIndexHtmlToGithub() {
    const pageTitle = `Best Lawyer Page Ever`;

    const htmlBodyString = ReactDOMServer.renderToString(visualisationComponent);
    console.log("htmlBodyString: ", htmlBodyString);

    const htmlString = `
      <!doctype html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">

          <!-- IE -->
          <link rel="shortcut icon" type="image/x-icon" href="https://ucarecdn.com/1f9d5fc9-ee6b-4254-afe1-7633dd94c37c/" />
          <!-- other browsers -->
          <link rel="icon" type="image/x-icon" href="https://ucarecdn.com/1f9d5fc9-ee6b-4254-afe1-7633dd94c37c/" />


          <!-- customizable page variables -->
          <title>${pageTitle}</title>
          
          <!-- tailwindcss -->
          <script src="https://cdn.tailwindcss.com"></script>

          <!-- Google Fonts -->
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">      

          <!-- Bootstrap Icons -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">



          <style>

            * {
              scroll-behavior: smooth;
            }

            :root {
              --legis-color-1: ${colors[0]};
              --legis-color-2: ${colors[1]};
              --legis-color-3: ${colors[2]};
            }

            .color-1 {background-color: var(--legis-color-1) !important;}
            .color-2 {background-color: var(--legis-color-2) !important;}
            .color-3 {background-color: var(--legis-color-3) !important;}

          </style>
        </head>
        <body>
          ${htmlBodyString}
        </body>
      </html>
    `

    console.log("htmlString: ", htmlString);
  
    try {
      const base64Content = btoa(unescape(encodeURIComponent(htmlString))); // Convert HTML string to base64
      const response = await axios.put(`https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://api.github.com/repos/${githubUsername}/${site_id}/contents/index.html`, {
        message: 'Initial commit',
        content: base64Content,
        branch: 'gh-pages', // Specify the 'gh-pages' branch
      }, {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      })

      setIsDeploying(false)
  
      console.log("Pushed HTML content to GitHub repository:", response.data);
  
      console.log("GitHub Pages deployment triggered.");

      console.log("Pushing the site to mongo.");

      try {
        const result = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site_id) }, // Specify the query to find the site by site_id
          {
            $set: {
              site_url: "https://legisbiz.github.io/" + site_id,
            },
          }
        );        
        console.log("Updated site_url and status to deployed:", JSON.stringify(result));
      } catch (error) {
        console.error("Error updating site:", error);
      }
    } catch (error) {
      setIsDeploying(false)
      console.error("Error pushing content and triggering deployment.");
      throw error;
    }
  }

  React.useEffect(() => {
    console.log("Fetching the site from mongo.");
    async function getData() {
      try {
        // Include a query to find the site by its site_id
        const result = await site_collection.find({ _id: new Realm.BSON.ObjectId(site_id) });
  
        let fieldName = 'body_template';
        if (result.length > 0 && result[0].hasOwnProperty(fieldName)) {
            console.log(`Found a site with ${fieldName}:`, result[0][fieldName]);
            setData(result[0][fieldName]);
        }
        else {
          console.log(`Site doesn't have ${fieldName} value yet.`);
        }

        fieldName = 'template_colors';
        if (result.length > 0 && result[0].hasOwnProperty(fieldName)) {
            console.log(`Found a site with ${fieldName}:`, result[0][fieldName]);
            setColors(result[0][fieldName]);
        }
        else {
          console.log(`Site doesn't have ${fieldName} value yet.`);
        }
        
        fieldName = 'title';
        if (result.length > 0 && result[0].hasOwnProperty(fieldName)) {
            console.log(`Found a site with ${fieldName}:`, result[0][fieldName]);
            setSiteTitle(result[0][fieldName]);
        }
        else {
          console.log(`Site doesn't have ${fieldName} value yet.`);
        }

        fieldName = 'description';
        if (result.length > 0 && result[0].hasOwnProperty(fieldName)) {
            console.log(`Found a site with ${fieldName}:`, result[0][fieldName]);
            setSiteDescription(result[0][fieldName]);
        }
        else {
          console.log(`Site doesn't have ${fieldName} value yet.`);
        }
      } catch (error) {
        console.error("Error searching for this site:", error);
      }
      try {
        const result = await onboarding_collection.find({ site_id: new Realm.BSON.ObjectId(site_id) });
        const onboardingData: Questionnaire = result.length > 0 ? result[0] : {};

        setLawFirmName(onboardingData.LawFirmName);
      } catch (error) {
        console.error("Error fetching for Questionnaire data for this site:", error);
      }

      try {
        const result = await site_collection.find({ _id: new Realm.BSON.ObjectId(site_id) });
        const site: Site = result.length > 0 ? result[0] : {};

        if (result.length > 0 && result[0].hasOwnProperty("title")) {
          console.log("Found a site with template_colors:", result[0].template_colors);
          setColors(result[0].template_colors);
        }
        else {
          console.log("Site doesn't have the template_colors yet.");
        }
      } catch (error) {
        console.error("Error fetching for Questionnaire data for this site:", error);
      }
    }
  
    getData();
  }, []); // Include site_id in the dependency array if it may change
  
  const updateSite = async () => {
    if (data) {
      try {
        const result = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site_id) }, // Specify the query to find the site by site_id
          {
            $set: { body_template: data }, // Use $set to update the data field
          }
        );

        console.log("Updated site:", JSON.stringify(result));
      } catch (error) {
        console.error("Error updating site:", error);
      }
    }
  };

  React.useEffect(() => {
    console.log("Pushing the site to mongo.");
    
    // Set a delay of 5 seconds before updating the site
    const timeoutId = setTimeout(updateSite, 5000);
  
    // Clear the timeout if the component is unmounted or if the data changes
    return () => clearTimeout(timeoutId);
  }, [data]);
  
  const sectionsComponent = <MainMenu />

  const interfaceComponent = <Interface 
  setJson={setJson} 
  json={json}
  data={data}
  setData={setData}
  processJson={processJson} 
  functions={{
    onAddSection,
    setSelectedSectionId,
    setSelectedTemplateId,
    handlePublishButton,
    setIsDevMode,
    setIsDeploying,
    setContext,
  }}
  variables={{
    selectedSectionId,
    selectedTemplateId,
    isDevMode,
    isDeploying,
    context
  }} 
  />;

  const visualisationComponent = <Visualisation 
  data={data} 
  functions={{
    onAddSection,
    checkIfNoSections,
    setSelectedSectionId,
    setSelectedTemplateId,
    setIsDevMode,
    setData,
    setContext,
  }} 
  // setSelectedTemplateId={setSelectedTemplateId}
  variables={{
    selectedSectionId,
    selectedTemplateId,
    isDevMode,
    isDeploying,
    dummyRef,
    containerRef
  }} 
/>

  const borderStyle = '1px solid #0002';

  const containerStyle: any = {
    maxHeight: `calc(100vh - ${NAV_BAR_HEIGHT}px)`, 
    overflowY: 'scroll', 
    marginLeft: LEFT_BAR_WIDTH, 
    marginRight: RIGHT_BAR_WIDTH, 
    background: '#f9fafb', 
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'flex-start',
    boxShadow: '12px 4px solid black',
    // scrollBehavior: 'smooth',
    scrollBehavior: 'smooth',
    scroll: 'smooth',
  }

  return (
    <Layout style={{width: '100%', height: 'calc(100vh - 46px)'}}>
      {/* <div style={{position: 'absolute', zIndex: 100, left: 150, bottom: 50, background: '#fff9', width: 200, height: 80}}> 
      MADE WITH LEGIS 
      </div> */}
      <Header style={{ padding: '4px', paddingLeft: 0, zIndex: 10, borderBottom: borderStyle, width: '100%', background: '#f0f1f9', height: NAV_BAR_HEIGHT, position: 'fixed' }}>
        <Row>
          <Col span={18}>
            <Flex justify='center' style={{maxWidth: LEFT_BAR_WIDTH}}>
              <div style={{marginTop: '0px', marginLeft: '-20px'}}>
                <Logo />
              </div>
            </Flex>
          </Col>
          <Col span={6}>
            <Flex justify='flex-end' align='center' className='bg-red-500x items-center h-full' style={{marginTop: -4}} gap={0}>
              {/* <Col span={6}> */}
                <Flex justify='flex-end' className='h-fullx bg-yellow-500x' gap={6}>
                    <Button
                      type="primary"
                      onClick={onMobile}
                      className="custom-button"
                      icon={<MobileFilled />}
                      style={{ padding: 24, margin: 0 }}
                    />
                    <Button
                      type="primary"
                      onClick={onGenerate}
                      className="custom-button"
                      icon={<RedoOutlined />}
                      style={{ padding: 24, margin: 0 }}
                    />
                    <a href={`/preview/${site_id}`} target='_blank'>
                      <Button
                        type="primary"
                        // onClick={onPreview}
                        className="custom-button"
                        icon={<EyeFilled />}
                        style={{ padding: 24, margin: 0 }}
                      />
                    </a>
                    <Button
                        type="primary"
                        onClick={handlePublishButton}
                        className="custom-button bg-blue-500"
                        style={{padding: 24, margin: 0 }} // Use marginLeft: 'auto' to push the button to the right
                        >
                        Publish
                      </Button>
                    <div style={{ position: 'relative' }}>
                      
                      {displayHostingBox ? (
                        <div style={{ position: 'absolute', top: NAV_BAR_HEIGHT , backgroundColor: '#ffffff', zIndex: 1, right: 10, height: 255, width: 430, borderRadius: 8 }}>
                          <h1 style={{ fontSize: 20, fontWeight: '600', marginLeft: 10 }}>Choose Where to Publish</h1>
                          <button onClick={() => { setLegisSubdomain(true); setIsDeploying(true); }} style={{ height: 85, width: '95%', marginInline: 10, marginBottom: 10, padding: 5, borderRadius: 5, backgroundColor: '#ECECEC', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', }}>
                            <h2 style={{ fontSize: 16, fontWeight: '600', wordWrap: 'break-word', lineHeight: '35px', marginLeft: 5 }}>Connect to legis subdomain</h2>
                            <h2 style={{ fontSize: 14, fontWeight: '400', wordWrap: 'break-word', lineHeight: '20px', marginLeft: 5 }}>Click here to publish your website on the legis</h2>
                            <h2 style={{ fontSize: 14, fontWeight: '400', wordWrap: 'break-word', lineHeight: '20px', marginLeft: 5 }}>subdomain for free.</h2>
                          </button>
                          <button onClick={() => { setLegisSubdomain(false); setIsDeploying(true); }} style={{ height: 85, width: '95%', marginInline: 10, padding: 5, borderRadius: 5, backgroundColor: '#ECECEC', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', }}>
                            <h2 style={{ fontSize: 16, fontWeight: '600', wordWrap: 'break-word', lineHeight: '35px', marginLeft: 5 }}>Connect your custom domain</h2>
                            <h2 style={{ fontSize: 14, fontWeight: '400', wordWrap: 'break-word', lineHeight: '20px', marginLeft: 5 }}>Become a Legis pro member & connect your</h2>
                            <h2 style={{ fontSize: 14, fontWeight: '400', wordWrap: 'break-word', lineHeight: '20px', marginLeft: 5 }}>custom domain for $49 a year.</h2>
                          </button>
                        </div>
                      ) : (
                        null
                      )}
                    </div>
                </Flex>
              {/* </Col> */}
            </Flex>
          </Col>
        </Row>
      </Header>
      <Layout hasSider style={{ marginTop: NAV_BAR_HEIGHT}}>
        <Layout>
          {/* Left side */}
          <Flex  style={{ width: LEFT_BAR_WIDTH, background: '#EDF3F9', borderRight: borderStyle, position: 'fixed', height: '100vh', left: 0 }}>
            {sectionsComponent}
          </Flex>
          {/* Center */}
          <Flex 
            id='visualisation-container' 
            className='editor-scrollbar'
            ref={containerRef} 
            style={containerStyle} >
            {visualisationComponent}
          </Flex>
          {/* Right side */}
          <Flex vertical style={{ 
            width: RIGHT_BAR_WIDTH, 
            background: '#EDF3F9', 
            borderLeft: borderStyle, 
            position: 'fixed', 
            height: '100vh', 
            right: 0 }}>

            {interfaceComponent}
          </Flex>  
        </Layout>
        <ChooseTemplateModal onTemplateSelected={onTemplateSelected} open={isAddingNewSection} setOpen={setIsAddingNewSection} />
        {/* <MobilePreviewModal data={data} open={isMobile} setOpen={setIsMobile} /> */}
      </Layout>
    </Layout>
  );
};

export default Editor;