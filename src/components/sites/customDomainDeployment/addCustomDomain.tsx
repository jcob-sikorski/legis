import { Layout, Typography, Button, Steps, Input } from 'antd';
import React from 'react';

const { Step } = Steps;
const { Title } = Typography;

function AddCustomDomain({ nextPage }: any) {
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
          placeholder={"company.com"} // Set the value here
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => nextPage()}  className="custom-button" type="primary" size="large" style={{ marginTop: 50 }}>
          Submit
        </Button>
      </div>
    </Layout>
  );
};

export default AddCustomDomain;
