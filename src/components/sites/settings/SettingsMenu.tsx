import { Layout, Menu, Typography } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { Title } = Typography;

const SettingsMenu = ({
  defaultSelectedKey,
}: {
  defaultSelectedKey: string;
}) => (
  <Sider>
    <Menu
      defaultSelectedKeys={[defaultSelectedKey]}
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {[
        { key: "1", label: "Overview", to: "overview" },
      ].map((item) => (
        <Menu.Item key={item.key}>
          <Link to={item.to as string}>{item.label}</Link> 
        </Menu.Item>
      ))}
    </Menu>
  </Sider>
);

export default SettingsMenu;
