import { Layout, Typography, Card, Button } from 'antd';
import { ApartmentOutlined, HomeOutlined, UserOutlined, EditOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import React from 'react';

const { Header } = Layout;
const { Title } = Typography;
const { Meta } = Card;

// List of card titles and descriptions
const cardContent = [
  {
    title: "Custom domain",
    description: "Publish your law firm website to your custom domain. (Eg: samlawfirm.com)",
    icon: <ApartmentOutlined />
  },
  {
    title: "Professional-looking, SEO-optimised templates",
    description: "All your sites are professionally-designed and are optimized for SEO that load fast so you can run paid ads, get clients easily.",
    icon: <HomeOutlined />
  },
  {
    title: "Priority Customer Support",
    description: "Get priority customer support via email & chat. We’ll be available 24*7 to answer any questions you have.",
    icon: <UserOutlined />
  },
  {
    title: "Unlimited site generation & customization",
    description: "Generate as many sites you want until you find one that reflects your brand. Customize it all you want until you’re happy.",
    icon: <EditOutlined />
  },
  {
    title: "Priority access to features",
    description: "Vote on what features you want next on Legis. Track progress on those features and get updated on when it’s ready. Get access to those features at no extra cost.",
    icon: <StarOutlined />
  },
  {
    title: "Community of lawyers",
    description: "Get access to a community of lawyers who’ve been where you are or are in the same boat as you. Make friends, refer clients and grow your law firm.",
    icon: <TeamOutlined />
  }
];

function PitchCards({ nextPage }: any) {
  return (
    <Layout style={{ height: '100vh', backgroundColor: 'white' }}>
      <Header style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Title level={1} style={{ color: 'black', fontWeight: 'extra-bold', marginTop: '50px', textAlign: 'center', alignSelf: 'center' }}>
          Become a pro member for only $49 year (yeah per year!)
        </Title>
      </Header>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', paddingTop: 100}}>
        {cardContent.map((content, i) => (
          <Card
            key={i}
            hoverable
            style={{ width: '30%', margin: '1%', position: 'relative' }}
          >
            {React.cloneElement(content.icon, { style: { 
              color: 'black', 
              fontWeight: 'bold', 
              marginLeft: 10, 
              marginBottom: 10, 
              backgroundColor: '#deefff', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              width: 50, 
              height: 50,
              borderRadius: 15
            }})}
            <Meta title={content.title} description={content.description} />
          </Card>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Button onClick={() => nextPage()}  className="custom-button" type="primary" size="large">
          Go pro for $49 per year
        </Button>
      </div>
    </Layout>
  );
};

export default PitchCards;