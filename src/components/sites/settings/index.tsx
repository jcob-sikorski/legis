import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useApp } from "../../RealmApp";
import * as Realm from "realm-web";

import { message } from "antd";

import { config } from "../../../config";

import axios from "axios";

import SiteComponent from "./Site";
import Visualisation from "../editor/Visualisation";
import { getHeroImageURLFromBodyTemplate } from "../../../utils";
import ReactDOMServer from "react-dom/server";
import HyperspaceCSS from "../skeletons/Hyperspace/assets/css/main.css?inline";
import ParadigmShiftCSS from "../skeletons/ParadigmShift/assets/css/main.css?inline";
import SolidStateCSS from "../skeletons/SolidState/assets/css/main.css?inline";
import StellarCSS from "../skeletons/Stellar/assets/css/main.css?inline";
import StoryCSS from "../skeletons/Story/assets/css/main.css?inline";
import IFrame from "../../iFrame";
import { NAV_BAR_HEIGHT } from "../editor/const";
// you can click and unclick the publish button
// if you unclick the publish button the cname is removed
// if you click on publish using default domain then you can change the default domain in the pop up and click publish
// while the site status is not "built" then all the buttons and changes are not available (save changes button is not working and color is gray)

//  remove all the other settings

// Display the blank page when the data is fetched from mongo
// Display the publishing text on useEffect is status o built

// there is only one page for the settings. create a root just as is customDomainDeployment

