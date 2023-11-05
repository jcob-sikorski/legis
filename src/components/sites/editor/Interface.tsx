import { Button, Cascader, Checkbox, DatePicker, Flex, Form, Input, InputNumber, Layout, Radio, Select, Space, Switch, TreeSelect } from 'antd';
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';
import { BAR_WIDTH } from './const';
import { useEffect, useState } from 'react';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useParams } from 'react-router-dom';
const { Sider } = Layout;

import PROFILES from '../../templates/profiles.json';

import { FireOutlined, PlusOutlined, RocketOutlined } from '@ant-design/icons';

function Interface({json, setJson, data, setData, processJson, functions, variables} : any) {

  const { onAddSection, setSelectedSectionId, setSelectedTemplateId, onDeploy } = functions ?? {};
  const { selectedSectionId, selectedTemplateId } = variables;

    const { site_id } = useParams();

    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

    const [isDevMode, setIsDevMode] = useState<boolean>(false);

    // profiles & fields
    const profiles: any = PROFILES;
    const [profile, setProfile] = useState<any>({});
    const [fields, setFields] = useState<any[]>([]);

    useEffect(() => {
      const newProfile = selectedTemplateId ? profiles[selectedTemplateId] : {};
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
    type FieldType = "input" | "textarea" | "checkbox";

    function switchField(field: JSONProfileField) {

      let type: FieldType = field.type;
      let label: string = field.label;
      let id: string = field.id;
      switch(type) {
        case 'input':
          return <Form.Item name={id} label={label.toUpperCase()} style={{margin: 0, padding: 0, background: '#0ff2'}}>
          <Input />
        </Form.Item>;
        case 'textarea': 
          return <Form.Item name={id} label={label.toUpperCase()} style={{margin: 0, padding: 0, background: '#f0f2'}}>
          <TextArea rows={3} />
        </Form.Item>
        case 'checkbox':
          return <Form.Item name={id} label={label.toUpperCase()} style={{margin: 0, padding: 0, background: '#ff02'}} >
          <Radio.Group>
            <Radio value="1">Yes</Radio>
            <Radio value="">No</Radio>
          </Radio.Group>
        </Form.Item>
      }

    }

    const sectionsCount = data?.length ?? 0;

    return ( <Sider
        width={BAR_WIDTH}
        style={{
          background: '#ddd',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Space>
            dev mode
            <Switch className='bg-red' checked={isDevMode} onClick={() => setIsDevMode(!isDevMode)} />
        </Space>
        {isDevMode && <>
            <br /> selectedTemplateId: {selectedTemplateId} <br />
            <br /> 2: {selectedSectionId} <br />
            <TextArea style={{minHeight: 300}} value={json} onChange={(e: any) => setJson(e.target.value)} />
            json: {JSON.stringify(json)}<br /><br />
            data: {JSON.stringify(data)}<br /><br />
            profile: {JSON.stringify(profile)}
        </>
        }
        

        <Button style={{maxWidth: '150px', fontWeight: 'bold', backgroundColor: 'black'}} type="primary" icon={<PlusOutlined />} size='large' onClick={onAddSection}>
            New section
        </Button>

        <Button style={{maxWidth: '150px', fontWeight: 'bold', backgroundColor: 'black'}} type="primary" icon={<RocketOutlined />} size='large' onClick={onDeploy}>
            Deploy
        </Button>

      
      {sectionsCount > 0 && data.filter((d: any) => d.section_id === selectedSectionId).map(() => <Form
          onValuesChange={handleFormChange}
          key={selectedSectionId + '-form'}
          layout="vertical"
          initialValues={data.filter((d: any) => d.section_id === selectedSectionId)[0] ?? {}}
          size={componentSize as SizeType}
          style={{ maxWidth: 600, padding: 10 }}
        >
          {/* {JSON.stringify(fields)} */}
          {fields && fields.map((field: JSONProfileField) => switchField(field))}
        </Form>)}
        

      </Sider> );
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