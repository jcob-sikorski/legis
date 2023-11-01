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
import { config } from "../../../config";

const { Header, Sider, Content } = Layout;

export const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sites, setSites] = useState<Site[] | null>(null);

  const {
    token: { colorBgContainer, colorBgBase },
  } = theme.useToken();

  const email = "joe@gmail.com";
  const password = "123456";
  const app = new Realm.App({ id: config.appId });
  
  const credentials = Realm.Credentials.emailPassword(email, password);
  app.logIn(credentials)
    .then(user => {
      console.log("User logged in successfully.");
      const currentUserID = user.id;
    })
    .catch(error => {
      console.error("Error logging in the user:", error);
    });
  
  const currentUserID = app.currentUser!.id;

  React.useEffect(() => {
    console.log("CURRENT USER ID: ", currentUserID);
  }, []);

  // Search for site documents with user_id of type "objectId"
  const userQuery = { "user_id": new Realm.BSON.ObjectId(currentUserID) };

  React.useEffect(() => {
    async function searchDocuments() {
      try {
        const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
        const site_collection = mongodb.db("legis").collection("Site");
        const result = await site_collection.find(userQuery);
        const documents = result.map((doc: any) => {
          // You can access the document fields like doc.title, doc.subtitle, etc.
          return doc;
        });
        console.log("Found documents:", JSON.stringify(documents));
        setSites(documents);
      } catch (error) {
        console.error("Error searching documents:", error);
      }
    }

    // Call the searchDocuments function on the first render
    searchDocuments();
  }, []);
  
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <AppstoreOutlined />,
              label: 'Sites',
            },
            {
              key: '2',
              icon: <BarChartOutlined />,
              label: 'Analytics',
            },
            {
              key: '3',
              icon: <SettingOutlined />,
              label: 'Account settings',
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{background: colorBgContainer, padding: 0}}>
            <Flex style={{ flexDirection: 'column', maxWidth: 1200, marginInline: 'auto', marginBottom: 50}} >
                <Button style={{maxWidth: '150px', fontWeight: 'bold'}} type="primary" icon={<PlusOutlined />} size='large'>
                    New site
                </Button>
                <Row gutter={[16, 24]} style={{padding: 10}}>
                    {sites && sites.map((d: any) => 
                      <Col className="gutter-row" span={12}>
                          <SiteCard data={d}/>
                      </Col>)}
                </Row>
            </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;