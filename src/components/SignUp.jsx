import React, { useEffect, useState } from "react";
import { useApp } from "./RealmApp";
import mixpanel from 'mixpanel-browser';
import * as Realm from "realm-web";
import "./SignUp.css";
import "./Common.css";

export default function SignUp() {
  const app = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterUser = async () => {
    if (email && email.length < 80 && password && password.length >= 6 && password.length <= 100) {
      // Register new email/password user
      await app.emailPasswordAuth.registerUser({email, password});
      // Log in the email/password user
      await app.logIn(Realm.Credentials.emailPassword(email, password));

      mixpanel.identify(email);

      mixpanel.track('Sign Up', {
        'Signup Type': 'Signup page'
      })

      setTimeout(() => {
        setEmail("");
      }, 180);
    }
  };

  return (
    <div className="screen">
      <h1 className="title">UNFOLLOW</h1>
      <p className="subtitle">The fastest way to unfollow people on X.</p>
      <p className="subtitle">Join our waitlist. 👀</p>
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
        <button className="submitButton" onClick={handleRegisterUser}>
          Submit
        </button>
      </div>
    </div>
  );
}