import { useState } from "react";
import { useApp } from "../../RealmApp";
import * as Realm from "realm-web";
import { message } from "antd";
import "./index.css";

import { Button, Form, Input, Typography } from "antd";

import { MailOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function LogIn() {

  const app: any = useApp();
  const [email, setEmail] = useState("");

  const handleLogIn = async () => {
    if (
      email &&
      email.length < 80
    ) {
      try {
        // Log in the email/password user
        await app.logIn(Realm.Credentials.emailPassword(email, "123456"));
      } catch (error) {
        // if login is not successful, show the user an error message
        message.error("Login failed.");
      }
    }
  };

  return (
    <section>
      <div>
        <div>
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
          <Text>
            Enter your LinkedIn URL  and get a beautiful website in seconds
          </Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
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
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              className="bg-blue-500"
              block={true}
              type="primary"
              htmlType="submit"
              onClick={handleLogIn}
            >
              Get Started
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
