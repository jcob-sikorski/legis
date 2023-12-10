import React, { useState } from "react";
import { Button, Col, Divider, Flex, Modal, Row, Space } from "antd";
import { faker } from "@faker-js/faker";
import { groupProfilesByCategory } from "../../../../utils";
import ScaledVisualisation from "../../../scaledVisualisation";
import Visualisation from "../Visualisation";

// import profiles from '../../../templates/profiles.json';

const MobilePreviewModal = ({ setOpen, open, data }: any) => {
  const [templateId, setTemplateId] = useState("");

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    // onTemplateSelected(templateId);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const imgStyle = { cursor: "pointer" };
  const selectedImgStyle = { cursor: "pointer", border: "4px solid #ff6550" };

  const groups = groupProfilesByCategory();

  return (
    <>
      <Modal
        //   style={{maxHeight: '75vh', overflow: 'scroll'}}
        open={open}
        title="Mobile site preview"
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "black" } }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <div style={{ maxHeight: "50vh" }}>
          <Flex
            justify="center"
            style={{
              maxWidth: "200px",
              maxHeight: "900px",
              overflow: "scroll",
              transform: "scale(1) translateY(-400px)",
            }}
          >
            <Visualisation data={data} mode="showcase" />
          </Flex>
        </div>
      </Modal>
    </>
  );
};

export default MobilePreviewModal;
