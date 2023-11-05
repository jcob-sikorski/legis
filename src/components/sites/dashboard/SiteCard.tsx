import { DeleteOutlined, EditOutlined, CopyOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Popover, QRCode, Space } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { setSite } from '../../../redux/actions';

export default function SiteCard({ data, onEdit, onClone, onDelete }: any) {

    const { title, subtitle, description, deleted, image_url, site_url, _id} = data;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onSettings() {
      dispatch(setSite(data));

      navigate('/site-settings')
  }

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
      <SettingOutlined key="setting" onClick={onSettings}/>,
      <EditOutlined key="edit" onClick={onEdit} />,
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