import React from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill";

function PingContract() {
  const handleButtonClick = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    const Signer = provider.getSigner();

    const digitalWill = new ethers.Contract(
      "0xDd3330863ecEa52a146f001f6330F2EA24931173",
      DigitalWill.abi,
      Signer
    );

    const tx = await digitalWill.ping();
    await tx.wait();
    console.log(" pinged sucessfull: ", tx);

    alert(" pinged sucessfull..");
  };

  return (
    <div>
      <h3> Ping Contract: </h3>
      <label> click the button and sign from ur connected wallet: </label>
      <button onClick={handleButtonClick}> Ping </button>
      <p>
      this button will ping the contract and will tell that u are alive. reset the timer.
      </p>
    </div>
  );
}

export default PingContract;
