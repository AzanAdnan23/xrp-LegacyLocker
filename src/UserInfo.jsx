import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import DigitalWill from "./artifacts/contracts/DigitalWill.sol/DigitalWill.json";

function Userinfo() {
  const [userBalance, setUserBalance] = useState();
  const [userAddress, setUserAddress] = useState();
  const [recipient, setRecipient] = useState();
  const [lastAction, setLastAction] = useState();

  useEffect(() => {
    idk();
  }, []);

  const idk = async () => {
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);

      const digitalWill = new ethers.Contract(
        "0x5E52b19D74E513B936236120c963c37d6C85C0f6",
        DigitalWill.abi,
        provider
      );

      const tx = await digitalWill.getUserInfo(accounts[0]);

      console.log("User info:", tx);

      setUserAddress(tx[0].toString());
      setRecipient(tx[1].toString());
      setLastAction(tx[2].toString());
      setUserBalance(tx[3].toString());
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <div>
      <div> User Address: {userAddress}</div>
      <div>User Balance: {userBalance}</div>
      <div> recipient Address : {recipient}</div>
      <div> lastAction:{lastAction}</div>
    </div>
  );
}

export default Userinfo;
