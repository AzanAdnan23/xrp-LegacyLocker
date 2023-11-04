import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <div className="bg-black text-white">
     <App />
  </div>
 
);
