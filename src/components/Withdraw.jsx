import React, { useState } from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill";

function Withdraw() {
  const [parentAddress, setParentAddress] = useState();

  const handleButtonClick = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    const Signer = provider.getSigner();

    const digitalWill = new ethers.Contract(
      "0x5E52b19D74E513B936236120c963c37d6C85C0f6",
      DigitalWill.abi,
      Signer
    );

    const tx = await digitalWill.withdraw(parentAddress);
    await tx.wait();
    
    console.log(" withdrawal sucessfully: ", tx);

    alert(" withdrawal sucessfully..");
  };

  const handleParentChange = (e) => {
    setParentAddress(e.target.value);
  };
  return (
    <>
      <h3> Withdraw payment: </h3>
      <label>
        {" "}
        you need to enter parent address for verification purpouses...
      </label>
      <label>Parent Address: </label>
      <input
        type="text"
        placeholder="Type Parent address..."
        value={parentAddress}
        onChange={handleParentChange}
      />

      <button onClick={handleButtonClick}>Add User</button>
    </>
  );
}
export default Withdraw;
