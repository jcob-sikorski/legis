import React, { useEffect, useState } from 'react';
import { Layout, Input, Button, Typography } from 'antd';
import Site from '../../../models/Site';
import { useRedux } from '../../../hooks/useRedux';
import * as Realm from 'realm-web';
import { config } from '../../../config';
import axios from 'axios';

import Sidebar from '../menu';
import SettingsMenu from './SettingsMenu';

const { Header, Content } = Layout;
const { Title } = Typography;

const Media: React.FC = () => {
  const [site] = useRedux('site');

  const [siteSettings, setSiteSettings] = useState<Site | {}>({});
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string | number | string[] }>({});

  const app = new Realm.App({ id: config.appId });

  const mongodb = app.currentUser!.mongoClient('mongodb-atlas');
  const site_collection = mongodb.db('legis').collection('Site');

  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken;

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

  const updateField = async (fieldName: keyof Site, value: string | number | string[]) => {
    const updatedValues = { ...fieldValues, [fieldName]: value };
    setFieldValues(updatedValues);
  };

  const updateDBField = async (fieldName: keyof Site) => {
    try {
      const updateResult = await site_collection.updateOne(
        { _id: new Realm.BSON.ObjectId(site!._id) },
        { $set: { [fieldName]: fieldValues[fieldName] } }
      );
      console.log(`Updated ${updateResult.modifiedCount} document.`);

      if (fieldName === "cname" && site.cname !== fieldValues[fieldName]) {
        const githubRepoResponse = await axios.put(`https://api.github.com/repos/${githubUsername}/${site!._id}/pages`, {
          cname: fieldValues[fieldName] as string,
          // https_enforced: true,
          source: "gh-pages"
        }, {
          headers: {
            'Authorization': `token ${githubToken}`,
            'X-GitHub-Api-Version': '2022-11-28'
          },
        });
        // TODO enfore https after successful DNS check
        // const githubRepoResponse = await axios.put(`https://api.github.com/repos/${githubUsername}/${site!._id}/pages`, {
        //   https_enforced: true,
        //   source: "gh-pages"
        // }, {
        //   headers: {
        //     'Authorization': `token ${githubToken}`,
        //     'X-GitHub-Api-Version': '2022-11-28'
        //   },
        // });
        console.log("Updated the repo: ", githubRepoResponse.data);
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

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