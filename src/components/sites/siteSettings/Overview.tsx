import React, { useEffect, useState } from 'react';
import { Layout, Input, Button, Typography, Modal, message } from 'antd';
import Site from '../../../models/Site';
import { useRedux } from '../../../hooks/useRedux';
import * as Realm from 'realm-web';
import { config } from '../../../config';
import axios from 'axios';

import Sidebar from '../menu';
import SettingsMenu from './SettingsMenu';

const { Header, Content } = Layout;
const { Title } = Typography;

const Overview: React.FC = () => {
  const [site] = useRedux('site');

  const [published, setPublished] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [domainName, setDomainName] = useState('');

  const app = new Realm.App({ id: config.appId });

  const mongodb = app.currentUser!.mongoClient('mongodb-atlas');
  const site_collection = mongodb.db('legis').collection('Site');

  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken;

  useEffect(() => {
    if (site) {
      setDomainName(site.cname);
    }
  }, [site]);

  const configureCustomDomain = async () => {
    setVisible(false);
    try {
      const updateResult = await site_collection.updateOne(
        { _id: new Realm.BSON.ObjectId(site!._id) },
        { $set: { cname: domainName } }
      );
      console.log(`Updated ${updateResult.modifiedCount} document.`);
      const githubRepoResponse = await axios.put(`https://api.github.com/repos/${githubUsername}/${site!._id}/pages`, {
        cname: domainName,
        // https_enforced: true,
        source: "gh-pages"
      }, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'X-GitHub-Api-Version': '2022-11-28'
        },
      });
      // TODO enforce https after successful DNS check
      // const githubRepoResponse = await axios.put(`https://api.github.com/repos/${githubUsername}/${site!._id}/pages`, {
      //   https_enforced: true,
      //   source: "gh-pages"
      // }, {
      //   headers: {
      //     'Authorization': `token ${githubToken}`,
      //     'X-GitHub-Api-Version': '2022-11-28'
      //   },
      // });
      console.log("Updated the domain of the site: ", githubRepoResponse.data);
    }
    catch (error) {
      console.error('Error updating the domain of the site:', error);
    }
  };

 // check if the custom domain is configured properly
  React.useEffect(() => {
    let ARecordsCheck: boolean = false;
    let CNAMECheck: boolean = false;
    if (site && site.cname) {
      // DNS lookup for A records
      fetch(`https://dns.google/resolve?name=${site.cname}&type=A`)
        .then((response) => response.json())
        .then((data) => {
          ARecordsCheck = data.Answer[1].data === "185.199.108.153" && data.Answer[2].data === "185.199.109.153" && data.Answer[3].data === "185.199.110.153" && data.Answer[4].data === "185.199.111.153";
          CNAMECheck = data.Answer[0].data === "legisbiz.github.io.";
          // Output A records
          console.log('CNAME check: ', ARecordsCheck);
          console.log('A records check: ', CNAMECheck);
          setPublished(ARecordsCheck && CNAMECheck);
        })
        .catch((error) => {
          console.error('Error performing DNS lookup:', error);
        });
    }
  }, [site]);

  const copyUrl = () => {
    const urlToCopy = site?.cname || site?.site_url;

    if (urlToCopy) {
      navigator.clipboard.writeText(urlToCopy)
        .then(() => {
          console.log('URL copied to clipboard:', urlToCopy);
          // Display a success message
          message.success('Copied URL to clipboard');
        })
        .catch((error) => {
          console.error('Failed to copy URL to clipboard', error);
          // Display an error message
          message.error('Failed to copy URL to clipboard');
        });
    }
  };

  return (
    <Layout hasSider style={{ minHeight: '100vh', display: 'flex' }}>
      <Sidebar />
      <SettingsMenu defaultSelectedKey='1'/>
      <Layout>
        <Header style={{ background: '#fff', padding: 16, textAlign: 'left' }}/>
        <Content style={{ margin: '16px' }}>
          <Title level={2} style={{fontWeight: 'normal'}}>Landing Page OS</Title>
          <Title level={4} style={{fontWeight: 'normal'}}>360-degree solution to ship a high-converting landing page</Title>
          <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              style={{
                maxWidth: '400px',
                borderRadius: 12,
                height: '40px',
                backgroundColor: 'white',
              }}
              bordered={false}
              value={site?.cname || site?.site_url} // Set the value here
              readOnly // Make the input read-only
            />
            <Button
              type="primary"
              className="custom-button"
              onClick={copyUrl}
              style={{ height: 40, borderRadius: 30 }} // Use marginLeft: 'auto' to push the button to the right
            >
              Copy
            </Button>
          </div>
          </div>
          <div style={{ marginBottom: '40px' }}>
            <Title level={5} style={{fontWeight: 'normal', color: '#616161' }}>This site’s URL (and what you’ll use to share with the world). If you’d like to change this to something else, click here.</Title>
          </div>
          <div style={{ marginBottom: '60px' }}>
            <Title level={5} style={{fontWeight: 'normal', color: '#616161'}}>Added May, 2023 (last edited October 3, 2023)</Title>
          </div>
          <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', borderRadius: 5 }}>
            <div style={{ flex: 1 }}>
              <div style={{ padding: 20 }}>
                <Title level={5} style={{fontWeight: 'bold' }}>Status</Title>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <Title level={5} style={{fontWeight: 'initial', color: '#616161' }}>{published ? "Published" : "Not Published"}</Title>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <Title level={5} style={{fontWeight: 'initial', color: '#A2A2A2' }}>Custom domain URL</Title>
                <Button
                  type="primary"
                  className="custom-button"
                  onClick={() => setVisible(true)}
                  style={{ height: 50 }} // Use marginLeft: 'auto' to push the button to the right
                >
                  Change
                </Button>
                <Modal
                  title="Change Domain Name"
                  open={visible}
                  onOk={configureCustomDomain}
                  onCancel={() => setVisible(false)}
                >
                  <Input
                    placeholder="Enter new domain name"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                  />
                </Modal>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Overview;