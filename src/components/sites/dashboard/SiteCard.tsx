import { DeleteOutlined, EditOutlined, CopyOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Popover, QRCode, Space } from "antd";
import Meta from "antd/es/card/Meta";

export default function SiteCard({ data, onClone, onDelete }: any) {

    const { title, subtitle, description, deleted, image_url, site_url} = data;

    return <Card
    style={{ width: '100%' }}
    cover={
        <div style={{ overflow: "hidden", maxHeight: "320px" }}>
          <img
            alt="example"
            style={{ height: '100%' }}
            src={image_url}
          />
        </div>
      }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <CopyOutlined key="clone" onClick={onClone} />,
      <DeleteOutlined key="delete" onClick={onDelete} />,
    ]}
  >
    <Meta
      title={title}
      description={description}
    />
  </Card>
}