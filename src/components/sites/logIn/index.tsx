import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../RealmApp";
import * as Realm from "realm-web";
import { message } from "antd";
import "./index.css";

import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";

import { LockOutlined, MailOutlined } from "@ant-design/icons";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function LogIn() {
  const { token } = useToken();
  const screens = useBreakpoint();

  const app: any = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogIn = async () => {
    // app.logOut();
    if (
      email &&
      email.length < 80 &&
      password &&
      password.length >= 6 &&
      password.length <= 100
    ) {
      try {
        // Log in the email/password user
        await app.logIn(Realm.Credentials.emailPassword(email, password));
        // if login is successful, clear the input fields
        setEmail("");
        setPassword("");
      } catch (error) {
        // if login is not successful, show the user an error message
        message.error("Login failed. Please check your email and password.");
      }
    }
  };

  const handleSignUp = async () => {
    navigate("/signup");
  };
  // const { token } = useToken();
  // const screens = useBreakpoint();
  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.sizeXXL}px ${token.padding}px`,
      width: "380px",
    },
    footer: {
      marginTop: 20,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section
      className="text-white"
      style={{ ...styles.section, overflowX: "hidden" }}
    >
      <div style={styles.container}>
        <div style={{ ...styles.header }}>
          <div
            className="bg-blue-600 bg-gradient-to-r from-green-500 via-blue-600 to-purple-500"
            style={{
              width: "200vw",
              height: 5,
              transform: "translateX(-50%) translateY(35px)",
              zIndex: -1,
            }}
          />
          <div
            className="text-blue-600"
            style={{
              textAlign: "center",
              fontSize: 40,
              fontWeight: 700,
              marginBottom: 66,
              fontFamily: "Poppins",
              zIndex: 10,
              background: "#fff",
              transform: "translateX(0px) translateY(0px)",
              width: "130px",
              marginInline: "auto",
            }}
          >
            <a href="https://www.legis.live/">Legis</a>
          </div>
          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>
            The fastest way to show your website to the planet.
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<MailOutlined />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          {/* <Form.Item> */}
          {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
          {/* <a style={styles.forgotPassword} href="">
              Forgot password?
            </a> */}
          {/* </Form.Item> */}
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              className="bg-blue-500"
              block={true}
              type="primary"
              htmlType="submit"
              onClick={handleLogIn}
            >
              Log in
            </Button>
            <div
              style={{
                marginTop: 20,
                textAlign: "center",
                width: "100%",
              }}
            >
              <Text style={styles.text}>Don't have an account?</Text>{" "}
              <Link href="">Sign up now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
    // <div className="screen">
    //   <h1 className="title">Legis</h1>
    //   <p className="subtitle">
    //     The fastest way to show your website to the planet.
    //   </p>
    //   <div className="loginContainer">
    //     <input
    //       type="email"
    //       className="login-input"
    //       placeholder="Your email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       className="login-input"
    //       placeholder="Your password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <button className="submitButton" onClick={handleLogIn}>
    //       Log in
    //     </button>
    //     <button onClick={handleSignUp}>Don't have an account? Sign Up</button>
    //   </div>
    // </div>
  );
}
