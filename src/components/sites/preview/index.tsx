import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Flex, Layout, Row, Space, Typography } from 'antd';
// import { RIGHT_BAR_WIDTH, DEV_START_JSON, NAV_BAR_HEIGHT, LEFT_BAR_WIDTH } from './const';

// Window Components
// import Interface from './Interface';
// import Visualisation from './Visualisation';
// import { useParams, useNavigate } from 'react-router-dom';
// import ChooseTemplateModal from './modals/ChooseTemplateModal';

import ReactDOMServer from 'react-dom/server';

import { v4 as uuidv4 } from 'uuid';

import * as Realm from "realm-web";
import { config } from "../../../config";
import axios from 'axios';

// import './index.css';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { EyeFilled, EyeOutlined, MobileFilled, MobileOutlined, RedoOutlined } from '@ant-design/icons';
// import Sections from './Sections';
import { getPromptForGeneration, updateCssStyles } from '../../../utils';
import MainMenu from '../menu';
import { useApp } from '../../RealmApp';
import Logo from '../menu/Logo';
import { FieldContext } from '../../../models';
import { getOnboardingData } from '../generate/getOnboardingData';
import Questionnaire from '../../../models/Questionnaire';
import { useNavigate, useParams } from 'react-router-dom';
import Interface from '../editor/Interface';
import Visualisation from '../editor/Visualisation';
import ChooseTemplateModal from '../editor/modals/ChooseTemplateModal';

export default function Preview () {
  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const onboarding_collection = mongodb.db("legis").collection("Questionnaire");    
  const site_collection = mongodb.db("legis").collection("Site");

  // Set up your GitHub API credentials and repository name
  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken;

  const { site_id } = useParams();
  console.warn("site_id editor", site_id);

//   const [json, setJson] = useState(DEV_START_JSON);
  const [data, setData] = useState<any[]>([]);
//   const [lawFirmName, setLawFirmName] = useState<string>();
//   const [colors, setColors] = useState<string[]>([]);

  const containerRef = useRef(null);

  React.useEffect(() => {
    console.log("Fetching the site from mongo.");
    async function getData() {
      try {
        // Include a query to find the site by its site_id
        const result = await site_collection.find({ _id: new Realm.BSON.ObjectId(site_id) });
  
        if (result.length > 0 && result[0].hasOwnProperty("body_template")) {
            console.log("Found a site with body_template:", result[0].body_template);
            setData(result[0].body_template);
          }
        else {
          console.log("Site doesn't have the body_template yet.");
        }

        if (result.length > 0 && result[0].hasOwnProperty("template_colors")) {
          console.log("Found a site with template_colors:", result[0].template_colors);
        //   setColors(result[0].template_colors);
        }
      else {
        console.log("Site doesn't have the template_colors yet.");
      }
      } catch (error) {
        console.error("Error searching for this site:", error);
      }
      try {
        const result = await onboarding_collection.find({ site_id: new Realm.BSON.ObjectId(site_id) });
        const onboardingData: Questionnaire = result.length > 0 ? result[0] : {};

        // setLawFirmName(onboardingData.LawFirmName);
      } catch (error) {
        console.error("Error fetching for Questionnaire data for this site:", error);
      }
    }
  
    getData();
  }, []); // Include site_id in the dependency array if it may change

  return (
    <Layout style={{width: '100%', height: 'calc(100vh - 46px)'}}>
      <div style={{position: 'absolute', zIndex: 100, left: 150, bottom: 50, background: '#fff9', width: 200, height: 80}}> 
        MADE WITH LEGIS 
      </div>
        <Flex 
            id='visualisation-container' 
            className='editor-scrollbar'
            ref={containerRef}
        >
            <Visualisation data={data} mode='preview' />
        </Flex>
    </Layout>
  );
};