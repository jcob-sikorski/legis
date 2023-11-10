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

      navigate('/overview-settings')
  }

    return (
      <Card
        style={{ backgroundColor: '#f5f5fd', borderRadius: 10 }}
        cover={
          <div style={{ overflow: "hidden", maxHeight: "220px" }}>
            <img
              alt="example"
              style={{ width: '100%', height: '100%' }}
              src={image_url}
            />
          </div>
        }
        actions={[
          <SettingOutlined key="setting" onClick={onSettings} style={{ color: 'black', fontWeight: 'bold' }}/>,
          <EditOutlined key="edit" onClick={onEdit} style={{ color: 'black', fontWeight: 'bold' }}/>,
          <CopyOutlined key="clone" onClick={onClone} style={{ color: 'black', fontWeight: 'bold' }}/>,
          <DeleteOutlined key="delete" onClick={onDelete} style={{ color: 'black', fontWeight: 'bold' }}/>,
        ]}
        bodyStyle={{
          backgroundColor: '#f5f5fd'
        }}
        
      >
        <Meta
          title={<div style={{fontSize: 20}}>{title}</div>}
          description={<div style={{fontSize: 14}}>{description}</div>}
        />
        {/* <a href={site_url} target='_blank'>{site_url}</a> */}
      </Card>
    );
}