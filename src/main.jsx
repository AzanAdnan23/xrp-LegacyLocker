import React from "react";
import ReactDOM from "react-dom/client";
import UserDashboard from "./pages/UserDashboard";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (!window.ethereum) {
  root.render(
    <React.StrictMode>
      You need to install a browser wallet to build the dapp
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <UserDashboard />
    </React.StrictMode>
  );
}
