import {
  AppstoreOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

export default function Sidebar({ collapsed }: any) {
  return (
    <Sider trigger={null}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <AppstoreOutlined />,
            label: 'Sites',
          },
          {
            key: '2',
            icon: <BarChartOutlined />,
            label: 'Analytics',
          },
          {
            key: '3',
            icon: <SettingOutlined />,
            label: 'Account settings',
          }
        ]}
      />
    </Sider>
  );
}