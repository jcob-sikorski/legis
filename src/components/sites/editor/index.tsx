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
import { RocketOutlined } from '@ant-design/icons';
import Sections from './Sections';
import { getPromptForGeneration, updateCssStyles } from '../../../utils';
import MainMenu from '../menu';
import { useApp } from '../../RealmApp';
import Logo from '../menu/Logo';
import { FieldContext } from '../../../models';

// TODO: push the created site to mongodb
// TODO: update the page every 5 seconds in mongodb

const Editor: React.FC = () => {
  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");

  // Set up your GitHub API credentials and repository name
  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken;

  const { site_id } = useParams();
  console.warn("site_id editor", site_id);

  const [json, setJson] = useState(DEV_START_JSON);
  const [data, setData] = useState<any[]>([]);
  
  const [colors, setColors] = useState<string[]>([]);

  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  const [isAddingNewSection, setIsAddingNewSection] = useState<boolean>(false);

  const [isDeploying, setIsDeploying] = useState<boolean>(false);
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
    if (isDeploying) {
      deploy();
    }
  }, [isDeploying])

  async function onDeploy() {
    setIsDeploying(true);    
  }

  async function createSubdomain(site_id: string) {
    // curl -u legiavmi:sZhrVksVJLFC -d "rootdomain=legis.live&domain=hello" "https://host51.registrar-servers.com:2083/json-api/cpanel?cpanel_jsonapi_func=addsubdomain&cpanel_jsonapi_module=SubDomain&cpanel_jsonapi_version=2"
    
    // Replace these variables with your own information
    const cpanelUsername = config.cpanelUsername;
    const cpanelPassword = config.cpanelPassword;
    const domain = 'legis.live';
  
    // API endpoint and request payload
    const apiURL = 'https://host51.registrar-servers.com:2083/json-api/cpanel';
    const payload = {
      cpanel_jsonapi_version: '2',
      cpanel_jsonapi_module: 'SubDomain',
      cpanel_jsonapi_func: 'addsubdomain',
      domain: domain,
      rootdomain: domain,
      dir: `/public_html/${site_id}`,
      subdomain: site_id,
    };
  
    const base64Content = btoa(unescape(encodeURIComponent(`${cpanelUsername}:${cpanelPassword}`)));
  
    // Axios request configuration
    const axios_config = {
      headers: {
        Authorization: `Basic ${base64Content}`,
        'Content-Type': 'application/json',
      },
    };
  
    // Make the API request
    try {
      const response = await axios.post(apiURL, payload, axios_config);
      if (response.status === 200) {
        console.log('Subdomain created successfully!');
      } else {
        console.log('Failed to create subdomain. Status code:', response.status);
        console.log('Error message:', response.data);
      }
    } catch (error) {
      console.error('Error creating subdomain:', error);
    }

    try {
      const updateResult = await site_collection.updateOne(
        { _id: new Realm.BSON.ObjectId(site_id) },
        { $set: { cname: `${site_id}.legis.live` } }
      );
      console.log(`Updated ${updateResult.modifiedCount} document.`);
      const githubRepoResponse = await axios.put(`https://api.github.com/repos/${githubUsername}/${site_id}/pages`, {
        cname: `${site_id}.legis.live`,
        https_enforced: true,
        branch: "gh-pages"
      }, {
        headers: {
          'Authorization': `token ${githubToken}`
        },
      });
      console.log("Updated the domain of the site: ", githubRepoResponse.data);
    }
    catch (error) {
      console.error('Error updating the domain of the site:', error);
    }
  }

  // deploy() function MUST be triggered by useEffect, because it depends on state reactive rendered data. (It must wait for tree to re-render and then generate an html string).
  async function deploy() {
    const pageTitle = `Best Lawyer Page Ever`;

    const htmlBodyString = ReactDOMServer.renderToString(visualisationComponent);
    console.log("htmlBodyString: ", htmlBodyString);

    const htmlString = `
      <!doctype html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">

          <!-- customizable page variables -->
          <title>${pageTitle}</title>
          
          <!-- tailwindcss -->
          <script src="https://cdn.tailwindcss.com"></script>

          <style>
            .color-1 {background-color: ${colors[0]} !important;}
            .color-2 {background-color: ${colors[1]} !important;}
            .color-3 {background-color: ${colors[2]} !important;}
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
      const response = await axios.put(`https://api.github.com/repos/${githubUsername}/${site_id}/contents/index.html`, {
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
              status: 1,
            },
          }
        );        
        console.log("Updated site_url and status to deployed:", JSON.stringify(result));
      } catch (error) {
        console.error("Error updating site:", error);
      }
      navigate("/");
    } catch (error) {
      setIsDeploying(false)
      console.error("Error pushing content and triggering deployment.");
      throw error;
    }

    createSubdomain(site_id as string);
  }

  React.useEffect(() => {
    console.log("Fetching the site from mongo.");
    async function getData() {
      try {
        // Include a query to find the site by its site_id
        const result = await site_collection.find({ _id: new Realm.BSON.ObjectId(site_id) });
  
        if (result.length > 0 && result[0].hasOwnProperty("bodyTemplate")) {
            console.log("Found a site with bodyTemplate:", result[0].bodyTemplate);
            setData(result[0].bodyTemplate);
          }
        else {
          console.log("Site doesn't have the bodyTemplate yet.");
        }

        if (result.length > 0 && result[0].hasOwnProperty("template_colors")) {
          console.log("Found a site with template_colors:", result[0].template_colors);
          setColors(result[0].template_colors);
        }
      else {
        console.log("Site doesn't have the template_colors yet.");
      }
      } catch (error) {
        console.error("Error searching for this site:", error);
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
            $set: { bodyTemplate: data }, // Use $set to update the data field
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
    onDeploy,
    setIsDevMode,
    setIsDeploying,
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

  return (
    <Layout style={{width: '100%'}}>
      <Header style={{ padding: '4px 4px 4px 0px',  zIndex: 10, borderBottom: borderStyle, width: '100%', background: '#f0f1f9', height: NAV_BAR_HEIGHT, position: 'fixed' }}>
        <Row>
          <Col span={18}>
            <Flex justify='center' style={{maxWidth: LEFT_BAR_WIDTH}}>
              <div style={{marginTop: '-16px', marginLeft: '-16px'}}>
                <Logo />
              </div>
              {/* Left Side of navbar */}
            </Flex>
          </Col>
          <Col span={6}>
            <Flex justify='flex-end' gap={4}>
              <Col span={6}>
                <Flex justify='flex-end' gap={4}>
                  <Button style={{maxWidth: '150px', fontWeight: 'bold', backgroundColor: 'black'}} type="primary"  onClick={onGenerate}>
                    Generate
                  </Button>
                  <Button style={{maxWidth: '150px', fontWeight: 'bold', backgroundColor: 'black'}} type="primary" icon={<RocketOutlined />}  onClick={onDeploy}>
                    Deploy
                  </Button>
                </Flex>
              </Col>
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
          style={{
            maxHeight: `calc(100vh - ${NAV_BAR_HEIGHT}px)`, 
            overflowY: 'scroll', 
            marginLeft: LEFT_BAR_WIDTH, 
            marginRight: RIGHT_BAR_WIDTH, 
            background: '#f9fafb', 
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'flex-start',
            boxShadow: '12px 4px solid black',
            scrollBehavior: 'smooth',
          }}>
          {visualisationComponent}
        </Flex>

        {/* Right side */}
        <Flex vertical style={{ width: RIGHT_BAR_WIDTH, background: '#EDF3F9', borderLeft: borderStyle, position: 'fixed', height: '100vh', right: 0 }}>
          {interfaceComponent}
        </Flex>
        
      </Layout>
      
      
      <ChooseTemplateModal onTemplateSelected={onTemplateSelected} open={isAddingNewSection} setOpen={setIsAddingNewSection} />
    </Layout>
            </Layout>
  );
};

export default Editor;