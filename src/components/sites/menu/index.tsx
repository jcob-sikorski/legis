import { Layout, Menu } from 'antd';
import { AppstoreOutlined, BarChartOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const MainMenu = ({width = 100} : {width?: number}) => (
  <Sider width={width}>
    <Menu
      defaultSelectedKeys={['1']}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 4 }}
    >
      {[
        { key: '1', icon: <AppstoreOutlined style={{ fontSize: '24px' }}/>, to: '/dashboard' },
        { key: '2', icon: <BarChartOutlined style={{ fontSize: '24px' }}/> },
        { key: '3', icon: <SettingOutlined style={{ fontSize: '24px' }}/> },
        { key: '4', icon: <UserOutlined style={{ fontSize: '24px' }}/> },
      ].map(item => (
        <Menu.Item key={item.key} icon={item.icon} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* <Link to={item.to as string}/> */}
        </Menu.Item>
      ))}
    </Menu>
  </Sider>
);

export default MainMenu;