function Settings() {
  const { site_id } = useParams();
  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken;

  const [deploymentStatus, setDeploymentStatus] = useState<string>("building");
  const [siteDataFetched, setSiteDataFetched] = useState<boolean>(false);

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [siteUrl, setSiteUrl] = useState<string>();
  const [domainConnected, setDomainConnected] = useState<number>();
  const [faviconUrl, setFaviconUrl] = useState<string>();
  const [cname, setCname] = useState<string>();
  const [templateColors, setTemplateColors] = useState<string[]>();
  const [bodyTemplate, setBodyTemplate] = useState<string>();
  const [templateSetId, setTemplateSetId] = useState<string>();
  const [customDomain, setCustomDomain] = useState<string>();
  const [lawFirmName, setLawFirmName] = useState<string>();

  const [data, setData] = useState<any[]>([]);
  const [cssString, setCssString] = useState<string>("");

  const app: any = useApp();
  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");
  const survey_collection = mongodb.db("legis").collection("Questionnaire");
  // const onboarding_collection = mongodb.db("legis").collection("Questionnaire");
  useEffect(() => {
    switch (templateSetId as any) {
      default:
      case "Hyperspace":
        setCssString(HyperspaceCSS);
        break;
      case "ParadigmShift":
        setCssString(ParadigmShiftCSS);
        break;
      case "SolidState":
        setCssString(SolidStateCSS);
        break;
      case "Stellar":
        setCssString(StellarCSS);
        break;
      case "Story":
        setCssString(StoryCSS);
        break;
    }
  }, [templateSetId]);

  useEffect(() => {
    console.log("Fetching the site from mongo.");
    async function getData() {
      try {
        // Include a query to find the site by its site_id
        const result = await site_collection.find({
          _id: new Realm.BSON.ObjectId(site_id),
        });

        const getFromMongoDB = (fieldName: string, setter: any) => {
          if (result.length > 0 && result[0].hasOwnProperty(fieldName)) {
            console.log(
              `Found a site with ${fieldName}:`,
              result[0][fieldName]
            );
            // message.info(result[0][fieldName]);
            setter(result[0][fieldName]);
          } else {
            console.log(`Site doesn't have ${fieldName} value yet.`);
          }
        };

        getFromMongoDB("body_template", setData);
        getFromMongoDB("template_set_id", setTemplateSetId);
        // message.info("asd");
        // getFromMongoDB("template_colors", setColors);
        // getFromMongoDB("template_set_id", setTemplateSetId);
        // getFromMongoDB("title", setSiteTitle);
      } catch (error) {
        console.error("Error searching for this site:", error);
      }

      try {
        const result = await site_collection.find({
          _id: new Realm.BSON.ObjectId(site_id),
        });

        if (result.length > 0 && result[0].hasOwnProperty("title")) {
          console.log(
            "Found a site with template_colors:",
            result[0].template_colors
          );
          // setColors(result[0].template_colors);
        } else {
          console.log("Site doesn't have the template_colors yet.");
        }
      } catch (error) {
        console.error(
          "Error fetching for Questionnaire data for this site:",
          error
        );
      }
    }

    getData();
  }, []); // Include site_id in the dependency array if it may change

  async function checkDeploymentStatus() {
    console.log("checkDeploymentStatus");
    let status = "building";
    while (status === "building") {
      console.log("checking");
      const response = await axios.get(
        `https://api.github.com/repos/${githubUsername}/${site_id}/pages/builds/latest`,
        {
          auth: {
            username: githubUsername,
            password: githubToken,
          },
        }
      );
      status = response.data?.status;
      setDeploymentStatus(status);
      console.log("DEPLOYMENT STATUS: ", status);
      if (status === "building") {
        await new Promise((resolve) => setTimeout(resolve, 30000)); // wait for 30 seconds
      } else {
        setDeploymentStatus(status);
      }
    }
  }
  const visualisationComponent = (
    <Visualisation
      template_set_id={templateSetId}
      data={data}
      mode="showcase"
    />
  );

  // React component
  useEffect(() => {
    // checkDeploymentStatus();

    const fetchSiteData = async () => {
      let result = await site_collection.find({
        _id: new Realm.BSON.ObjectId(site_id),
      });

      setTitle(result[0]?.title);
      setDescription(result[0]?.description);
      setSiteUrl(result[0]?.site_url);
      setDomainConnected(result[0]?.domainConnected);
      setFaviconUrl(result[0]?.favicon_url);
      setCname(result[0]?.cname);
      setTemplateColors(result[0]?.template_colors);
      setBodyTemplate(result[0]?.body_template);
      setTemplateSetId(result[0]?.template_set_id);
      setCustomDomain(result[0]?.customDomain);

      result = await survey_collection.find({
        site_id: new Realm.BSON.ObjectId(site_id),
      });

      setLawFirmName(result[0].LawFirmName);
    };

    fetchSiteData();
    setSiteDataFetched(true);
  }, []);

  const saveChanges = async () => {
    console.log("SAVE CHANGES");
    await site_collection.updateOne(
      { _id: new Realm.BSON.ObjectID(site_id) },
      {
        $set: {
          title: title,
          description: description,
          site_url: siteUrl,
          domainConnected: domainConnected,
          favicon_url: faviconUrl,
          cname: cname,
          template_colors: templateColors,
          body_template: bodyTemplate,
          template_set_id: templateSetId,
          customDomain: customDomain,
        },
      }
    );
  };

  const connectDomainsFlow = async () => {
    // ALSO RETURN ERROR IF THE DOMAIN IS EMPTY
    const validDomain = convertToValidDomainName(lawFirmName!);

    const res = await site_collection.findOne({
      cname: `${validDomain}.legis.live`,
    });
    if (res) {
      message.error("Such subdomain already exists.");
      return;
    }

    console.log("COMITING INDEX HTML TO GITHUB");
    // await commitIndexHtmlToGithub();
    //  YOU ARE HERE IMPLEMENTING THE DEPLOYMENT FOR DEFAULT SUBDOMAIN

    // await checkDeploymentStatus();

    console.log("CONNECTING DEFAULT SUBDOMAIN");
    connectDefaultSubdomain();
  };

  function convertToValidDomainName(lawFirmName: string): string {
    // Remove spaces
    lawFirmName = lawFirmName.replace(/\s/g, "");

    // Convert to lowercase
    lawFirmName = lawFirmName.toLowerCase();

    // Check if the domain name starts or ends with a dash
    if (lawFirmName.startsWith("-")) {
      lawFirmName = lawFirmName.substring(1);
    }
    if (lawFirmName.endsWith("-")) {
      lawFirmName = lawFirmName.slice(0, -1);
    }

    // Trim the domain name if it's longer than 63 characters
    if (lawFirmName.length > 63) {
      lawFirmName = lawFirmName.substring(0, 63);
    }

    // Check if the domain name contains any characters other than a-z, 0-9, and -
    if (!/^[a-z0-9-]+$/.test(lawFirmName)) {
      lawFirmName = lawFirmName.replace(/[^a-z0-9-]/g, "");
    }

    return `${lawFirmName}`;
  }

  async function connectDefaultSubdomain() {
    const validDomain = convertToValidDomainName(lawFirmName!);

    const cnameTarget = "legisbiz.github.io.";

    // API endpoint and request payload
    const apiURL =
      "https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://host51.registrar-servers.com:2083/json-api/cpanel";
    const payload = {
      cpanel_jsonapi_version: "2",
      cpanel_jsonapi_module: "ZoneEdit",
      cpanel_jsonapi_func: "add_zone_record",
      domain: "legis.live",
      name: validDomain,
      type: "CNAME",
      cname: cnameTarget,
    };

    const base64Content = btoa(
      unescape(
        encodeURIComponent(`${config.cpanelUsername}:${config.cpanelPassword}`)
      )
    );

    // Axios request configuration
    const axios_config = {
      headers: {
        Authorization: `Basic ${base64Content}`,
        "Content-Type": "application/json",
      },
    };

    // Make the API request
    try {
      const response = await axios.post(apiURL, payload, axios_config);
      if (response.status === 200) {
        console.log("CNAME record created successfully!");

        try {
          const githubRepoResponse = await axios.put(
            `https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://api.github.com/repos/${githubUsername}/${site_id}/pages`,
            {
              cname: `${validDomain}.legis.live`,
              source: "gh-pages",
            },
            {
              headers: {
                Authorization: `token ${githubToken}`,
              },
            }
          );
          console.log(
            "Updated the github domain of the site: ",
            githubRepoResponse.data
          );

          const updateResult = await site_collection.updateOne(
            { _id: new Realm.BSON.ObjectId(site_id) },
            {
              $set: {
                cname: `${validDomain}.legis.live`,
                domainConnected: 1,
              },
            }
          );
          console.log(`Updated ${updateResult.modifiedCount} document.`);
        } catch (error) {
          console.error("Error updating the domain of the site:", error);
        }
      }
    } catch (error) {
      console.error("Error creating CNAME record:", error);
    }
  }

  async function commitIndexHtmlToGithub() {
    // ALSO RETURN ERROR IF THE DOMAIN IS EMPTY
    const validDomain = convertToValidDomainName(lawFirmName!);

    const res = await site_collection.findOne({
      cname: `${validDomain}.legis.live`,
    });
    if (res) {
      message.error("Such subdomain already exists.");
      return;
    }

    // // SEO data
    // const city = "San Francisco";
    // const state = "CA, California";
    // const practiceAreas = onboardingData
    //   ? onboardingData.MainPracticeArea +
    //     ", " +
    //     onboardingData.SpecializedPracticeAreas
    //   : "";
    // const userAddedKeywords = "TOP 3 in California";
    const image = getHeroImageURLFromBodyTemplate(data);

    // // Final SEO data to put in HTML
    // const metadata = {
    //   description: siteDescription,
    //   keywords: `lawyers, legal services, ${practiceAreas}, ${city} attorneys, ${state} law firm, litigation, legal advice, legal consultation, ${userAddedKeywords}`,
    //   author: lawFirmName,
    //   image,
    // };

    const htmlBodyString = ReactDOMServer.renderToString(
      visualisationComponent
    );
    // console.log("htmlBodyString: ", htmlBodyString);

    const htmlString = `
      <!doctype html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0">

          <!-- IE -->
          <link rel="shortcut icon" type="image/x-icon" href="${faviconUrl}" />
          <!-- other browsers -->
          <link rel="icon" type="image/x-icon" href="${faviconUrl}" />


          <!-- customizable page variables -->
          <title>${title}</title>

          <!-- Web Crawlers -->
          <meta name="robots" content="index, follow">

          <!-- Facebook Meta Tags (Open Graph) -->
          <meta property="og:type" content="website">
          <meta property="og:title" content="${title}">
          <meta property="og:description" content="${description}">
          <meta property="og:image" content="${image}">

          <!-- Twitter Meta Tags -->
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="${title}">
          <meta name="twitter:description" content="${description}">
          <meta name="twitter:image" content="${image}">

          
          <!-- tailwindcss -->
          <script src="https://cdn.tailwindcss.com"></script>

          <!-- Google Fonts -->
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;0,6..96,800;0,6..96,900;1,6..96,400;1,6..96,500;1,6..96,600;1,6..96,700;1,6..96,800;1,6..96,900&family=Playfair+Display&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
            rel="stylesheet"
          />
          
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          />

          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100&family=Oswald:wght@200;300;400;500;600;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

          <!-- Bootstrap Icons -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">

          <style>

            * {
              scroll-behavior: smooth;
            }

            :root {
              --legis-color-1: ${templateColors![0]};
              --legis-color-2: ${templateColors![1]};
              --legis-color-3: ${templateColors![2]};

              --legis-font-main: 'IBM Plex Sans';
            }

            .color-1 {background-color: var(--legis-color-1) !important;}
            .color-2 {background-color: var(--legis-color-2) !important;}
            .color-3 {background-color: var(--legis-color-3) !important;}

          </style>

          <style>
            ${cssString}
          </style>
        </head>
        <body>
          ${htmlBodyString}
        </body>
      </html>
    `;

    const base64Content = btoa(unescape(encodeURIComponent(htmlString))); // Convert HTML string to base64

    // console.log("htmlString: ", htmlString);

    try {
      const site = await site_collection.findOne({
        _id: new Realm.BSON.ObjectId(site_id),
      });

      const site_url = site.site_url;

      if (site_url) {
        // update the file on github
        const getFile = await axios.get(
          // get file sha
          `https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://api.github.com/repos/${githubUsername}/${site_id}/contents/index.html`,
          {
            headers: {
              Authorization: `token ${githubToken}`,
            },
          }
        );

        const fileSha = getFile.data.sha;

        const response = await axios.put(
          // update the file
          `https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://api.github.com/repos/${githubUsername}/${site_id}/contents/index.html`,
          {
            message: "Update commit",
            content: base64Content,
            branch: "gh-pages", // Specify the 'gh-pages' branch
            sha: fileSha, // Include the file's SHA
          },
          {
            headers: {
              Authorization: `token ${githubToken}`,
            },
          }
        );
      } else {
        // create new file on github
        const response = await axios.put(
          // create new file
          `https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://api.github.com/repos/${githubUsername}/${site_id}/contents/index.html`,
          {
            message: "Initial commit",
            content: base64Content,
            branch: "gh-pages", // Specify the 'gh-pages' branch
          },
          {
            headers: {
              Authorization: `token ${githubToken}`,
            },
          }
        );

        const result = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site_id) }, // Specify the query to find the site by site_id
          {
            $set: {
              site_url: "https://legisbiz.github.io/" + site_id,
            },
          }
        );
      }

      console.log("GitHub Pages deployment triggered.");
      await checkDeploymentStatus();
    } catch (error) {
      console.error("Error pushing content and triggering deployment.", error);
      throw error;
    }
  }

  return (
    <>
      {/* {deploymentStatus === "building" &&
        message.loading({
          content: "Deploying...",
          key: "deploying",
          duration: 0,
          style: {
            marginTop: "20vh",
          },
        })} */}
      {/* {deploymentStatus !== "building" && siteDataFetched === true && ( */}
      <SiteComponent
        deploymentStatus={deploymentStatus}
        site_id={site_id || ""}
        title={title || ""}
        description={description || ""}
        siteUrl={siteUrl || ""}
        domainConnected={domainConnected || ""}
        faviconUrl={faviconUrl || ""}
        cname={cname || ""}
        templateColors={templateColors || ""}
        bodyTemplate={bodyTemplate || ""}
        templateSetId={templateSetId || ""}
        customDomain={customDomain || ""}
        saveChanges={saveChanges}
        commitIndexHtmlToGithub={commitIndexHtmlToGithub}
        connectDefaultSubdomain={connectDefaultSubdomain}
      />
      {/* )} */}

      <IFrame
        cssString={cssString}
        colors={templateColors}
        style={
          false
            ? {
                width: "360px",
                // padding: 10,
                height: "100%",
                maxHeight: `calc(100vh - ${NAV_BAR_HEIGHT}px + 0px)`,
              }
            : {
                width: "100%",
                padding: 10,
                height: "100vh",
                maxHeight: `calc(100vh - ${NAV_BAR_HEIGHT}px + 0px)`,
              }
        }
      >
        {visualisationComponent}
      </IFrame>
    </>
  );
}

export default Settings;
