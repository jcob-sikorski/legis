import { Button, Cascader, Checkbox, Col, DatePicker, Flex, Form, Input, InputNumber, Layout, Radio, Row, Select, Space, Switch, TreeSelect, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';
import { DEV_JSON_TO_INJECT, RIGHT_BAR_WIDTH, TEMPLATES_HEROS, templatesMap } from './const';
import { useEffect, useState } from 'react';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useParams } from 'react-router-dom';
const { Sider } = Layout;

import PROFILES from '../../templates/profiles.json';

import { EditOutlined, FireOutlined, MinusOutlined, PlusOutlined, RocketOutlined, SwapOutlined } from '@ant-design/icons';
import ImageUploadInput from './ImageUploadInput';
import { FieldContext, FieldType, JSONProfileField } from '../../../models';
import { switchTemplateSet } from '../../../utils';

function Interface({json, setJson, data, setData, processJson, functions, variables} : any) {

  const { onAddSection, setSelectedSectionId, setSelectedTemplateId, onDeploy, setIsDevMode, setIsDeploying } = functions ?? {};
  const { selectedSectionId, selectedTemplateId, isDevMode, isDeploying, context } = variables;

    const { site_id } = useParams();

    // profiles & fields
    const profiles: any = PROFILES;
    const [profile, setProfile] = useState<any>({});
    const [fields, setFields] = useState<any[]>([]);

    useEffect(() => {
      const newProfile = selectedTemplateId ? profiles[selectedTemplateId] : {};
      console.log("selected profile template: ", newProfile);
      setProfile(newProfile);
      setFields(newProfile?.fields ?? []);
    }, [selectedTemplateId])

    const handleFormChange = (changedValues: any, allValues: any) => {
      console.log("allValues: ", allValues);
      setData([...data].map((x: any) => x.section_id === selectedSectionId ? {...x, ...allValues} : x));
      console.log("data: ", data);
      console.log("selectedSectionId: ", selectedSectionId);
    };
    
    console.log("selectedTemplateId: ", selectedTemplateId);
    console.log()
    
    function handleCustomFieldChange(valueKeyPair: any) {
      console.log("handleCustomFieldChange: ", valueKeyPair);
      setData([...data].map((x: any) => x.section_id === selectedSectionId ? {...x, ...valueKeyPair} : x));
      
    }

    function handleSerialFieldChange(valueKeyPair: any, index: number) {

    }

    function onDesignSetSelected(value: string) {
      assertTemplateIds(switchTemplateSet(value));
    }

    function assertTemplateIds(templateIds: string[]) {
      let newData = [...data]?.map((x: any, i: number) => ({...x, template_id: templateIds[i]}));
      setData(newData);
      // newData = newData?.map 
    }

    function onRemoveSection() {
      setData((data ?? []).filter((s: any) => s.section_id !== selectedSectionId))
      setSelectedSectionId("");
      setSelectedTemplateId("");
    }

    function onTemplateChange(template_id: string) {
      setSelectedTemplateId(template_id);
      setData((data ?? []).map((s: any) => s.section_id === selectedSectionId ? {...s, template_id} : s))
    }

    function injectData() {
      try {
        if (data) {
          console.log(JSON.parse(DEV_JSON_TO_INJECT));
          setData(JSON.parse(DEV_JSON_TO_INJECT));
        }
      } catch {
        alert("Dev: Error parsing DEV_JSON_TO_INJECT")
      }
    }

    // const { fields } = profile;

    // "super-heading": 1,
    // "heading": 1,
    // "sub-heading": 1,
    // "btn-label": 1,
    // "bg-image": 1

    function getSerialFieldValue(collection: string, key: string, index: number) {
      const res = data?.filter(({section_id}: any) => section_id === selectedSectionId)[0][collection][index][key];
      console.log("getSerialFieldValue: ", res)
      return res;
    }

    function switchField(field: FieldContext) {

      if (!field) return <>No field selected rn!</>

      let type: FieldType = field?.type;
      let label: string = field?.label;
      let key: string = field?.key;
      let index: number = field?.index;
      let ratio: number = field?.ratio;
      let collection: string = field?.collection;

      const generatedKey = 'field' + type + label + key + index + ratio;

      const labelComponent = <Typography.Title color='#333' level={5} style={{margin: '15px 0 0 0', padding: 0, textAlign: 'center', width: '100%', fontWeight: 500}} >
      {label?.toUpperCase()}
      </Typography.Title>

      const itemStyle = { margin: '0', padding: 0,}

      if (index || index === 0) {

        switch(type) {
          case 'text':
            return <div key={generatedKey} >
          {labelComponent} + {getSerialFieldValue(collection, key, index)}
          <Form.Item className='animate__slideIn' name={key} style={itemStyle}>
          <Input value={getSerialFieldValue(collection, key, index)} onChange={
            (e) => handleSerialFieldChange({[key]: e.target.value}, index)} />
        </Form.Item></div>;
          case 'textarea': 
          return <div key={generatedKey} >
            {labelComponent}
            <Form.Item className='animate__slideIn' name={key} style={itemStyle}>
            <TextArea rows={10} />
          </Form.Item></div>
          case 'checkbox':
            return <div key={generatedKey}>
            {labelComponent}
            <Form.Item className='animate__slideIn' name={key} style={itemStyle}>
            <Radio.Group style={{display: 'flex', justifyContent: 'center'}}>
              <Radio value="1">Yes</Radio>
              <Radio value="">No</Radio>
            </Radio.Group>
          </Form.Item></div>
          case 'image': {
            
            // Select current photo cdn uuid
            let oldUUID = "";
            data.map((x: any) => {if (x.section_id === selectedSectionId) oldUUID = x.cdnUUID})
            
            return <div key={generatedKey} >
            {labelComponent}
            <Form.Item className='animate__slideIn' name={key} style={itemStyle} >
            <ImageUploadInput ratio={ratio} handleCustomFieldChange={handleCustomFieldChange} oldUUID={oldUUID} />
          </Form.Item></div>
          }
          default: {
            return <>No input of type <b>{type}</b> matched</>
          }
        }

      } else {

        switch(type) {
          case 'text':
            return <div key={generatedKey} >
          {labelComponent}
          <Form.Item className='animate__slideIn' name={key} style={itemStyle}>
          <Input />
        </Form.Item></div>;
        case 'textarea': 
        return <div key={generatedKey} >
          {labelComponent}
          <Form.Item className='animate__slideIn' name={key} style={itemStyle}>
          <TextArea rows={10} />
        </Form.Item></div>
        case 'checkbox':
          return <div key={generatedKey}>
          {labelComponent}
          <Form.Item className='animate__slideIn' name={key} style={itemStyle}>
          <Radio.Group style={{display: 'flex', justifyContent: 'center'}}>
            <Radio value="1">Yes</Radio>
            <Radio value="">No</Radio>
          </Radio.Group>
        </Form.Item></div>
        case 'image': {
          
          // Select current photo cdn uuid
          let oldUUID = "";
          data.map((x: any) => {if (x.section_id === selectedSectionId) oldUUID = x.cdnUUID})
          
          return <div key={generatedKey} >
          {labelComponent}
          <Form.Item className='animate__slideIn' name={key} style={itemStyle} >
          <ImageUploadInput ratio={ratio} handleCustomFieldChange={handleCustomFieldChange} oldUUID={oldUUID} />
        </Form.Item></div>
        }
        default: {
          return <>No serial input of type <b>{type}</b> matched</>
        }
      }

      }
      
    }
    
    const sectionsCount = data?.length ?? 0;
    
    const selectedTemplateProfile: any = profiles[selectedTemplateId]
    let selectOptions: any[] = [];
    
    if (selectedTemplateProfile) {
      const category: string = selectedTemplateProfile.metadata.category;
      selectOptions = templatesMap[category];
    }

    return ( 
      <>
        {/* <Flex vertical className='my-5'>
          <Typography.Text>
            key: <b>{context?.key}</b> <br />
          </Typography.Text>
          <Typography.Text>
            type: <b>{context?.type}</b> <br />
          </Typography.Text>            
        </Flex> */}
        <Space style={{padding: 25}}>
            dev mode
            <Switch checked={isDevMode} onClick={() => setIsDevMode(!isDevMode)} />
        </Space>
        {isDevMode && !isDeploying && <>
            <button onClick={injectData}>Inject hard-coded data JSON</button>
            <Space>
              isDeploying
              <Switch checked={isDeploying} onClick={() => setIsDeploying(!isDeploying)} />
            </Space>
            <br /> selectedTemplateId: {selectedTemplateId} <br />
            <br /> 2: {selectedSectionId} <br />
            <TextArea style={{minHeight: 300}} value={json} onChange={(e: any) => setJson(e.target.value)} />
            json: {JSON.stringify(json)}<br /><br />
            data: {JSON.stringify(data)}<br /><br />
            profile: {JSON.stringify(profile)}
        </>
        }
        
        

        {/* <Button style={{maxWidth: '150px', fontWeight: 'bold', backgroundColor: 'black'}} type="primary" icon={<PlusOutlined />} onClick={onAddSection}>
            New section
        </Button> */}
        
        
        {sectionsCount && <>
          {/* <Button style={{maxWidth: '190px', fontWeight: 'bold', backgroundColor: '#c00'}} type="primary" icon={<MinusOutlined />} size='large' onClick={onRemoveSection}>
              Remove section
          </Button> */}
          <Flex justify='center' vertical align='center' className='p-3 text-gray-500'>
            {/* <Typography.Title style={{fontSize: 18}} className='uppercase'>
              design sets
            </Typography.Title>

            <Radio.Group onChange={(e) => onDesignSetSelected(e.target.value)} style={{gap: 5, display: 'flex', maxWidth: '100%'}}>
              <Radio.Button value={'generic-dark'} >
                Generic Dark
              </Radio.Button>
              <Radio.Button value={'casual-light'} >
                Casual Light
              </Radio.Button>
            </Radio.Group> */}
            
            {/* <Typography.Title style={{fontSize: 18}} className='uppercase'>
              Try other templates
            </Typography.Title>
            
            <Radio.Group onChange={(e) => onTemplateChange(e.target.value)} style={{gap: 5, display: 'flex', maxWidth: '100%'}}>
              {selectOptions?.map((option: any) => <Radio.Button value={option.value} style={{width: 120, height: 60}}>
                <img src={option.image} style={{width: 100, height: 50}} />
                {option.label}
              </Radio.Button>)}
            </Radio.Group> */}
            {/* <Select
              defaultValue={selectedTemplateId}
              key={selectedSectionId + '-select'}
              style={{ width: 120 }}
              onChange={onTemplateChange}
              options={selectOptions}
            /> */}
          </Flex>
        </>
        }
        
      
      {sectionsCount > 0 && data.filter((d: any) => d.section_id === selectedSectionId).map(() => <Form
          size='large'
          onValuesChange={handleFormChange}
          key={selectedSectionId + '-form'}
          layout="vertical"
          initialValues={data.filter((d: any) => d.section_id === selectedSectionId)[0] ?? {}}
          style={{ width: RIGHT_BAR_WIDTH, padding: 10 }}
        >
          {/* {JSON.stringify(fields)} */}
          {/* {fields && fields.map((field: JSONProfileField) => switchField(field))} */}
          {/* Field */}
          {switchField(context)}
          {/* <Row >
            <Col span={12}>
              <Button style={{backgroundColor: '#090', width: '100%', color: 'white'}}>Save changes</Button>
            </Col>
            <Col span={12}>
              <Button style={{backgroundColor: '#c00', width: '100%', color: 'white'}}>Cancel</Button>
            </Col>
          </Row> */}
        </Form>)
        }
</>);
}

{/* <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="HEADING">
        <Input />
      </Form.Item>
      <Form.Item label="SUB-HEADING">
          <TextArea rows={3} />
        </Form.Item>
      <Form.Item label="Select">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="TreeSelect">
        <TreeSelect
          treeData={[
            { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
          ]}
        />
      </Form.Item>
      <Form.Item label="Cascader">
        <Cascader
          options={[
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [{ value: 'hangzhou', label: 'Hangzhou' }],
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>
      <Form.Item label="InputNumber">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Switch" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Button">
        <Button>Button</Button>
      </Form.Item> */}

export default Interface;