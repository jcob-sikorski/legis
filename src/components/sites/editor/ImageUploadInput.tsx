import React, { useEffect, useState } from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, UploadFile, UploadProps, message} from 'antd';
import ImgCrop from 'antd-img-crop';
import Dragger from 'antd/es/upload/Dragger';
import { RcFile } from 'antd/es/upload';
import {uploadFile} from '@uploadcare/upload-client'
import { config } from '../../../config';
import { warn } from 'console';


const ImageUploadInput = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const props: UploadProps = {
        name: 'file',
        maxCount: 1,
        multiple: false,
        // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
            handleUpload()
          console.log('Dropped files', e.dataTransfer.files);
        },
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
          },
          beforeUpload: (file) => {
            setFileList([...fileList, file]);
      
            return false;
          },
          fileList,
      };

    const handleUpload = () => {
        const url = 'https://upload.uploadcare.com/base/';
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file as RcFile);
      });
      setUploading(true);
      // You can use any AJAX library you like
    //   uploadFile(fileList[0], {
    //     publicKey: 'YOUR_PUBLIC_KEY',
    //     fileName: fileList[0].fileName});

    // const formData = new FormData(form);
        formData.append('UPLOADCARE_PUB_KEY', config.pkUploadcare);

        const fetchOptions = {
            method: 'post',
            body: formData
        };

        fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => {
            const uuid = data.file;
            const photoUrl = `https://ucarecdn.com/${uuid}/`;
            alert("photoUrl: " + photoUrl)
            return fetch(photoUrl);
        })
        .then(() => {
          setFileList([]);
          alert("success")
          message.success('upload successfully.');
        })
        .catch(() => {
        alert("error")
          message.error('upload failed.');
        })
        .finally(() => {
          setUploading(false);
        });
    };
 
    useEffect(() => {
        if (fileList[0]) {
            handleUpload()
        }
    }, [fileList])

    console.log(fileList);

    return <Space direction="vertical" style={{ width: '100%' }} size="large">
        <ImgCrop rotationSlider aspect={16/8}>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
            </Dragger>
        </ImgCrop>
    </Space>
};

export default ImageUploadInput;