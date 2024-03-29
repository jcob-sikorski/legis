import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useApp } from "../../RealmApp";

const { Sider } = Layout;

const MainMenu = ({ width = 100 }: { width?: number }) => {
  const app: any = useApp();

  function signOut() {
    app.logOut();
  }

  return (
    <Sider width={width}>
      <Menu
        defaultSelectedKeys={["1"]}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          paddingLeft: 4,
        }}
      >
        {[
          {
            key: "1",
            icon: <AppstoreOutlined style={{ fontSize: "24px" }} />,
            to: "/dashboard",
          },
          // { key: '2', icon: <BarChartOutlined style={{ fontSize: '24px' }}/> },
          // { key: '3', icon: <SettingOutlined style={{ fontSize: '24px' }}/> },
          {
            key: "4",
            icon: <PoweroffOutlined style={{ fontSize: "24px" }} />,
            onClick: signOut,
            to: "/logIn",
          },
        ].map((item) => (
          <Menu.Item
            onClick={item?.onClick ? () => item.onClick() : () => {}}
            key={item.key}
            icon={item.icon}
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: "25%",
            }}
          >
            <Link to={item.to as string} />
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default MainMenu;
