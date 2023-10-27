// NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import WalletCard from "../components/WalletCard";

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  listStyle: "none",
  padding: "10px",
  backgroundColor: "#333",
};

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
};

const NavBar = ({ onConnect }) => (
  <nav>
    <ul style={navStyle}>
      <li>
        <Link to="/" style={linkStyle}>Home</Link>
      </li>
      <li>
        <Link to="/userdashboard" style={linkStyle}>User Dashboard</Link>
      </li>
      <li>
        <Link to="/recipient" style={linkStyle}>Recipient</Link>
      </li>
      <li>
        <WalletCard onConnect={onConnect} />
      </li>
    </ul>
  </nav>
);

export default NavBar;
