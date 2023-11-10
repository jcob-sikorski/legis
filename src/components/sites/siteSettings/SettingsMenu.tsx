import { Layout, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { Title } = Typography;

const SettingsMenu = () => (
  <Sider>
    <Menu defaultSelectedKeys={['1']}  style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {[
        { key: '1', label: 'Overview', to: 'site-settings' },
        { key: '2', label: 'Site' },
        { key: '3', label: 'Media' },
      ].map(item => (
        <Menu.Item key={item.key}>
          <Link to={item.to as string}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  </Sider>
);

export default SettingsMenu;
