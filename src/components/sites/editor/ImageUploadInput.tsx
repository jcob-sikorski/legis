import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload, UploadFile } from 'antd';
import ImgCrop from 'antd-img-crop';

const ImageUploadInput = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    console.log(fileList);

    return <Space direction="vertical" style={{ width: '100%' }} size="large">
        <ImgCrop rotationSlider aspect={16/8}>
            <Upload
                action="uploadcare action? instead of https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture"
                fileList={fileList}
                maxCount={1}
            >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
        </ImgCrop>
    </Space>
};

export default ImageUploadInput;