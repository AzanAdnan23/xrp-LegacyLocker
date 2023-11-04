// NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import WalletCard from "../components/WalletCard";

const NavBar = ({ onConnect }) => (
  <nav className="bg-black text-white p-6  font-semibold font-sans">
    <ul className="flex space-x-4 justify-between ">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/userdashboard">Legacy Dashboard</Link>
      </li>
      <li>
        <Link to="/recipient">Withdraw Funds</Link>
      </li>
      <li>
        <WalletCard onConnect={onConnect} />
      </li>
    </ul>
  </nav>
);

export default NavBar;
