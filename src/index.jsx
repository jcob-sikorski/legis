import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";


const root = createRoot(document.getElementById("root")); //  lets you create a root to display React components inside a browser DOM node.

root.render( // display a piece of JSX (“React node”) into the React root’s browser DOM node.
  <React.StrictMode> { /* // lets you find common bugs in your components early during development */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
