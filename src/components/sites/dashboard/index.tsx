import React, { useState } from 'react';
import {
  PlusOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col, Flex } from 'antd';
import SiteCard from './SiteCard';
import * as Realm from "realm-web";
import { useApp } from "./../../RealmApp";
import Site from '../../../models/Site';
import Sidebar from '../menu';
import { config } from "../../../config";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import './../../../index.css';
import { updateCssStyles } from '../../../utils';
import Logo from '../menu/Logo';

const { Content } = Layout;

export const Dashboard: React.FC = () => {
  const [sites, setSites] = useState<Site[]>([]);

  const navigate = useNavigate();
  const { email } = useParams();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const app: any = useApp();
  
  const currentUserID = app.currentUser!.id;

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");
  const user_collection = mongodb.db("legis").collection("User");

  // Set up your GitHub API credentials and repository name
  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken;

  React.useEffect(() => {
    console.log("sites: ", sites);
  }, [sites]);

  React.useEffect(() => {
    const insertUser = async () => {
      if (email) {
        // Create a new user document
        const newUser = {
          _id: new Realm.BSON.ObjectId(app.currentUser!.id),
          email: email
        };
                
        // Insert the new user document into the collection
        const result = await user_collection.insertOne(newUser);
        console.log("Created user:", JSON.stringify(result));
      }
    };
  
    insertUser();
  }, []);
  

  const userQuery = { "user_id": new Realm.BSON.ObjectId(currentUserID) };

  React.useEffect(() => {
    async function searchDocuments() {
      try {
        const result = await site_collection.find(userQuery);
        const documents = result.map((doc: any) => {
          // Convert user_id and _id to strings
          const modifiedDoc = {
            ...doc,
            user_id: doc.user_id.toString(),
            _id: doc._id.toString(),
          };
          return modifiedDoc;
        });
        console.log("Found documents:", JSON.stringify(documents));
        setSites(documents);
      } catch (error) {
        console.error("Error searching documents:", error);
      }
    }

    searchDocuments();
  }, []);

  async function logOut() {
    app.logOut();
  }

  async function createSite() {
    if (sites.length === 0) {
      const data = {
        email: email,
        eventName: "onboardingGuidelines"
      };
      
      const tsx = {
        method: 'post',
        url: 'https://app.loops.so/api/v1/events/send',
        headers: { 
          Authorization: `Bearer ${config.loopsKey}`
        },
        data : data
      };
      
      const response = await axios(tsx);

      console.log("LOOPS RESPONSE: ", (response));
    }
    
    const newId = new Realm.BSON.ObjectId()

    const newSite = {
      user_id: new Realm.BSON.ObjectId(currentUserID),
      _id: newId,
      title: `Title ${sites.length}`,
      subtitle: "Your Site Subtitle",
      description: "Your Site Description",
      deleted: 0,
      image_url: "https://picsum.photos/200/300",
      site_url: "",
      status: 0,
      share_image_url: '',
      favicon_url: '',
      cname: '',
      template_colors: ["#efefee", "#a3826c", "#3e3d3d"]
    };
  
    try {
      const result = await site_collection.insertOne(newSite);
      console.log("Created site:", JSON.stringify(result));

      // updateCssStyles(["#efefee", "#a3826c", "#3e3d3d"]);
      
      const site_id: string = newSite._id.toString();

      navigate(`/survey/${site_id}`);
  
      // Create a new GitHub repository
      const githubRepoResponse = await axios.post(`https://api.github.com/user/repos`, {
        name: site_id,
        private: false, // Set to true if you want a private repository
      }, {
        auth: {
          username: githubUsername,
          password: githubToken,
        },
      });
  
      console.log("Created GitHub repository:", githubRepoResponse.data);
  
      setSites((prevSites) => [...prevSites, {
        ...newSite,
        user_id: newSite.user_id.toString(),
        _id: site_id,
      }]);
    } catch (error) {
      console.error("Error creating site:", error);
    }
  }

  async function editSite(siteId: string) {
    navigate(`/editor/${siteId}`);
  }

  async function deleteSite(siteId: string) {
    // Display a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this site?");

    if (!isConfirmed) {
      return; // If the user cancels the deletion, exit the function
    }
    try {
      // Find the site by its _id and get the associated GitHub repository name
      const site = sites.find((site) => site._id === siteId);
  
      if (site) {
        setSites((prevSites) => prevSites.filter((site) => site._id !== siteId));

        const result = await site_collection.deleteOne({ _id: new Realm.BSON.ObjectId(siteId) });
        console.log("Deleted site:", JSON.stringify(result));
  
        // Delete the GitHub repository
        const githubRepoName = site._id; // Assuming _id corresponds to the GitHub repository name
        const githubRepoDeleteResponse = await axios.delete(`https://api.github.com/repos/${githubUsername}/${githubRepoName}`, {
          auth: {
            username: githubUsername,
            password: githubToken,
          },
        });
  
        console.log("Deleted GitHub repository:", githubRepoDeleteResponse.status);
      } else {
        console.error("Site not found in the local database.");
      }
    } catch (error) {
      console.error("Error deleting site:", error);
    }
  }
  
  
  return (
    <>
      <Menu
          theme="dark"
          mode="horizontal"
          style={{height: 46}}
          defaultSelectedKeys={['2']}
        >
          <Logo />
        </Menu>
     <Layout style={{height: 'calc(100vh - 46px)', display: 'flex'}}>
      
      <Sidebar/>
      <Layout>
      <div style={{
        background: '#f0f2f5',
        fontSize: 14,
        display: 'flex',
        flexDirection: 'row', // Change flexDirection to 'row'
        alignItems: 'center', // Align items vertically in the center
      }}>
        {/* <div> */}
        <div style={{
          background: '#f0f2f5',
          fontSize: 14,
          display: 'flex',
          flexDirection: 'row', // Change flexDirection to 'row'
          alignItems: 'center', // Align items vertically in the center
        }}>
          <div>
            <h1 style={{ padding: 10 }}>DASHBOARD</h1>
            <h1 style={{ padding: 10 }}>MY SITES</h1>
          </div>
          <Button
            type="primary"
            onClick={logOut}
            className="custom-button"
            style={{ marginLeft: 'auto', height: 30 }} // Use marginLeft: 'auto' to push the button to the right
          >
            Log Out
          </Button>
        </div>
        </div>
        <Content style={{background: colorBgContainer, padding: 0}}>
        <Button
          type="primary"
          onClick={createSite}
          className="custom-button"
          style={{ marginLeft: 'auto', height: 50 }} // Use marginLeft: 'auto' to push the button to the right
          >
          New Site
        </Button>
            <Flex style={{ flexDirection: 'column', maxWidth: 1000, marginInline: 'auto', marginBottom: 50, padding: 10}} >
              <Row gutter={[16, 24]} style={{padding: 10}}>
                  {sites && sites.map((d: any) => 
                    <Col className="gutter-row" span={12}>
                        <SiteCard data={d} onEdit={() => editSite(d._id)} onClone={() => createSite()} onDelete={() => deleteSite(d._id)} />
                    </Col>)
                  }
              </Row>
            </Flex>
        </Content>
      </Layout>
    </Layout>
                  </>
  );
};

export default Dashboard;