// NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import WalletCard from "../components/WalletCard";
import logo from '/src/assets/logo.png'; 

const NavBar = ({ onConnect }) => (
  <nav className="bg-black text-white p-6  font-semibold font-sans">
    <ul className="flex space-x-4 justify-between items-center">
      <li>
        <Link to="/">
          <img src={logo} alt="Home" className="h-10 w-auto"/> 
        </Link>
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
