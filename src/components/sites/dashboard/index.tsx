import React, { useState } from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  DownloadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col, Flex } from 'antd';
import {faker} from '@faker-js/faker';
import SiteCard from './SiteCard';
import * as Realm from "realm-web";
import { Site } from '../../../models/Site';
import Sidebar from '../menu';
import { config } from "../../../config";

const { Header, Sider, Content } = Layout;

export const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);

  const {
    token: { colorBgContainer, colorBgBase },
  } = theme.useToken();

  const email = "joe@gmail.com";
  const password = "123456";
  const app = new Realm.App({ id: config.appId });
  
  const currentUserID = app.currentUser!.id;

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  const site_collection = mongodb.db("legis").collection("Site");

  React.useEffect(() => {
    console.log("CURRENT USER ID: ", currentUserID);
  }, []);

  const userQuery = { "user_id": new Realm.BSON.ObjectId(currentUserID) };

  React.useEffect(() => {
    async function searchDocuments() {
      try {
        const result = await site_collection.find(userQuery);
        const documents = result.map((doc: any) => {
          return doc;
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
    const newSite: Site  = {
      user_id: new Realm.BSON.ObjectId(currentUserID),
      _id: new Realm.BSON.ObjectId(),
      title: "Your Site Title",
      subtitle: "Your Site Subtitle",
      description: "Your Site Description",
      deleted: 0,
      image_url: "https://picsum.photos/200/300",
      site_url: "URL to Your Site"
    };
  
    try {
      const result = await site_collection.insertOne(newSite);
      console.log("Created site:", JSON.stringify(result));
      
      setSites((prevSites) => [...prevSites, newSite]);
    } catch (error) {
      console.error("Error creating site:", error);
    }
  }

  async function deleteSite(siteId: string) {
    try {
      const result = await site_collection.deleteOne({ _id: new Realm.BSON.ObjectId(siteId) });
      console.log("Deleted site:", JSON.stringify(result));
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
            <Flex style={{ flexDirection: 'column', maxWidth: 1200, marginInline: 'auto', marginBottom: 50}} >
                <Button style={{maxWidth: '150px', fontWeight: 'bold'}} type="primary" icon={<PlusOutlined />} size='large' onClick={createSite}>
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