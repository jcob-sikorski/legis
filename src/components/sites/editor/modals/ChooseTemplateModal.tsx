import React, { useState } from 'react';
import { Button, Col, Divider, Modal, Row, Space } from 'antd';
import {faker} from '@faker-js/faker';
import { groupProfilesByCategory } from '../../../../utils';

// import profiles from '../../../templates/profiles.json';

const ChooseTemplateModal: React.FC = ({setOpen, open, onTemplateSelected} : any) => {

  const [templateId, setTemplateId] = useState("");

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    onTemplateSelected(templateId);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const imgStyle = { cursor: 'pointer'}
  const selectedImgStyle = { cursor: 'pointer', border: '4px solid #ff6550'}
  


  const groups = groupProfilesByCategory();

  return (
    <>
      <Modal
        open={open}
        title="Choose template"
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{style: {backgroundColor: 'black'}}}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        {/* groups:
        {JSON.stringify(groups)} */}
        {Object.keys(groups)?.map((groupKey: any) => {
            const group: any = groups[groupKey];
            return <><Divider orientation="left">{group.label ?? "[No section label]"}</Divider>
            <Row justify="start" style={{gap: 10}}>
                
                {group.profiles.length > 0 && group.profiles.map((profile: any) => <Col key={profile.id} onClick={() => setTemplateId(profile.id)} span={4}>
                    <img src={faker.image.url()} style={profile.id === templateId ? selectedImgStyle : imgStyle} /> 
                </Col>)}

            </Row></>
        } )}
      </Modal>
    </>
  );
};

export default ChooseTemplateModal;