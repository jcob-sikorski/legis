import React, { useEffect, useState } from "react";
import { AppProvider, useApp } from "./RealmApp";
import * as Realm from "realm-web";
import { config } from "./../config";
import "./App.css";

const appId = config.appId;

export default function ProvidedApp() {

  return (
    <AppProvider appId={appId}>
      <App />
    </AppProvider>
  );
}

function App() {
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

      setTimeout(() => {
        setEmail("");
      }, 200);
    }
  };

  return (
    <div className="StartScreen">
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
