import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../RealmApp";
import * as Realm from "realm-web";
import axios from "axios";
import { config } from "../../../config";
import { message } from 'antd';
import "./index.css";
// import { config } from "../../../config";
// import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const app: any = useApp();

  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (email && email.length < 80 && password && password.length >= 6 && password.length <= 100) {
      try {
        // Register new email/password user
        await app.emailPasswordAuth.registerUser({email, password});
  
        // Log in the email/password user
        await app.logIn(Realm.Credentials.emailPassword(email, password));

        navigate(`/${email}`);

        const data = {
          email: email,
          eventName: "welcomeUser"
        };
        
        const tsx = {
          method: 'post',
          url: 'https://legis-cors-anywhere-xmo76.ondigitalocean.app/https://app.loops.so/api/v1/events/send',
          headers: { 
            Authorization: `Bearer ${config.loopsKey}`
          },
          data : data
        };
        
        const response = await axios(tsx);

        console.log("LOOPS RESPONSE: ", (response));
        
        setTimeout(() => {
          setEmail("");
          setPassword("");
        }, 180);
      } catch (error) {
        // if registration or login is not successful, show the user an error message
        message.error('Sign up failed. Please check your email and password.');
      }
    }
  };
  

  return (
    <div className="screen">
      <h1 className="title">Legis</h1>
      <p className="subtitle">The fastest way to show your website to the planet.</p>
      <div className="signupContainer">
        <input
          type="email"
          className="signup-input"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="signup-input"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submitButton" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}