import React, { useEffect, useState } from "react";
import { useApp } from "./RealmApp";
import mixpanel from 'mixpanel-browser';
import * as Realm from "realm-web";
import "./Waitlist.css";
import "./Common.css";

export default function Waitlist() {
  const app = useApp();
  const [email, setEmail] = useState("");

  async function loginAnonymous() {
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
  }

  useEffect(() => {
    loginAnonymous();
  }, []);

  const handleEmailSubmission = async () => {
    if (email && email.length < 80) {
      await app.currentUser.functions.submitEmail(email);

      mixpanel.identify(email);

      setTimeout(() => {
        setEmail("");
      }, 200);
    }
  };

  return (
    <div className="screen">
      <h1 className="title">UNFOLLOW</h1>
      <p className="subtitle">The fastest way to unfollow people on Twitter</p>
      <p className="subtitle">Join our waitlist 👀</p>
      <div className="emailContainer">
        <input
          type="email"
          className="emailInput"
          placeholder="Your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="submitButton" onClick={handleEmailSubmission}>
          Submit
        </button>
      </div>
    </div>
  );
}
