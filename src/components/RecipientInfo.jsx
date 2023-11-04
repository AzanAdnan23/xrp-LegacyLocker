import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill.json";

function RecipientInfo() {
  const [parentAddr, setUserAddr] = useState();
  const [recipientAddr, setRecipientAddr] = useState();

  useEffect(() => {
    if (window.ethereum && window.ethereum.isConnected()) {
      idk();
    }

    // Refresh the user info every 30 seconds
    const intervalId = setInterval(() => {
      if (window.ethereum && window.ethereum.isConnected()) {
        idk();
      }
    }, 30000); // Interval set to 30 seconds

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const idk = async () => {
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);

      if (accounts.length === 0) {
        console.log("No account is connected");
        return;
      }

      const digitalWill = new ethers.Contract(
        "0xe3F165c93b3098d5Bb4205dD8eDCD50eC1D3960E",
        DigitalWill.abi,
        provider
      );

      const tx1 = await digitalWill.getUserInfo(accounts[0]);

      const tx2 =await digitalWill.getRecipientBalance(accounts[0]);

      console.log("Recipient info Called! ", tx2);

   
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <div>
      <div> Recipient Address:{recipientAddr} </div>
      <div> Parent Address:{} </div>
      <div> Recipient Share: </div>
      <div> Last Action: </div>

    </div>
  );
}
export default RecipientInfo;


//  parent address recipient address, recipient share, time left , time set for withdrawal
