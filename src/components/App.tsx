import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import { config } from "./../config";
import { AppProvider } from "./RealmApp";
import * as Realm from "realm-web";
import mixpanel from 'mixpanel-browser';
import { inject } from '@vercel/analytics';
import Dashboard from "./sites/dashboard";
import Editor from "./sites/editor";
import Survey from "./sites/Survey";
import ColorPallette from "./sites/colorPallette";
import { useState, useEffect } from "react";
import Html from "./sites/html";
import Generate from "./sites/generate";
import Overview from "./sites/siteSettings/Overview";
import Site from "./sites/siteSettings/Site";
import Media from "./sites/siteSettings/Media";

const appId = config.appId;

inject();
mixpanel.init(config.projectId, { debug: true, track_pageview: true, persistence: 'localStorage' });

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const email = "joe@gmail.com";
    const password = "123456";

    const app = new Realm.App({ id: config.appId });

    const credentials = Realm.Credentials.emailPassword(email, password);
    app.logIn(credentials)
      .then(user => {
        console.log("User logged in successfully.");
        setUser(user);
      })
      .catch(error => {
        console.error("Error logging in the user:", error);
      });
  }, []);

  return (
    <AppProvider appId={appId} user={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:site_id" element={<Editor />} />
          <Route path="/survey/:site_id" element={<Survey />} />
          <Route path="/color-palette/:site_id" element={<ColorPallette />} />
          <Route path="/generate/:site_id" element={<Generate />} />
          <Route path="/html" element={<Html />} />
          <Route path="/overview-settings" Component={Overview} />
          <Route path="/site-settings" Component={Site} />
          <Route path="/media-settings" Component={Media} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
