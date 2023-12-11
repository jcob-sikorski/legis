import {
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
  SettingOutlined,
  FormOutlined,
  LoadingOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Card, Popover, QRCode, Space, message } from "antd";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSite } from "../../../redux/actions";
import { getHeroImageURLFromBodyTemplate } from "../../../utils";
import { useEffect } from "react";

export const DEFAULT_IMAGE_URL =
  "https://mdbcdn.b-cdn.net/img/new/slides/146.webp";

export default function SiteCard({
  data,
  onEdit,
  onClone,
  onDelete,
  site_id,
}: any) {
  const { title, description, body_template } = data;

  let image_url = getHeroImageURLFromBodyTemplate(body_template);

  const navigate = useNavigate();

  function onSettings() {
    navigate(`/settings/${site_id}`);
  }

  function onSurvey() {
    navigate(`/survey/${site_id}`);
  }

  useEffect(() => {
    if (!body_template || body_template?.length <= 0) {
      message.info(`Please finish survey in the site "${title}"`);
    }
  }, []);

  return (
    <Card
      style={{ backgroundColor: "#f5f5fd", borderRadius: 10 }}
      cover={
        <div style={{ overflow: "hidden", maxHeight: "220px" }}>
          <img
            alt="example"
            style={{ width: "100%", height: "100%" }}
            src={image_url}
          />
        </div>
      }
      actions={[
        <SettingOutlined
          key="setting"
          onClick={onSettings}
          style={{ color: "black", fontWeight: "bold" }}
        />,
        <>
          {body_template && body_template?.length > 0 ? (
            <EditOutlined
              key="edit"
              onClick={onEdit}
              style={{ color: "black", fontWeight: "bold" }}
            />
          ) : (
            <AuditOutlined
              label="Finish the survey"
              key="survey"
              onClick={onSurvey}
              style={{ color: "black", fontWeight: "bold" }}
            />
          )}
        </>,
        <CopyOutlined
          key="clone"
          onClick={onClone}
          style={{ color: "black", fontWeight: "bold" }}
        />,
        <DeleteOutlined
          key="delete"
          onClick={onDelete}
          style={{ color: "black", fontWeight: "bold" }}
        />,
      ]}
      bodyStyle={{
        backgroundColor: "#f5f5fd",
      }}
    >
      <Meta
        title={<div style={{ fontSize: 20 }}>{title}</div>}
        description={<div style={{ fontSize: 14 }}>{description}</div>}
      />
      {/* <a href={site_url} target='_blank'>{site_url}</a> */}
    </Card>
  );
}
