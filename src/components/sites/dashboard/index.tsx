import React, { useState } from 'react';
import {
  PlusOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col, Flex } from 'antd';
import SiteCard from './SiteCard';
import * as Realm from "realm-web";
import Site from '../../../models/Site';
import Sidebar from '../menu';
import { config } from "../../../config";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

export const Dashboard: React.FC = () => {
  
  const navigate = useNavigate();

  const [sites, setSites] = useState<Site[]>([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const app = new Realm.App({ id: config.appId });
  
  const currentUserID = app.currentUser!.id;

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");

  // Set up your GitHub API credentials and repository name
  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken; // Generate a personal access token in GitHub

  React.useEffect(() => {
    console.log("sites: ", sites);
  }, [sites]);

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

  async function createSite() {
    const newSite = {
      user_id: new Realm.BSON.ObjectId(currentUserID),
      _id: new Realm.BSON.ObjectId(),
      title: "Your Site Title",
      subtitle: "Your Site Subtitle",
      description: "Your Site Description",
      deleted: 0,
      image_url: "https://picsum.photos/200/300",
      site_url: "URL to Your Site",
    };
  
    try {
      const result = await site_collection.insertOne(newSite);
      console.log("Created site:", JSON.stringify(result));
  
      const repositoryName = newSite._id;
  
      // Create a new GitHub repository
      const githubRepoResponse = await axios.post(`https://api.github.com/user/repos`, {
        name: repositoryName,
        private: false, // Set to true if you want a private repository
      }, {
        auth: {
          username: githubUsername,
          password: githubToken,
        },
      });
  
      console.log("Created GitHub repository:", githubRepoResponse.data);
      navigate(`/editor/${newSite._id}`);
  
      setSites((prevSites) => [...prevSites, {
            ...newSite,
            user_id: newSite.user_id.toString(),
            _id: newSite._id.toString(),
          }]);
    } catch (error) {
      console.error("Error creating site:", error);
    }
  }

  async function deleteSite(siteId: string) {
    try {
      // Find the site by its _id and get the associated GitHub repository name
      const site = sites.find((site) => site._id === siteId);
  
      if (site) {
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
  
      setSites((prevSites) => prevSites.filter((site) => site._id !== siteId));
    } catch (error) {
      console.error("Error deleting site:", error);
    }
  }
  
  
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sidebar/>
      <Layout>
        <Content style={{background: colorBgContainer, padding: 0}}>
            <Flex style={{ flexDirection: 'column', maxWidth: 1200, marginInline: 'auto', marginBottom: 50, padding: 10}} >
                <Button style={{maxWidth: '150px', fontWeight: 'bold', backgroundColor: 'black'}} type="primary" icon={<PlusOutlined />} size='large' onClick={createSite}>
                    New site
                </Button>
                <Row gutter={[16, 24]} style={{padding: 10}}>
                    {sites && sites.map((d: any) => 
                      <Col className="gutter-row" span={12}>
                          <SiteCard data={d} onDelete={() => deleteSite(d._id)} onClone={() => createSite()} />
                      </Col>)}
                </Row>
            </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;