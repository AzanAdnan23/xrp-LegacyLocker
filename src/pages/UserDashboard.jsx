// UserDashboard.jsx
import React, { useState } from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill";
import green from "/src/assets/home-green.svg";

import AddUsers from "../components/AddUsers";
import RevertPayment from "../components/RevertToOwner";
import PingContract from "../components/Ping";
import Userinfo from "../components/UserInfo";

function UserDashboard({ isWalletConnected }) {
  const [isUser, setIsUser] = useState(false);

  const checkUser = async () => {
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length === 0) {
        console.log("No account is connected");
        return;
      }

      const digitalWill = new ethers.Contract(
        "0x83bac192f2fa774962a538D2ee300695f84eea6f",
        DigitalWill.abi,
        provider
      );

      const tx = await digitalWill.isUser(accounts[0]);
      console.log("Is user: ", tx);

      if (tx == true) {
        setIsUser(true);
      }
    } catch (error) {
      console.error("Error fetching IsUser:", error);
    }
  };
  if (isWalletConnected) {
    checkUser();
  }
  return (
    <div className="px-24"
    style={{
      backgroundImage: `url(${green})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top right",
      backgroundSize: "w-1000 h-1000",
    }}>
      <p className="text-3xl text-center font-bold mt-12 mb-2">
        Legacy Manager Dashboard
      </p>
      <p className="text-1xl text-center font-bold mb-20">Ensuring the Future of Your Digital Legacy with Secure Access</p>
      {isUser && <Userinfo />}
      {!isUser && <AddUsers />}
      {isUser && <RevertPayment />}
      {isUser && <PingContract />}
      <div className="py-36"></div>
    </div>
  );
}

export default UserDashboard;
