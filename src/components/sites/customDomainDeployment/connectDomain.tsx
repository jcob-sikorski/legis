import { Layout, Typography, Button, Steps, Input, Result, message } from 'antd';
import { useState } from 'react';

import { useApp } from '../../RealmApp';
import * as Realm from "realm-web";

import { useParams } from 'react-router-dom';

import React from 'react';
import { config } from '../../../config';

import axios from 'axios';

const { Step } = Steps;
const { Title } = Typography;

function ConnectDomain({ nextPage }: any) {
  const [domain, setDomain] = useState('');
  const [checkDomainAgain, setCheckDomainAgain] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");  
  const site_collection = mongodb.db("legis").collection("Site");

  const githubUsername = config.githubUsername;
  const githubToken = config.githubToken;

  const { site_id } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await site_collection.findOne(
        { _id: new Realm.BSON.ObjectId(site_id) },
        { projection: { cname: 1 } }
      );
      console.log(`Fetched document: ${JSON.stringify(result.cname)}`);
      setDomain(result.cname);
    };
  
    fetchData();
  }, []);

  async function onConnectDomain() {
    let CNAMECheck: boolean = false;
  
    try {
      // DNS lookup for NS records
      const response = await fetch(`https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://dns.google/resolve?name=${domain}&type=A`);
      const data = await response.json();
  
      CNAMECheck = data.Answer[0].data === "legisbiz.github.io.";
      console.log('CNAME check: ', CNAMECheck);
  
      setCheckDomainAgain(!CNAMECheck);
      if (CNAMECheck) {
        try {
          const githubRepoResponse = await axios.put(`https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://api.github.com/repos/${githubUsername}/${site_id}/pages`, {
            cname: domain,
            source: "gh-pages"
          }, {
            headers: {
              'Authorization': `token ${githubToken}`
            },
          });
          console.log("Updated the github domain of the site: ", githubRepoResponse.data);
        }
        catch (error) {
          console.error('Error updating the domain of the site:', error);
        }

        const updateResult = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectID(site_id) },
          { $set: { domainConnected: 1 } }
        );

        nextPage();
      } else {
        setShowResult(true);
      }
    } catch (error) {
      setCheckDomainAgain(true);
      setShowResult(true);
      console.error('Error performing DNS lookup:', error);
    }
  }

  const copyUrl = () => {
    const urlToCopy = "legisbiz.github.io";

    if (urlToCopy) {
      navigator.clipboard.writeText(urlToCopy)
        .then(() => {
          console.log('URL copied to clipboard:', urlToCopy);
          message.success('Copied URL to clipboard');
        })
        .catch((error) => {
          console.error('Failed to copy URL to clipboard', error);
          message.error('Failed to copy URL to clipboard');
        });
    }
  };

  return (
    <Layout style={{ height: '100vh', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginTop: '50px' }}>
        <Steps current={1} labelPlacement={'vertical'} style={{ width: '50%' }}>
          <Step title="Add custom domain" />
          <Step title="Connect domain" />
          <Step title="Publish your site" />
        </Steps>
      </div>
      <Title level={1} style={{ color: 'black', fontWeight: 'extra-bold', marginTop: '50px', textAlign: 'center', alignSelf: 'center' }}>
        Fill in these details in your domain registrar
      </Title>
      <h2 style={{ fontSize: 18, fontWeight: '300', wordWrap: 'break-word', lineHeight: '20px', textAlign: 'center', alignSelf: 'center', marginTop: 50 }}>Sign in to your domain registrar (Namecheap for example) - open your</h2>
      <h2 style={{ fontSize: 18, fontWeight: '300', wordWrap: 'break-word', lineHeight: '20px', textAlign: 'center', alignSelf: 'center' }}>dashboard and choose “custom DNS”. Copy and paste these into the</h2>
      <h2 style={{ fontSize: 18, fontWeight: '300', wordWrap: 'break-word', lineHeight: '20px', textAlign: 'center', alignSelf: 'center' }}>CName record under “Custom DNS” </h2>
      <div style={{ display: 'flex', alignSelf: 'center', alignItems: 'center', paddingTop: 50 }}>
        <label style={{ margin: '10px', fontSize: 16 }}>CNAME</label>
        <Input
          style={{
            maxWidth: '400px',
            borderRadius: 12,
            height: '40px',
            backgroundColor: 'white',
          }}
          value={"legisbiz.github.io"}
          readOnly
        />
        <Button
          type="primary"
          className="custom-button"
          onClick={copyUrl}
          style={{ height: 40, borderRadius: 30 }}
        >
          Copy
        </Button>
      </div>
      {showResult && (checkDomainAgain ?
        <Result
          status="warning"
          title='The CNAME Record "legisbiz.github.io" Does Not Exist'
          subTitle=""
        />
        : 
        null
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => onConnectDomain()}  className="custom-button" type="primary" size="large" style={{ marginTop: 50 }}>
          Connect domain
        </Button>
      </div>
    </Layout>
  );
};

export default ConnectDomain;
