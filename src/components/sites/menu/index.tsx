import { Layout, Menu } from 'antd';
import { AppstoreOutlined, BarChartOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const App = () => (
  <Sider width={'100'}>
    <Menu
      defaultSelectedKeys={['1']}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 4 }}
    >
      {[
        { key: '1', icon: <AppstoreOutlined style={{ fontSize: '24px' }}/> },
        { key: '2', icon: <BarChartOutlined style={{ fontSize: '24px' }}/> },
        { key: '3', icon: <SettingOutlined style={{ fontSize: '24px' }}/> },
        { key: '4', icon: <UserOutlined style={{ fontSize: '24px' }}/> },
      ].map(item => (
        <Menu.Item key={item.key} icon={item.icon} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      ))}
    </Menu>
  </Sider>
);

export default App;
