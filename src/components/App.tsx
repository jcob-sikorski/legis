import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp"
import { config } from "./../config"; // Make sure the path to config is correct
import { AppProvider } from "./RealmApp";
import mixpanel from 'mixpanel-browser';
import { inject } from '@vercel/analytics';
import Dashboard from "./sites/dashboard";
import Editor from "./sites/editor";
import SiteSettings from "./sites/siteSettings";

const appId = config.appId;

inject();
mixpanel.init(config.projectId, { debug: true, track_pageview: true, persistence: 'localStorage' });

export default function App() {
  return (
    <AppProvider appId={appId}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/site-settings" element={<SiteSettings />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
