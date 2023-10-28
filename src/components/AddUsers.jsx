import React, { useState } from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill";

function AddUsers() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState();
  const [time, setTime] = useState();

  const handleButtonClick = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    const accounts = await provider.send("eth_requestAccounts", []);

    const Signer = provider.getSigner();

    const timeInSeconds = time * 7 * 24 * 60 * 60;
    console.log(timeInSeconds);

    // Create an instance of the contract using its address and ABI
    const digitalWill = new ethers.Contract(
      "0xDd3330863ecEa52a146f001f6330F2EA24931173",
      DigitalWill.abi,
      Signer
    );
    const tx = await digitalWill.adduser(recipient, timeInSeconds, {
      value: ethers.utils.parseEther(amount),
    });
    await tx.wait();

    alert(`Recipient: ${recipient}, Value: ${amount}`);
  };

  // Function to handle recipient input change
  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  // Function to handle amount input change
  const handleValueChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <div>
      <h3> Add User: </h3>
      <label>Recipient: </label>
      <input
        type="text"
        placeholder="Type recipient address..."
        value={recipient}
        onChange={handleRecipientChange}
      />
      <label>Amount: </label>
      <input
        type="text"
        placeholder="Type value in XRP..."
        value={amount}
        onChange={handleValueChange}
      />
      <label>Time: </label>
      <input
        type="text"
        placeholder="Type time in weeks..."
        value={time}
        onChange={handleTimeChange}
      />
      <button onClick={handleButtonClick}>Add User</button>
    </div>
  );
}

export default AddUsers;
