import React, { useEffect, useState } from 'react';
import { Layout, Input, Button, Typography, message } from 'antd';
import Site from '../../../models/Site';
import { useRedux } from '../../../hooks/useRedux';
import * as Realm from 'realm-web';
import { config } from '../../../config';
import axios from 'axios';

import Sidebar from '../menu';
import SettingsMenu from './SettingsMenu';

const { Header, Content } = Layout;
const { Title } = Typography;

const SiteComponent: React.FC = () => {
  const [site] = useRedux('site');

  const [siteTitle, setSiteTitle] = useState<string>(site?.title);
  const [siteDescription, setSiteDescription] = useState<string>(site?.description);

  const app = new Realm.App({ id: config.appId });

  const mongodb = app.currentUser!.mongoClient('mongodb-atlas');
  const site_collection = mongodb.db('legis').collection('Site');

  const saveChanges = async () => {
    if (siteTitle !== site?.title) {
      try {
        const updateResult = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site!._id) },
          { $set: { title: siteTitle } }
        );
        console.log(`Updated ${updateResult.modifiedCount} document.`);
      } catch (error) {
        console.error('Error updating document:', error);
      }   
    }

    if (siteDescription !== site?.description) {
      try {
        const updateResult = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site!._id) },
          { $set: { description: siteDescription } }
        );
        console.log(`Updated ${updateResult.modifiedCount} document.`);
      } catch (error) {
        console.error('Error updating document:', error);
      }   
    }
    message.success('Saved changes.');
  };

  const handleTitleChange = (newValue: string) => {
    setSiteTitle(newValue);
  };

  const handleDescriptionChange = (newValue: string) => {
    setSiteDescription(newValue);
  };

  return (
    <Layout hasSider style={{ minHeight: '100vh', display: 'flex' }}>
      <Sidebar />
      <SettingsMenu defaultSelectedKey='2'/>
      <Layout>
        <Header style={{ background: '#fff', padding: 16, textAlign: 'left' }}/>
        <Content style={{ margin: '16px' }}>
          <Title level={2} style={{fontWeight: 'normal'}}>Site</Title>
          <div style={{ marginBottom: '40px' }}>
            <Title level={4} style={{fontWeight: 'normal'}}>Manage this site’s title, description,  and other general properties.</Title>
          </div>
          <Title level={5} style={{fontWeight: 'normal', color: '#616161'}}>Title (required)</Title>
          <Input
            style={{ borderRadius: 5, height: '60px', backgroundColor: 'white', marginBottom: 20 }}
            bordered={false}
            value={siteTitle}
            placeholder={site?.title}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <Title level={5} style={{fontWeight: 'normal', color: '#616161', marginBottom: 30}}>This site’s title (and what gets shown at the top of the browser window).</Title>
          <Title level={5} style={{fontWeight: 'normal', color: '#616161'}}>Description (required)</Title>
          <Input
            style={{ borderRadius: 5, height: '60px', backgroundColor: 'white', marginBottom: 20 }}
            bordered={false}
            value={siteDescription}
            placeholder={site?.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
          <Title level={5} style={{fontWeight: 'normal', color: '#616161', marginBottom: 30}}>A brief description of this site (and what’s usually used in bookmarks, search engine listings, etc.)</Title>
          <Title level={5} style={{fontWeight: 'normal', color: '#616161'}}>Action</Title>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ backgroundColor: 'black', height: 30, width: 30, borderRadius: 50, marginLeft: 10 }} />
            <div style={{ marginLeft: 10, color: 'black' }}>Publish to .legis.co URL</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ backgroundColor: 'black', height: 30, width: 30, borderRadius: 50, marginLeft: 10 }} />
            <div style={{ marginLeft: 10, color: 'black' }}>Publish to custom domain</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ backgroundColor: 'black', height: 30, width: 30, borderRadius: 50, marginLeft: 10 }} />
            <div style={{ marginLeft: 10, color: 'black' }}>Save as a template</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ backgroundColor: 'black', height: 30, width: 30, borderRadius: 50, marginLeft: 10 }} />
            <div style={{ marginLeft: 10, color: 'black' }}>Save as an offline draft</div>
          </div>
          <Button
            type="primary"
            className="custom-button"
            onClick={saveChanges}
            style={{ height: 60, width: 200, marginTop: 10 }} // You can adjust the marginTop as needed
          >
            Save changes
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SiteComponent;