import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Waitlist from "./Waitlist"; // Ensure the path to Waitlist is correct
import SignUp from "./SignUp"
import { config } from "./../config"; // Make sure the path to config is correct
import { AppProvider } from "./RealmApp";
import mixpanel from 'mixpanel-browser';
import { inject } from '@vercel/analytics';

const appId = config.appId;

inject();
mixpanel.init(config.projectId, { debug: true, track_pageview: true, persistence: 'localStorage' });

export default function App() {
  return (
    <AppProvider appId={appId}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Waitlist />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
