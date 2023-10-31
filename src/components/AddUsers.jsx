import React, { useState } from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill";

function AddUsers() {
  const [recipients, setRecipients] = useState([""]);
  const [amount, setAmount] = useState();
  const [time, setTime] = useState();

  const handleButtonClick = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const Signer = provider.getSigner();
    const timeInSeconds = time * 7 * 24 * 60 * 60;

    // Create an instance of the contract using its address and ABI
    const digitalWill = new ethers.Contract(
      "0xe3F165c93b3098d5Bb4205dD8eDCD50eC1D3960E",
      DigitalWill.abi,
      Signer
    );

    const tx = await digitalWill.adduser(recipients, timeInSeconds, {
      value: ethers.utils.parseEther(amount),
    });
    await tx.wait();

    alert(`Users Added Successfully Recipients: ${recipients.join(", ")}, Value: ${amount}`);
  };

  // Function to handle recipient input change
  const handleRecipientChange = (e, index) => {
    const newRecipients = [...recipients];
    newRecipients[index] = e.target.value;
    setRecipients(newRecipients);
  };

  // Function to handle amount input change
  const handleValueChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  // Function to remove the last recipient
  const handleRemoveRecipient = () => {
    const newRecipients = [...recipients];
    newRecipients.pop();
    setRecipients(newRecipients);
  };

  return (
    <div>
      <h3> Add User: </h3>
      {recipients.map((recipient, index) => (
        <div key={index}>
          <label>Recipient: </label>
          <input
            type="text"
            placeholder="Type recipient address..."
            value={recipient}
            onChange={(e) => handleRecipientChange(e, index)}
          />
        </div>
      ))}
      <br />
      <button onClick={() => setRecipients([...recipients, ""])}>Add another recipient</button>
      <button onClick={handleRemoveRecipient}>Remove last recipient</button>
      <br />
      <br />
      <label>Amount: </label>
      <input
        type="text"
        placeholder="Type value in XRP..."
        value={amount}
        onChange={handleValueChange}
      />
      <br />
      <label>Time: </label>
      <input
        type="text"
        placeholder="Type time in weeks..."
        value={time}
        onChange={handleTimeChange}
      />
      <br />
      <br />
      <button onClick={handleButtonClick}>Add User</button>
    </div>
  );
}

export default AddUsers;
