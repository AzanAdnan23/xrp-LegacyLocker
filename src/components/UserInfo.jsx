import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill.json";

function Userinfo() {
  const [userBalance, setUserBalance] = useState();
  const [userAddress, setUserAddress] = useState();
  const [recipient, setRecipient] = useState();
  const [lastAction, setLastAction] = useState();
  const [time, setTime] = useState();

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
        "0xDd3330863ecEa52a146f001f6330F2EA24931173",
        DigitalWill.abi,
        provider
      );

      const tx = await digitalWill.getUserInfo(accounts[0]);

      console.log("User info Called! ", accounts[0]);

      setUserAddress(tx[0].toString());
      setRecipient(tx[1].toString());

      // Get the current timestamp in seconds
      let currentTimestamp = Math.floor(Date.now() / 1000);

      // Calculate the number of seconds in a week
      const SECONDS_IN_A_WEEK = 7 * 24 * 60 * 60;

      // Subtract the lastAction timestamp from the current timestamp and convert to weeks
      let weeksAgo = (currentTimestamp - parseInt(tx[2])) / SECONDS_IN_A_WEEK;

      // Convert weeks to days
      let daysAgo = weeksAgo * 7;

      setLastAction(formatTime(daysAgo));

      let customTimeInWeeks = tx[4].toNumber() / (7 * 24 * 60 * 60);
      setTime(customTimeInWeeks);

      setUserBalance(ethers.utils.formatEther(tx[3]));
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <div>
      {userAddress !== "0x0000000000000000000000000000000000000000" &&
        recipient !== "0x0000000000000000000000000000000000000000" && (
          <>
            <div> User Address: {userAddress}</div>
            <div> recipient Address : {recipient}</div>
            <div>User Balance: {userBalance}</div>
            <div> Time set for withdrawal: {time} week </div>
            <div> lastAction:{lastAction}</div>
          </>
        )}
    </div>
  );

  function formatTime(days) {
    // Calculate the number of whole days, hours, minutes, and seconds
    let wholeDays = Math.floor(days);
    let hours = Math.floor((days - wholeDays) * 24);
    let minutes = Math.floor(((days - wholeDays) * 24 - hours) * 60);
    let seconds = Math.floor(
      (((days - wholeDays) * 24 - hours) * 60 - minutes) * 60
    );

    // Create a string to represent the time
    let timeString = "";

    if (wholeDays > 0) {
      timeString += wholeDays + " day" + (wholeDays === 1 ? "" : "s");
    }

    if (hours > 0) {
      if (timeString !== "") {
        timeString += ", ";
      }
      timeString += hours + " hour" + (hours === 1 ? "" : "s");
    }

    if (minutes > 0) {
      if (timeString !== "") {
        timeString += ", ";
      }
      timeString += minutes + " minute" + (minutes === 1 ? "" : "s");
    }

    if (seconds > 0) {
      if (timeString !== "") {
        timeString += ", ";
      }
      timeString += seconds + " second" + (seconds === 1 ? "" : "s");
    }

    return timeString;
  }
}
export default Userinfo;
