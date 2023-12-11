import {
  Layout,
  Input,
  Button,
  Typography,
} from "antd";

import Sidebar from "../menu";
import SettingsMenu from "./SettingsMenu";
import {
  PlusOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

function SiteComponent({
  site_id,
  title,
  description,
  siteUrl,
  domainConnected,
  faviconUrl,
  cname,
  templateColors,
  bodyTemplate,
  templateSetId,
  customDomain,
  saveChanges,
  commitIndexHtmlToGithub,
  connectDefaultSubdomain
  }: any) {
    
  return (
    <Layout
      hasSider
      style={{
        overflowY: "scroll",
      }}
    >
      <Sidebar />
      <SettingsMenu defaultSelectedKey="2" />
      <Layout style={{ overflowY: "scroll" }}>
        <Title
          level={2}
          style={{ fontWeight: "normal", height: 40, padding: "10px 16px" }}
        >
          Site
        </Title>
        <Content
          style={{
            padding: 16,
            paddingTop: 0,
            maxHeight: "calc(100vh - 140px)",
            overflowY: "scroll",
          }}
        >
          <div style={{ marginBottom: "40px" }}>
            <Title level={4} style={{ fontWeight: "normal" }}>
              Manage this site’s title, description, and other general
              properties.
            </Title>
          </div>
          <Title level={5} style={{ fontWeight: "normal", color: "#616161" }}>
            Title (required)
          </Title>
          <Input
            style={{
              borderRadius: 5,
              height: "60px",
              backgroundColor: "white",
              marginBottom: 20,
            }}
            bordered={false}
            value={title}
            onChange={(e) => title = e.target.value}
          />
          <Title
            level={5}
            style={{ fontWeight: "normal", color: "#616161", marginBottom: 30 }}
          >
            This site’s title (and what gets shown at the top of the browser
            window).
          </Title>
          <Title level={5} style={{ fontWeight: "normal", color: "#616161" }}>
            Description (required)
          </Title>
          <Input
            style={{
              borderRadius: 5,
              height: "60px",
              backgroundColor: "white",
              marginBottom: 20,
            }}
            bordered={false}
            value={description}
            onChange={(e) => description = e.target.value}
          />
        </Content>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button
              type="primary"
              className="custom-button"
              onClick={saveChanges}
              style={{ height: 60, width: 200, marginTop: 10 }} // You can adjust the marginTop as needed
            >
              Save changes
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              className="custom-button"
              onClick={connectDefaultSubdomain}
              style={{ height: 60, width: 200, marginTop: 10 }} // You can adjust the marginTop as needed
            >
              Connect Domain
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              className="custom-button"
              onClick={commitIndexHtmlToGithub}
              style={{ height: 60, width: 200, marginTop: 10 }} // You can adjust the marginTop as needed
            >
              Publish
            </Button>
          </div>
        </div>
      </Layout>
    </Layout>
  );
}

const uploadButton = (
  <div
    style={{
      width: "80px",
      height: "80px",
      borderRadius: 12,
      boxShadow: "0px 0px 4px 0px #0009",
      // border: '2px solid black',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      lineHeight: 1,
      flexDirection: "column",
      background: "#ccc",
    }}
  >
    {/* {loading ? <LoadingOutlined /> : } */}
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default SiteComponent;
