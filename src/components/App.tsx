import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import { config } from "./../config";
import { AppProvider } from "./RealmApp";
import * as Realm from "realm-web";
// import mixpanel from 'mixpanel-browser';
// import { inject } from '@vercel/analytics';
import Dashboard from "./sites/dashboard";
import Editor from "./sites/editor";
import Survey from "./sites/Survey";
import ColorPalette from "./sites/colorPalette";
import { useState, useEffect } from "react";
import Html from "./sites/html";
import Generate from "./sites/generate";
import Overview from "./sites/siteSettings/Overview";
import Site from "./sites/siteSettings/Site";
import Media from "./sites/siteSettings/Media";


const RequireAuth: React.FC<{ children: React.ReactElement, user: any }> = ({ children, user }) => {
    if (!user) {
       return <SignUp />;
    }
    return children;
};

function App() {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    // const email = "joe@gmail.com";
    // const password = "123456";
    const email = "";
    const password = "";

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
    <AppProvider appId={config.appId} user={user}>
      <BrowserRouter>
        <Routes>
          <Route path="/" 
            element={
              <RequireAuth user={user}>
                <Dashboard />
              </RequireAuth>
            } 
          />
          <Route path="/signup" 
            element={
              <RequireAuth user={user}>
                <SignUp />
              </RequireAuth>
            } 
          />
          <Route path="/dashboard" 
            element={
              <RequireAuth user={user}>
                <Dashboard />
              </RequireAuth>
            } 
          />
          <Route path="/editor/:site_id" 
            element={
              <RequireAuth user={user}>
                <Editor />
              </RequireAuth>
            } 
          />
          <Route path="/survey/:site_id" 
            element={
              <RequireAuth user={user}>
                <Survey />
              </RequireAuth>
            } 
          />
          <Route path="/color-palette/:site_id" 
            element={
              <RequireAuth user={user}>
                <ColorPalette />
              </RequireAuth>
            } 
          />
          <Route path="/generate/:site_id"
            element={
              <RequireAuth user={user}>
                <Generate />
              </RequireAuth>
            } 
          />
          <Route path="/html" 
            element={
              <RequireAuth user={user}>
                <Html />
              </RequireAuth>
            } 
          />
          <Route path="/overview-settings" 
            element={
              <RequireAuth user={user}>
                <Overview />
              </RequireAuth>
            } 
          />
          <Route path="/site-settings" 
            element={
              <RequireAuth user={user}>
                <Site />
              </RequireAuth>
            } 
          />
          <Route path="/media-settings" 
            element={
              <RequireAuth user={user}>
                <Media />
              </RequireAuth>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
