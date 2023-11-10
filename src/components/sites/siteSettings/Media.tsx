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
          <Title level={2} style={{fontWeight: 'normal'}}>Landing Page OS</Title>
          <Title level={4} style={{fontWeight: 'normal'}}>360-degree solution to ship a high-converting landing page</Title>
          <div style={{ marginBottom: '20px' }}>
          <Input
            style={{ maxWidth: '400px', borderRadius: 12, height: '40px', backgroundColor: 'white' }}
            bordered={false}
            // addonAfter={<Button style={{ alignSelf: 'center', alignContent: 'center', justifyContent: 'center' }}>Copy</Button>}
          />
          </div>
          <div style={{ marginBottom: '40px' }}>
            <Title level={5} style={{fontWeight: 'normal', color: '#616161' }}>This site’s URL (and what you’ll use to share with the world). If you’d like to change this to something else, click here.</Title>
          </div>
          <div style={{ marginBottom: '60px' }}>
            <Title level={5} style={{fontWeight: 'normal', color: '#616161'}}>Added May, 2023 (last edited October 3, 2023)</Title>
          </div>
          <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', borderRadius: 5 }}>
            <div style={{ flex: 1, borderRight: '0.5px solid #B6B6B6' }}>
              <div style={{ padding: 20 }}>
                <Title level={5} style={{fontWeight: 'bold' }}>Status</Title>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <Title level={5} style={{fontWeight: 'initial', color: '#616161' }}>Published</Title>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <Title level={5} style={{fontWeight: 'initial', color: '#A2A2A2' }}>Custom domain URL</Title>
                <Button
                  type="primary"
                  className="custom-button"
                  style={{ height: 50 }} // Use marginLeft: 'auto' to push the button to the right
                >
                  Change
                </Button>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ padding: 20 }}>
                <Title level={5} style={{fontWeight: 'bold' }}>Status</Title>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <Title level={5} style={{fontWeight: 'initial', color: '#616161' }}>Shounak (you)</Title>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <Title level={5} style={{fontWeight: 'initial', color: '#A2A2A2' }}>shounak594@gmail.com</Title>
                <Button
                  type="primary"
                  className="custom-button"
                  style={{ height: 50 }} // Use marginLeft: 'auto' to push the button to the right
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Media;