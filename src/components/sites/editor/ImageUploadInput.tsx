import React, { useEffect, useState } from 'react';
import { InboxOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, UploadFile, UploadProps, message} from 'antd';
import ImgCrop from 'antd-img-crop';
import Dragger from 'antd/es/upload/Dragger';
import { RcFile } from 'antd/es/upload';
import {uploadDirect, uploadFile, uploadFromUrl, } from '@uploadcare/upload-client'
import { config } from '../../../config';
import { warn } from 'console';
import axios from 'axios';
// import crypto from 'crypto';
// import { createHmac } from 'crypto-browserify';
import { sha256 } from 'js-sha256';
import { getUrl } from '../../../utils';
import { DEFAULT_IMAGE_URL } from '../dashboard/SiteCard';

const ImageUploadInput = ({handleCustomFieldChange, oldUUID, ratio}: any) => {

    const [resultUUID, setResultUUID] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);

    const publicKey = config.pkUploadcare; //pk - is public key?
    const privateKey = config.skUploadcare; // sk - is secret key?
    
    const handleDelete = async (uuid: string) => {
      const date = new Date().toUTCString();
      const signature = `${date}\nDELETE\n/files/${uuid}/\n`;
      const signatureHash = sha256.hmac.create(privateKey).update(signature).hex();
    
      const authHeader = `Uploadcare ${publicKey}:${signatureHash}`;
    
      try {
        const response = await axios.delete(`https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://api.uploadcare.com/files/${uuid}/`, {
          headers: {
            'Authorization': authHeader,
            'Date': date,
            'Accept': 'application/vnd.uploadcare-v0.5+json',
          },
        });
    
        console.log("SUCCESSFULLY DELETED PHOTO OF UUID: ", uuid);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
     };

    const uploadProps = {
      beforeUpload: async (file: any) => {
        console.log("Before upload")
        setUploading(true);
        let tempOldUUID = oldUUID;
        await uploadDirect(file, {
          publicKey: config.pkUploadcare,
          store: 'auto',
        }).then((result) => {
          console.log("res", result);
          console.log("result: ", result);
          console.log("result.uuid: ", result.uuid);
  
          handleCustomFieldChange({cdnUUID: result.uuid})
          setResultUUID(result.uuid);
          // handleDelete(tempOldUUID);
        }).catch((err) => {
          console.log("err", err);
          message.error(err);
        })
  
        
        return false;
      },
      multiple: false,
      maxCount: 1,
    };
    
    return <Space direction="vertical" style={{ width: '120px', borderRadius: 12, backgroundColor: 'white', maxHeight: '120px', padding: 0, margin: 0 }} size="large">
      {/* <Upload {...uploadProps}>Click to Upload</Upload>; */}
        <ImgCrop rotationSlider aspect={ratio} >
            <Dragger showUploadList={false} style={{all: 'unset', background: 'red', maxWidth: '120px' }} {...uploadProps}>
              {resultUUID || oldUUID ? <><img src={getUrl(resultUUID || oldUUID)} alt="avatar" 
              className="relative overflow-hidden bg-cover bg-no-repeat"
              style={{ 
                // marginInline: 'auto',
                marginTop: '-16px',
                width: `120px`, 
                height: '120px',
                borderRadius: 4, 
                border: '2px solid black'
                }} />Click to change</> : uploadButton}
            </Dragger>
        </ImgCrop>
        
    </Space>
};

const uploadButton = (
  <div style={{ 
    width: '100%', 
    height: '120px',
    marginTop: '-16px',
    borderRadius: 12,
    boxShadow: '0px 0px 4px 0px #0009', 
    // border: '2px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 1,
    flexDirection: 'column',
    background: "#ccc"
     }}>
    {/* {loading ? <LoadingOutlined /> : } */}
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

export default ImageUploadInput;
