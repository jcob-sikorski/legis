import React, { useEffect, useState } from 'react';
import { Layout, Input, Button, Typography } from 'antd';
import Site from '../../../models/Site';
import { useRedux } from '../../../hooks/useRedux';
import * as Realm from 'realm-web';
import { config } from '../../../config';
import axios from 'axios';

import Sidebar from '../menu';
import SettingsMenu from './SettingsMenu';
import { useApp } from '../../RealmApp';

const { Header, Content } = Layout;
const { Title } = Typography;

function Media() {
  const [site] = useRedux('site');

  const [siteSettings, setSiteSettings] = useState<Site | {}>({});
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string | number | string[] }>({});

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient('mongodb-atlas');
  const site_collection = mongodb.db('legis').collection('Site');
  
  useEffect(() => {
    if (site) {
      setSiteSettings(site);
      setFieldValues({});
      for (const key of Object.keys(site)) {
        setFieldValues((prevFieldValues) => ({
          ...prevFieldValues,
          [key]: site[key],
        }));
      }
    }
  }, [site]);

  return (
    <Layout hasSider style={{ minHeight: '100vh', display: 'flex' }}>
      <Sidebar />
      <SettingsMenu defaultSelectedKey='3'/>
      <Layout>
        <Header style={{ background: '#fff', padding: 16, textAlign: 'left' }}/>
        <Content style={{ margin: '16px' }}>
          <Title level={2} style={{fontWeight: 'normal'}}>Media</Title>
          <div style={{ marginBottom: '60px' }}>
            <Title level={4} style={{fontWeight: 'normal'}}>Manage media assets used by this site, such as its share image and icon.</Title>
          </div>
          <Title level={5} style={{fontWeight: 'normal', color: '#616161'}}>Share image (optional)</Title>
          <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRadius: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 30 }}>
            <Button
              type="primary"
              className="custom-button"
              style={{ height: 50, width: 90 }}
            >
              Upload
            </Button>
            <Button
              type="primary"
              className="custom-button"
              style={{ height: 50, width: 90, marginTop: 10 }} // You can adjust the marginTop as needed
            >
              Clear
            </Button>
          </div>
          <Title level={5} style={{fontWeight: 'normal', color: '#616161', marginBottom: 50}}>Image to display when this site is shared on social network (like Facebook or X). Defaults to screenshot if not provided.</Title>
          <Title level={5} style={{fontWeight: 'normal', color: '#616161'}}>Icon (optional)</Title>
          <div style={{ backgroundColor: 'black', height: 64, width: 64, borderRadius: 6, marginLeft: 10 }}/>
          <div style={{ display: 'flex', flexDirection: 'row', borderRadius: 5 }}>
            <Button
              type="primary"
              className="custom-button"
              style={{ height: 50, width: 90 }}
            >
              Upload
            </Button>
            <Button
              type="primary"
              className="custom-button"
              style={{ height: 50, width: 90, marginTop: 10 }} // You can adjust the marginTop as needed
            >
              Clear
            </Button>
          </div>
          <Button
            type="primary"
            className="custom-button"
            style={{ height: 60, width: 200, marginTop: 10 }} // You can adjust the marginTop as needed
          >
            Save changes
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Media;