import React from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill";

function PingContract() {
  const handleButtonClick = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    const Signer = provider.getSigner();

    const digitalWill = new ethers.Contract(
      "0xbBdE203FB84d3822460634f52906C091a7cD608A",
      DigitalWill.abi,
      Signer
    );

    const tx = await digitalWill.ping();
    await tx.wait();
    console.log(" pinged sucessfull: ", tx);

    alert(" pinged sucessfull..");
  };

  return (
    <div className="px-8 ">
      <h3 className="text-lg font-bold mt-8"> Ping Contract: </h3>

      <p className=""> This button will notify the contract and reset the timer, indicating that you are still active. </p>

      <div className="mt-4 font-bold text-center px-4 w-40 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">
      <button onClick={handleButtonClick}> Ping Contract </button>
      </div>
    
    </div>
  );
}

export default PingContract;
