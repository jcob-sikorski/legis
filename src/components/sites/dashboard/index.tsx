import React, { useState } from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  DownloadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col, Flex } from 'antd';
import {faker} from '@faker-js/faker';
import SiteCard from './SiteCard';

const { Header, Sider, Content } = Layout;

export const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorBgBase },
  } = theme.useToken();

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <AppstoreOutlined />,
              label: 'Sites',
            },
            {
              key: '2',
              icon: <BarChartOutlined />,
              label: 'Analytics',
            },
            {
              key: '3',
              icon: <SettingOutlined />,
              label: 'Account settings',
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{background: colorBgContainer, padding: 0}}>
            <Flex style={{ flexDirection: 'column', maxWidth: 1200, marginInline: 'auto', marginBottom: 50}} >
                <Button style={{maxWidth: '150px', fontWeight: 'bold'}} type="primary" icon={<PlusOutlined />} size='large'>
                    New site
                </Button>
                <Row gutter={[16, 24]}>
                    {POSTS && POSTS.map((d: any) => <Col className="gutter-row" span={12}>
                        <SiteCard data={d}/>
                    </Col>)}
                </Row>
            </Flex>
            {/* {POSTS && POSTS.map((d: any) => <SiteCard data={d}/>)} */}
        </Content>
      </Layout>
    </Layout>
  );
};

interface Post {
    title: String
    description: String
    photoURL: String
    siteURL: String
}

const POSTS: Post[] = [
    {
        title: 'Site 1',
        description: 'Description for first site',
        photoURL: faker.image.urlLoremFlickr({ category: 'lawyer' }),
        siteURL: faker.internet.url(),
    },
    {
        title: 'Site 2',
        description: 'Description for another site',
        photoURL: faker.image.urlLoremFlickr({ category: 'lawyer' }),
        siteURL: faker.internet.url(),
    },
    {
        title: 'Site 3',
        description: 'Description for another site',
        photoURL: faker.image.urlLoremFlickr({ category: 'lawyer' }),
        siteURL: faker.internet.url(),
    },
    {
        title: 'Site 4',
        description: 'Description for another site',
        photoURL: faker.image.urlLoremFlickr({ category: 'lawyer' }),
        siteURL: faker.internet.url(),
    },
    {
        title: 'Site 5',
        description: 'Description for another site',
        photoURL: faker.image.urlLoremFlickr({ category: 'lawyer' }),
        siteURL: faker.internet.url(),
    },
]



export default Dashboard;