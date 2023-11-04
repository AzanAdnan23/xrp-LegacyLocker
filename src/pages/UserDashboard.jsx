// UserDashboard.jsx
import React, { useState } from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill";

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
        "0xbBdE203FB84d3822460634f52906C091a7cD608A",
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

  checkUser();
  return (
    <>
      <p className="text-3xl text-center font-bold mt-2">Legacy Manager Dashboard</p>
      {isUser && <Userinfo />}
      {!isUser && <AddUsers />}
      {isUser && <RevertPayment />}
      {isUser && <PingContract />}
    </>
  );
}

export default UserDashboard;
