import { Layout, Typography, Button, Steps, Input, Result } from 'antd';
import { useState } from 'react';

import { useApp } from '../../RealmApp';
import * as Realm from "realm-web";

import { useParams } from 'react-router-dom';

const { Step } = Steps;
const { Title } = Typography;

function AddCustomDomain({ nextPage }: any) {
  const [domain, setDomain] = useState('');
  const [checkDomainAgain, setCheckDomainAgain] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient("mongodb-atlas");  
  const site_collection = mongodb.db("legis").collection("Site");

  const { site_id } = useParams();

  async function onSubmit() {
    const updateResult = await site_collection.updateOne(
      { _id: new Realm.BSON.ObjectId(site_id) },
      { $set: { cname: domain } }
    );
    console.log(`Updated ${updateResult.modifiedCount} document.`);

    try {
      // DNS lookup for NS records
      fetch(`https://dns.google/resolve?name=${domain}&type=NS`)
      .then((response) => response.json())
      .then((data) => {
        // Check if domain exists
        const domainExists = data.Status === 0;
        console.log('Domain exists: ', domainExists);

        setCheckDomainAgain(!domainExists);
        if (domainExists) {
          nextPage();
        } else {
          setShowResult(true);
        }
      })
    } catch (error) {
      setCheckDomainAgain(true);
      setShowResult(true);
      console.error('Error performing DNS lookup:', error);
    }
  }

  return (
    <Layout style={{ height: '100vh', backgroundColor: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginTop: '50px' }}>
        <Steps current={0} labelPlacement={'vertical'} style={{ width: '50%' }}>
          <Step title="Add custom domain" />
          <Step title="Connect domain" />
          <Step title="Publish your site" />
        </Steps>
      </div>
      <Title level={1} style={{ color: 'black', fontWeight: 'extra-bold', marginTop: '50px', textAlign: 'center', alignSelf: 'center' }}>
        Your law firm is ready to be launched!
      </Title>
      <h2 style={{ fontSize: 18, fontWeight: '300', wordWrap: 'break-word', lineHeight: '20px', textAlign: 'center', alignSelf: 'center', marginTop: 50 }}>Enter your custom domain that you own. If you don’t own a domain </h2>
      <h2 style={{ fontSize: 18, fontWeight: '300', wordWrap: 'break-word', lineHeight: '20px', textAlign: 'center', alignSelf: 'center' }}>yet, we recommend going to Namecheap and buying your custom </h2>
      <h2 style={{ fontSize: 18, fontWeight: '300', wordWrap: 'break-word', lineHeight: '20px', textAlign: 'center', alignSelf: 'center' }}>domain</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', paddingTop: 50}}>
        <Input
          style={{
            maxWidth: '400px',
            borderRadius: 12,
            height: '40px',
            backgroundColor: 'white',
          }}
          placeholder={"company.com"}
          onChange={e => setDomain(e.target.value)}
        />
      </div>
      {showResult && (checkDomainAgain ?
        <Result
          status="warning"
          title="Such Domain Does Not Exist"
          subTitle=""
        />
        : 
        null
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => onSubmit()}  className="custom-button" type="primary" size="large" style={{ marginTop: 50 }}>
          Submit
        </Button>
      </div>
    </Layout>
  );
};

export default AddCustomDomain;
