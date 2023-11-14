import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../RealmApp";
import * as Realm from "realm-web";
import { message } from 'antd';
import "./index.css";

export default function LogIn() {
  const app: any = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogIn = async () => {
    // app.logOut();
    if (email && email.length < 80 && password && password.length >= 6 && password.length <= 100) {
      try {
        // Log in the email/password user
        await app.logIn(Realm.Credentials.emailPassword(email, password));
        // if login is successful, clear the input fields
        setEmail("");
        setPassword("");
      } catch (error) {
        // if login is not successful, show the user an error message
        message.error('Login failed. Please check your email and password.');
      }
    }
  };

  const handleSignUp = async () => {
    navigate('/signup');
  };

  return (
    <div className="screen">
      <h1 className="title">Legis</h1>
      <p className="subtitle">The fastest way to show your website to the planet.</p>
      <div className="loginContainer">
        <input
          type="email"
          className="login-input"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submitButton" onClick={handleLogIn}>
          Log in
        </button>
        <button onClick={handleSignUp}>
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
}