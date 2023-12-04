import React, { useEffect, useRef, useState } from 'react';
import { Layout, Input, Button, Typography, message, Space, Flex, Upload, Image } from 'antd';
import Site from '../../../models/Site';
import { useRedux } from '../../../hooks/useRedux';
import * as Realm from 'realm-web';
import { config } from '../../../config';
import axios from 'axios';

import Sidebar from '../menu';
import SettingsMenu from './SettingsMenu';
import { useApp } from '../../RealmApp';
import { useDispatch } from 'react-redux';
import { setSite } from '../../../redux/actions';
import ImgCrop from 'antd-img-crop';
import Dragger from 'antd/es/upload/Dragger';
import { GlobalOutlined, InboxOutlined, InteractionTwoTone, PlusOutlined } from '@ant-design/icons';
import { uploadDirect, uploadFromUrl } from '@uploadcare/upload-client';
import { getUrl } from '../../../utils';

const { Header, Content } = Layout;
const { Title } = Typography;

function SiteComponent() {
  const [site] = useRedux('site');

  console.log(site?.title, site?.description, 'favicon_url', site?.favicon_url)
  
  const [siteTitle, setSiteTitle] = useState<string>(site?.title || "");
  const [siteDescription, setSiteDescription] = useState<string>(site?.description || "");
  const [siteFaviconURL, setSiteFaviconURL] = useState<string>(site?.favicon_url || "");
  const [errorField, setErrorField] = useState<string>("");

  // use

  const dispatch = useDispatch();
  useEffect(() => {
    setSiteTitle(site?.title);
    setSiteDescription(site?.description);
    setSiteFaviconURL(site?.favicon_url);
  }, [site])

  const app: any = useApp();

  const mongodb = app.currentUser!.mongoClient('mongodb-atlas');
  const site_collection = mongodb.db('legis').collection('Site');

  const saveChanges = async () => {
    if (siteTitle !== site?.title) {
      try {
        const updateResult = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site!._id) },
          { $set: { title: siteTitle } }
        );
        console.log(`Updated ${updateResult.modifiedCount} document.`);
      } catch (error) {
        console.error('Error updating document:', error);
      }   
    }

    if (siteDescription !== site?.description) {
      try {
        const updateResult = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site!._id) },
          { $set: { description: siteDescription } }
        );
        console.log(`Updated ${updateResult.modifiedCount} document.`);
      } catch (error) {
        console.error('Error updating document:', error);
      }   
    }

    if (siteFaviconURL !== site?.favicon_url) {
      try {
        const updateResult = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site!._id) },
          { $set: { favicon_url: siteFaviconURL } }
        );
        console.log(`Updated ${updateResult.modifiedCount} document.`);
      } catch (error) {
        console.error('Error updating document:', error);
      }   
    }

    message.success('Saved changes.');
  };

  
  // const app: any = useApp();
  
  const currentUserID = app.currentUser!.id;

  // const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
  // const site_collection = mongodb.db("legis").collection("Site");

  const titleRef: any = useRef(null);
  async function handleBlurTitle() {
    // save to db once field is unfocused
    titleRef.current.blur();
    if (siteTitle === site?.title) return; // nothing new, cancel saving
    dispatch(setSite({...site, title: siteTitle}));
    await site_collection.updateOne(
      { _id: new Realm.BSON.ObjectId(site!._id) }, // Specify the query to find the site by site_id
      {
        $set: { title: siteTitle }, // Use $set to update the data field
      }
    );
  }

  
  const descriptionRef: any = useRef(null);
  async function handleBlurDescription() {
    if (!siteDescription) {setErrorField('description')}
    // save to db once field is unfocused
    titleRef.current.blur();
    if (siteTitle === site?.description) return; // nothing new, cancel saving
    dispatch(setSite({...site, description: siteDescription}));
    await site_collection.updateOne(
      { _id: new Realm.BSON.ObjectId(site!._id) }, // Specify the query to find the site by site_id
      {
        $set: { description: siteDescription }, // Use $set to update the data field
      }
    ).then(() => console.log("Saved description."))
  }


  const handleTitleChange = (newValue: string) => {
    newValue ? setErrorField("") : setErrorField("title");
    setSiteTitle(newValue);
  };

  const handleDescriptionChange = (newValue: string) => {
    newValue ? setErrorField("") : setErrorField("description");
    setSiteDescription(newValue);
  };



  

  async function beforeUpload(file: any){
    console.log("Before upload, " + file?.type)
    
    const isJpgOrPng = file.type === 'image/x-icon' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload ICO/PNG file!');
      return
    }

    const isSmallEnough = file.size / 1024 / 1024 < 0.5;
    if (!isSmallEnough) {
      message.error('Icon must smaller than 0.5MB!');
      return 
    }
  
    await uploadDirect(file, {
      publicKey: config.pkUploadcare,
      store: 'auto',
    }).then( async (result: any) => {
      const newSiteFaviconURL = getUrl(result.uuid);

      try {
        const updateResult = await site_collection.updateOne(
          { _id: new Realm.BSON.ObjectId(site!._id) },
          { $set: { favicon_url: newSiteFaviconURL } }
        );
        console.log(`Updated ${updateResult.modifiedCount} document.`);

        setSiteFaviconURL(newSiteFaviconURL);
        dispatch(setSite({...site, favicon_url: newSiteFaviconURL}));
        console.log("result: ", result);
        console.log("result.uuid: ", result.uuid);
      } catch (error) {
        console.error('Error updating document:', error);
      }

    })

    return false;
}


  return (
    <Layout key={`site-settings-${site!._id}`} hasSider style={{
       overflowY: 'scroll',
        // display: 'flex'
         }}>
      <Sidebar />
      <SettingsMenu defaultSelectedKey='2'/>
      <Layout style={{  overflowY: 'scroll',}}>
        {/* <Header style={{ background: '#ff0', padding: 16, margin: 0, textAlign: 'left' }}/> */}
        <Title level={2} style={{fontWeight: 'normal', height: 40, padding: '10px 16px'}}>Site</Title>
        <Content 
        style={{ 
          padding: 16,
          paddingTop: 0,
          //  marginTop: 0,
          //  height: '400px',
           maxHeight: 'calc(100vh - 140px)',
           overflowY: 'scroll'
           }}>
          <div style={{ marginBottom: '40px' }}>
            <Title level={4} style={{fontWeight: 'normal'}}>Manage this site’s title, description,  and other general properties.</Title>
          </div>
          <Title level={5} style={{fontWeight: 'normal', color: '#616161'}}>
            Title (required)
          </Title>
          <Input
            style={{ borderRadius: 5, height: '60px', backgroundColor: 'white', marginBottom: 20 }}
            bordered={false}
            value={siteTitle}
            // placeholder={site?.title}
            onBlur={handleBlurTitle}
            ref={titleRef}
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <Title level={5} style={{fontWeight: 'normal', color: '#616161', marginBottom: 30}}>This site’s title (and what gets shown at the top of the browser window).</Title>
          <Title level={5} style={{fontWeight: 'normal', color: '#616161'}}>Description (required)</Title>
          <Input
            style={{ borderRadius: 5, height: '60px', backgroundColor: 'white', marginBottom: 20 }}
            bordered={false}
            value={siteDescription}
            placeholder={site?.description}
            onBlur={handleBlurDescription}
            ref={descriptionRef}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
          <Title level={5} style={{fontWeight: 'normal', color: '#616161', marginBottom: 30}}>A brief description of this site (and what’s usually used in bookmarks, search engine listings, etc.)</Title>
          
          <Title level={5} style={{fontWeight: 'normal', color: '#616161'}}>
            Icon (.ico or .png)
          </Title>
          <Space direction="vertical" style={{ width: '100%', borderRadius: 12, backgroundColor: 'white' }} size="large">
          <Flex style={{
      width: '100%', 
      borderRadius: 4,
      // justifyContent: '',
      }}>
      <ImgCrop fillColor='#0000' 
      modalProps={{okButtonProps: { style: {backgroundColor: '#1677ff'}}}} 
      cropperProps={{
        style: {
            containerStyle: {
            background: '#999',
            backgroundPosition: '50%',
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/6/66/White_grey_checkerboard.svg'",
            }
          },
        // required props set to default to avoid <ImgCrop /> error
        zoomSpeed: 1,
        restrictPosition: true,
        mediaProps: {}
      }} 
      cropShape='rect' rotationSlider aspect={1}>
        <Upload
          name="avatar"
          style={{width: '100%', height: '100%', 
          borderRadius: 4, 
          background: '#aaa',
          border: '2px solid black'}}
          // listType=""
          showUploadList={false}
          beforeUpload={beforeUpload}
          // onChange={handleChange}
          >
            {siteFaviconURL ? <Flex style={{width: '100%', gap: 5}} justify='center' align='center'>
              <img src={siteFaviconURL} alt="icon-big" 
              className="overflow-hidden bg-cover bg-no-repeat"
              style={{ 
                minWidth: '120px', 
                maxWidth: '120px', 
                minHeight: '120px',
                maxHeight: '120px',
                borderRadius: 4, 
              // border: '2px solid black'
              }} /> 
              {/* {siteFaviconURL} */}
              <img src={siteFaviconURL} alt="icon-medium" 
            className="relative overflow-hidden bg-cover bg-no-repeat"
            style={{ 
              minWidth: '60px', 
              minHeight: '60px',
              maxHeight: '60px',
              maxWidth: '60px',
              borderRadius: 4, 
              // border: '2px solid black'
              }} />
              <img src={siteFaviconURL} alt="icon-small"
            className="overflow-hidden bg-cover bg-no-repeat"
            style={{ 
              minWidth: '30px', 
              minHeight: '30px',
              maxHeight: '30px',
              maxWidth: '30px',
              borderRadius: 4, 
              // border: '2px solid black'
              }} />
              </Flex>: uploadButton}
          </Upload>
        </ImgCrop>
    </Flex>
          </Space>
          <Title level={5} style={{fontWeight: 'normal', color: '#616161', marginBottom: 30}}>
            This icon will be displayed in site's tab view. 
          </Title>
          {/* svg: */}
          {/* <Image 
            width={100} 
            height={100} 
            src='https://upload.wikimedia.org/wikipedia/commons/0/09/Van_den_Clooster_wapen.svg' 
          /> */}
          {/* <ReactSVG src='https://upload.wikimedia.org/wikipedia/commons/0/09/Van_den_Clooster_wapen.svg' /> */}
          {/* <SvgComponent url='https://ucarecdn.com/17553bdd-a288-4f1d-9fbf-515ccb8f4086/rasterize' /> */}
          <Title level={5} style={{fontWeight: 'normal', color: '#616161'}}>Action</Title>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ backgroundColor: 'black', height: 30, width: 30, borderRadius: 50, marginLeft: 10 }} />
            <div style={{ marginLeft: 10, color: 'black' }}>Publish to .legis.co URL</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ backgroundColor: 'black', height: 30, width: 30, borderRadius: 50, marginLeft: 10 }} />
            <div style={{ marginLeft: 10, color: 'black' }}>Publish to custom domain</div>
          </div>
          {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ backgroundColor: 'black', height: 30, width: 30, borderRadius: 50, marginLeft: 10 }} />
            <div style={{ marginLeft: 10, color: 'black' }}>Save as a template</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ backgroundColor: 'black', height: 30, width: 30, borderRadius: 50, marginLeft: 10 }} />
            <div style={{ marginLeft: 10, color: 'black' }}>Save as an offline draft</div>
          </div> */}
          
        </Content>
        <div>
        <Button
            type="primary"
            className="custom-button"
            onClick={saveChanges}
            style={{ height: 60, width: 200, marginTop: 10 }} // You can adjust the marginTop as needed
          >
            Save changes
          </Button>
        </div>
      </Layout>
    </Layout>
  );
};

const uploadButton = (
  <div style={{ 
    width: '80px', 
    height: '80px',
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

export default SiteComponent;
