import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./sites/logIn";
import { config } from "./../config";
import { AppProvider, useApp } from "./RealmApp";
import Editor from "./sites/editor";
import Generate from "./sites/generate";

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
          <Route
            path="/"
            element={
              <RequireAuth>
                <Generate />
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
            path="/editor/:site_id"
            element={
              <RequireAuth>
                <Editor />
              </RequireAuth>
            }
          />

          <Route path="/preview-iframe" element={<></>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
