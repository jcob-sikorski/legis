import { DeleteOutlined, EditOutlined, LinkOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Popover, QRCode, Space } from "antd";
import Meta from "antd/es/card/Meta";

export default function SiteCard({data}: any) {

    const { title, description, photoURL, siteURL} = data;

    return <Card
    style={{ width: '100%' }}
    cover={
        <div style={{ overflow: "hidden", maxHeight: "320px" }}>
          <img
            alt="example"
            style={{ height: '100%' }}
            src={photoURL}
          />
        </div>
      }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <Popover key="share" overlayInnerStyle={{ padding: 10 }} content={
        <Space direction="vertical" align="center">
            <QRCode value={siteURL} bordered={false} />
            <a style={{marginInline: 'auto'}}>{siteURL}</a>
            <span onClick={() => copyTextToClipboard(siteURL)} style={{cursor: 'pointer'}}>Click to copy link</span>
        </Space>
    }>
      <LinkOutlined  width={100} height={100} src={siteURL} alt="icon" />
  </Popover>,
      <DeleteOutlined key="delete" />,
    ]}
  >
    <Meta
      title={title}
      description={description}
    />
  </Card>
}