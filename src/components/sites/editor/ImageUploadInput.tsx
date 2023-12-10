import React, { useEffect, useState } from "react";
import { InboxOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload, UploadFile, UploadProps, message } from "antd";
import ImgCrop from "antd-img-crop";
import Dragger from "antd/es/upload/Dragger";
import { RcFile } from "antd/es/upload";
import {
  uploadDirect,
  uploadFile,
  uploadFromUrl,
} from "@uploadcare/upload-client";
import { config } from "../../../config";
import { warn } from "console";
import axios from "axios";
// import crypto from 'crypto';
// import { createHmac } from 'crypto-browserify';
import { sha256 } from "js-sha256";
import { getUrl } from "../../../utils";
import { DEFAULT_IMAGE_URL } from "../dashboard/SiteCard";

const ImageUploadInput = ({
  handleCustomFieldChange,
  oldUUID: oldUUIDProps,
  ratio,
  fieldKey = "cdnUUID",
  inputSize = [120, 120],
}: any) => {
  const [resultUUID, setResultUUID] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [oldUUID, setOldUUID] = useState(oldUUIDProps);

  // alert(String(inputSize[0]) + " " + String(inputSize[1]))
  const publicKey = config.pkUploadcare; //pk - is public key?
  const privateKey = config.skUploadcare; // sk - is secret key?

  const handleDelete = async (uuid: string) => {
    const date = new Date().toUTCString();
    const signature = `${date}\nDELETE\n/files/${uuid}/\n`;
    const signatureHash = sha256.hmac
      .create(privateKey)
      .update(signature)
      .hex();

    const authHeader = `Uploadcare ${publicKey}:${signatureHash}`;

    try {
      const response = await axios.delete(
        `https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://api.uploadcare.com/files/${uuid}/`,
        {
          headers: {
            Authorization: authHeader,
            Date: date,
            Accept: "application/vnd.uploadcare-v0.5+json",
          },
        }
      );

      console.log("SUCCESSFULLY DELETED PHOTO OF UUID: ", uuid);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleRemove() {
    handleCustomFieldChange({ [fieldKey]: "" });
    setResultUUID("");
    setOldUUID("");
  }

  const uploadProps = {
    beforeUpload: async (file: any) => {
      console.log("Before upload");
      setUploading(true);
      let tempOldUUID = oldUUID;
      await uploadDirect(file, {
        publicKey: config.pkUploadcare,
        store: "auto",
      })
        .then((result) => {
          console.log("res", result);
          console.log("result: ", result);
          console.log("result.uuid: ", result.uuid);

          handleCustomFieldChange({ [fieldKey]: result.uuid });
          setResultUUID(result.uuid);
          // handleDelete(tempOldUUID);
        })
        .catch((err) => {
          console.log("err", err);
          message.error(err);
        });

      return false;
    },
    multiple: false,
    maxCount: 1,
  };

  const uploadButton = (
    <div
      style={{
        width: "100%",
        height: inputSize[1],
        marginTop: "-16px",
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

  return (
    <Space
      direction="vertical"
      style={{
        width: inputSize[0],
        borderRadius: 12,
        backgroundColor: "white",
        maxHeight: inputSize[1],
        padding: 0,
        margin: 0,
      }}
      size="large"
    >
      {/* <Upload {...uploadProps}>Click to Upload</Upload>; */}
      <ImgCrop
        fillColor="#0000"
        cropperProps={{
          style: {
            containerStyle: {
              background: "#999",
              backgroundPosition: "50%",
              backgroundImage:
                "url('https://upload.wikimedia.org/wikipedia/commons/6/66/White_grey_checkerboard.svg'",
            },
          },
          // required props set to default to avoid <ImgCrop /> error
          zoomSpeed: 1,
          restrictPosition: true,
          mediaProps: {},
        }}
        modalProps={{
          okButtonProps: { style: { backgroundColor: "#1677ff" } },
        }}
        rotationSlider
        aspect={ratio}
      >
        <Dragger
          showUploadList={false}
          style={{ all: "unset", background: "red", maxWidth: inputSize[0] }}
          {...uploadProps}
        >
          {resultUUID || oldUUID ? (
            <>
              <img
                src={getUrl(resultUUID || oldUUID)}
                alt="avatar"
                className="relative overflow-hidden bg-cover bg-no-repeat"
                style={{
                  background: "#0009",
                  // marginInline: 'auto',
                  marginTop: "-16px",
                  width: inputSize[0],
                  height: inputSize[1],
                  borderRadius: 4,
                  border: "2px solid black",
                }}
              />
              {/* <div></div> */}
            </>
          ) : (
            uploadButton
          )}
        </Dragger>
      </ImgCrop>
      <Button
        style={{ transform: "translateY(-30px)" }}
        danger
        type="primary"
        onClick={() => handleRemove()}
      >
        Click to DELETE
      </Button>
    </Space>
  );
};

export default ImageUploadInput;
