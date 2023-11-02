import { Layout } from 'antd';
import Title from 'antd/es/typography/Title';
import TextArea from 'antd/es/input/TextArea';
import { BAR_WIDTH } from './const';
const { Sider } = Layout;

function Interface({json, setJson, data, setData, processJson} : any) {

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
        <Title color='white'>
            Editor
        </Title>
        example:
        {`{\n
"template_id": "TContact1",\n
"email": "abc@abc.abc",\n
"title": "ABC",\n
"description": "Yep man"\n
}`}
        <TextArea style={{minHeight: '500px'}} value={json} onChange={(e: any) => setJson(e.target.value)} />
        json:
        {JSON.stringify(json)}
        data:
        {JSON.stringify(data)}
      </Sider> );
}

export default Interface;