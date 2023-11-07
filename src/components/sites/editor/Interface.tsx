import { Button, Cascader, Checkbox, DatePicker, Flex, Form, Input, InputNumber, Layout, Radio, Select, Space, Switch, TreeSelect, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';
import { RIGHT_BAR_WIDTH } from './const';
import { useEffect, useState } from 'react';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useParams } from 'react-router-dom';
const { Sider } = Layout;

import PROFILES from '../../templates/profiles.json';

import { EditOutlined, FireOutlined, MinusOutlined, PlusOutlined, RocketOutlined } from '@ant-design/icons';
import ImageUploadInput from './ImageUploadInput';

function Interface({json, setJson, data, setData, processJson, functions, variables} : any) {

  const { onAddSection, setSelectedSectionId, setSelectedTemplateId, onDeploy, setIsDevMode, setIsDeploying } = functions ?? {};
  const { selectedSectionId, selectedTemplateId, isDevMode, isDeploying } = variables;

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

    function onRemoveSection() {
      setData((data ?? []).filter((s: any) => s.section_id !== selectedSectionId))
      setSelectedSectionId("");
      setSelectedTemplateId("");
    }

    function onTemplateChange(template_id: string) {
      setSelectedTemplateId(template_id);
      setData((data ?? []).map((s: any) => s.section_id === selectedSectionId ? {...s, template_id} : s))
    }

    // const { fields } = profile;

    // "super-heading": 1,
    // "heading": 1,
    // "sub-heading": 1,
    // "btn-label": 1,
    // "bg-image": 1


    interface JSONProfileField {
      id: string,
      label: string,
      type: FieldType,
      subtype: number,
    }
    type FieldType = "input" | "textarea" | "checkbox" | "image";

    function switchField(field: JSONProfileField) {

      let type: FieldType = field.type;
      let label: string = field.label;
      let id: string = field.id;

      const labelComponent = <Typography.Title color='gray' type='secondary' level={5} style={{margin: '15px 0 0 0', padding: 0, textAlign: 'center', width: '100%'}} >
      {label.toUpperCase()}
      </Typography.Title>

      const itemStyle = { margin: '0', padding: 0,}

      switch(type) {
        case 'input':
          return <>
          {labelComponent}
          <Form.Item name={id} style={itemStyle}>
          <Input />
        </Form.Item></>;
        case 'textarea': 
          return <>
          {labelComponent}
          <Form.Item name={id} style={itemStyle}>
          <TextArea rows={3} />
        </Form.Item></>
        case 'checkbox':
          return <>
          {labelComponent}
          <Form.Item name={id} style={itemStyle}>
          <Radio.Group>
            <Radio value="1">Yes</Radio>
            <Radio value="">No</Radio>
          </Radio.Group>
        </Form.Item></>
        case 'image':
          return <>
          {labelComponent}
          <Form.Item name={id} style={itemStyle} >
          <ImageUploadInput />
        </Form.Item></>
      }

    }

    const sectionsCount = data?.length ?? 0;

    return ( 
      <>
        {/* <Space>
            dev mode
            <Switch checked={isDevMode} onClick={() => setIsDevMode(!isDevMode)} />
        </Space> */}
        {isDevMode && !isDeploying && <>
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
  
          <Select
            defaultValue={selectedTemplateId}
            key={selectedSectionId + '-select'}
            style={{ width: 120 }}
            onChange={onTemplateChange}
            options={[
              { value: 'THero1', label: 'Hero 1' },
              { value: 'TContact1', label: 'Contact 1' },
              { value: 'TContact2', label: 'Contact 2' },
              { value: 'TContact3', label: 'Contact 3' },
            ]}
          />
        </>
        }
        
      
      {sectionsCount > 0 && data.filter((d: any) => d.section_id === selectedSectionId).map(() => <Form
          size='large'
          onValuesChange={handleFormChange}
          key={selectedSectionId + '-form'}
          layout="vertical"
          initialValues={data.filter((d: any) => d.section_id === selectedSectionId)[0] ?? {}}
          style={{ width: '100%', maxWidth: 600, padding: 10 }}
        >
          {/* {JSON.stringify(fields)} */}
          {fields && fields.map((field: JSONProfileField) => switchField(field))}
        </Form>)}
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