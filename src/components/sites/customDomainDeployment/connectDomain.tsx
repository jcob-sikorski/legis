import { Layout, Typography, Button, Steps, Input } from 'antd';
import React from 'react';

const { Step } = Steps;
const { Title } = Typography;

function ConnectDomain({ nextPage }: any) {
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
          value={"legisbiz.github.io"} // Set the value here
          readOnly // Make the input read-only
        />
        <Button
          type="primary"
          className="custom-button"
          style={{ height: 40, borderRadius: 30 }} // Use marginLeft: 'auto' to push the button to the right
        >
          Copy
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => nextPage()}  className="custom-button" type="primary" size="large" style={{ marginTop: 50 }}>
          Connect domain
        </Button>
      </div>
    </Layout>
  );
};

export default ConnectDomain;
