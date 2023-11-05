import React, { useState } from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill";

function Withdraw() {
  const [parentAddress, setParentAddress] = useState();
  const [recipientAddress, setRecipientAddress] = useState();
  const [recipientShare, setRecipientShare] = useState();
  const [lastAction, setLastAction] = useState();
  const [timeRemaning, setTimeRemaning] = useState();
  const [time, setTime] = useState();
  const [isRecipient, setIsRecipient] = useState(false);

  const handleVerifyButtonClick = async () => {
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

      const tx = await digitalWill.isRecipientE(parentAddress, accounts[0]);
      if (tx == true) {
        alert(" Recipient Varified.....");

        setIsRecipient(true);
        setRecipientAddress(accounts[0]);
        setParentAddress(parentAddress);

        const tx1 = await digitalWill.getUserInfo(parentAddress);
        console.log(" User details! ", tx1);

        const tx2 = await digitalWill.getRecipientBalance(accounts[0]);
        setRecipientShare(ethers.utils.formatEther(tx2));

        const secondsInAWeek = 7 * 24 * 60 * 60;

        let customTimeInWeeks = tx1[4].toNumber() / secondsInAWeek;
        setTime(customTimeInWeeks);

        let currentTimestamp = Math.floor(Date.now() / 1000);

        // Subtract the lastAction timestamp from the current timestamp and convert to weeks
        let weeksAgo = (currentTimestamp - parseInt(tx1[2])) / secondsInAWeek;

        let daysAgo = weeksAgo * 7;
        setLastAction(formatTime(daysAgo));

        // Calculate the remaining time in weeks
        let timeRemainingInWeeks = customTimeInWeeks - weeksAgo;
        let timeRemainingInDays = timeRemainingInWeeks * 7;

        setTimeRemaning(formatTime(timeRemainingInDays));
      } else {
        alert(" Recipient Not Varified.....");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleWithdrawButtonClick = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const Signer = provider.getSigner();

    const digitalWill = new ethers.Contract(
      "0x83bac192f2fa774962a538D2ee300695f84eea6f",
      DigitalWill.abi,
      Signer
    );

    const tx = await digitalWill.withdraw(parentAddress);
    await tx.wait();

    console.log(" withdrawal Successfully: ", tx);

    alert(" Withdrawal Successfully.....");
  };

  const handleParentChange = (e) => {
    setParentAddress(e.target.value);
  };

  return (
    <div className="px-8 mt-8">
      <h2 className="text-3xl text-center font-bold mt-2 ">
        Withdraw Funds Dashboard
      </h2>
      <h3 className="text-1xl text-center font-bold m-2 mb-20">
        Access your digital assets securely
      </h3>

      <h5 className="text-lg font-bold mt-8">Simple Withdrawal Process</h5>

      <p className="mt-2">
        1. Connect the wallet specified by the parent to the system. <br />
        2. Enter the parent's wallet address for verification.
      </p>

      <p className="text-lg font-bold mt-8 mb-2">
        {" "}
        Enter Parent's Wallet Address:{" "}
      </p>

      <div className=" flex gap-4">
        <input
          className="border-2 border-black text-black rounded-md  w-96"
          type="text"
          placeholder="Type Parent Address..."
          value={parentAddress}
          onChange={handleParentChange}
        />
        <div className="font-bold px-4 w-20 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">
          <button onClick={handleVerifyButtonClick}> Verify </button>
        </div>
      </div>
      {isRecipient && (
        <>
          <h2 className="text-lg font-bold mt-8"> Recipient Info: </h2>

          <div className="flex gap-4 mt-2">
            <div className="font-bold"> Recipient Address: </div>
            <div> {recipientAddress} </div>
          </div>

          <div className="flex gap-4 mt-1">
            <div className="font-bold">Parent Address:</div>
            <div>{parentAddress}</div>
          </div>

          <div className="flex gap-4 mt-1">
            <div className="font-bold">Recipient Share:</div>
            <div>{recipientShare}</div>
          </div>

          <div className="flex gap-4 mt-1">
            <div className="font-bold">Last Action:</div>
            <div>{lastAction}</div>
          </div>

          <div className="flex gap-4 mt-1">
            <div className="font-bold">Time Left:</div>
            <div>{timeRemaning}</div>
          </div>

          <div className="flex gap-4 mt-10">
            <h3 className=" font-bold"> Withdraw payment: </h3>
            <div className="font-bold px-4 w-40 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">
              <button onClick={handleWithdrawButtonClick}>
                {" "}
                Withdraw Funds{" "}
              </button>
            </div>
          </div>
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

    return timeString;
  }
}
export default Withdraw;
