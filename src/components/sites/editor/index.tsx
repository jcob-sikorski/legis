import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { DEV_START_JSON } from './const';

// Window Components
import Interface from './Interface';
import Visualisation from './Visualisation';
import { useParams } from 'react-router-dom';
import ChooseTemplateModal from './modals/ChooseTemplateModal';

import ReactDOMServer from 'react-dom/server';

import { v4 as uuidv4 } from 'uuid';

import * as Realm from "realm-web";
import { config } from "../../../config";
import axios from 'axios';

// TODO: push the created site to mongodb
// TODO: update the page every 5 seconds in mongodb

const Editor: React.FC = () => {
  const app = new Realm.App({ id: config.appId });
  const currentUserID = app.currentUser!.id;
  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");

  // Set up your GitHub API credentials and repository name
  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken;

  const { site_id } = useParams();
  console.warn("site_id editor", site_id);

  const [json, setJson] = useState(DEV_START_JSON);
  const [data, setData] = useState<any[]>([]);

  const [selectedSectionId, setSelectedSectionId] = useState<string>("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");

  const [isAddingNewSection, setIsAddingNewSection] = useState<boolean>(false);

  const [isDevMode, setIsDevMode] = useState<boolean>(false);

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
  }

  function checkIfNoSections() {
    return data && data.length === 0;
  }


  async function onDeploy() {

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
      });
  
      console.log("Pushed HTML content to GitHub repository:", response.data);
  
      console.log("GitHub Pages deployment triggered.");
    } catch (error) {
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
  
        if (result.length > 0 && result[0].hasOwnProperty("bodyTemplate")) {
            console.log("Found a site with bodyTemplate:", result[0].bodyTemplate);
            setData(result[0].bodyTemplate);
          }
        else {
          console.log("Site doesn't have the bodyTemplate yet.");
        }
      } catch (error) {
        console.error("Error searching for this site:", error);
      }
    }
  
    getData();
  }, []); // Include site_id in the dependency array if it may change
  

  React.useEffect(() => {
    console.log("Pushing the site to mongo.");
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
  
    // Set a delay of 5 seconds before updating the site
    const timeoutId = setTimeout(updateSite, 5000);
  
    // Clear the timeout if the component is unmounted or if the data changes
    return () => clearTimeout(timeoutId);
  }, [data]);
  
  

  const visualisationComponent =  <Visualisation 
  data={data} 
  functions={{
    onAddSection,
    checkIfNoSections,
    setSelectedSectionId,
    setSelectedTemplateId,
    setIsDevMode,
  }} 
  // setSelectedTemplateId={setSelectedTemplateId}
  variables={{
    selectedSectionId,
    selectedTemplateId,
    isDevMode,
  }} 
/>

  return (
    <Layout hasSider style={{minHeight: '100vh'}}>
      {visualisationComponent}
      <Interface 
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
          setIsDevMode
        }}
        variables={{
          selectedSectionId,
          selectedTemplateId,
          isDevMode,
        }} 
      />
      <ChooseTemplateModal onTemplateSelected={onTemplateSelected} open={isAddingNewSection} setOpen={setIsAddingNewSection} />
    </Layout>
  );
};

function TestComponent() {
  return <div>
    <h1> TEST COMPONENT HERE! </h1>
    <input />
  </div>
}

export default Editor;