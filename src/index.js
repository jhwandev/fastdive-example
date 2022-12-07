import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//router
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const root = ReactDOM.render(<Router />, document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
