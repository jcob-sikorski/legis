import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./sites/logIn";
import SignUp from "./sites/signUp";
import { config } from "./../config";
import { AppProvider, useApp } from "./RealmApp";
import Dashboard from "./sites/dashboard";
import Editor from "./sites/editor";
import Survey from "./sites/Survey";
import ColorPalette from "./sites/colorPalette";
import Html from "./sites/html";
import Generate from "./sites/generate";
import CustomDomainDeployment from "./sites/customDomainDeployment";
import Settings from "./sites/settings";
import Playground from "./sites/playground";
import FromTemplate from "./sites/fromTemplate";
import Preview from "./sites/preview";
import Skeletons from "./sites/skeletons";
import Showcase from "./sites/showcase";

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const app: any = useApp();

  if (!app.currentUser) {
    return <LogIn />;
  }
  return children;
};

function App() {
  return (
    <AppProvider appId={config.appId}>
      <BrowserRouter>
        <Routes>
          {/* DEV */}
          <Route path="/html" element={<Html />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/skeletons" element={<Skeletons />} />

          {/* DON'T DELETE  */}
          <Route path="/preview-iframe" element={<></>} />

          <Route
            path="/from-template/:template_set_id"
            element={<FromTemplate />}
          />

          <Route
            path="/:email?"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/showcase/:site_id"
            element={
              <RequireAuth>
                <Showcase />
              </RequireAuth>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/preview/:site_id"
            element={
              <RequireAuth>
                <Preview />
              </RequireAuth>
            }
          />
          <Route
            path="/editor/:site_id"
            element={
              <RequireAuth>
                <Editor />
              </RequireAuth>
            }
          />
          <Route
            path="/survey/:site_id"
            element={
              <RequireAuth>
                <Survey />
              </RequireAuth>
            }
          />
          <Route
            path="/color-palette/:site_id"
            element={
              <RequireAuth>
                <ColorPalette />
              </RequireAuth>
            }
          />
          <Route
            path="/generate/:site_id/:onboarding"
            element={
              <RequireAuth>
                <Generate />
              </RequireAuth>
            }
          />
          <Route
            path="/html"
            element={
              <RequireAuth>
                <Html />
              </RequireAuth>
            }
          />
          <Route
            path="/custom-domain-deployment/:site_id"
            element={
              <RequireAuth>
                <CustomDomainDeployment />
              </RequireAuth>
            }
          />
          <Route
            path="/settings/:site_id"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
