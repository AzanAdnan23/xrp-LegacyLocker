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
      "0x83bac192f2fa774962a538D2ee300695f84eea6f",
      DigitalWill.abi,
      Signer
    );

    const tx = await digitalWill.adduser(recipients, timeInSeconds, {
      value: ethers.utils.parseEther(amount),
    });
    await tx.wait();

    alert(
      `Users Added Successfully Recipients: ${recipients.join(
        ", "
      )}, Value: ${amount}`
    );
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
    <div className="px-8">
         <p className="font-bold"> Connect your registered wallet to access detailed information.</p>
      <h3 className="text-lg font-bold mt-4 mb-4"> Add Recipient Address: </h3>
      {recipients.map((recipient, index) => (
        <div className=" flex gap-4 mt-2" key={index}>
          <p className=" font-bold ">Recipient: </p>
          <input
            className="border-2 border-black text-black rounded-md  w-96 h-8"
            type="text"
            placeholder="Type recipient address..."
            value={recipient}
            onChange={(e) => handleRecipientChange(e, index)}
          />
        </div>
      ))}

      <div className=" flex gap-4 mt-5">
        <div className="font-bold px-4 w-60 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">
          <button onClick={() => setRecipients([...recipients, ""])}>
            Add another recipient
          </button>
        </div>
        <div className="font-bold px-4 w-60 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">
          <button onClick={handleRemoveRecipient}>Remove last recipient</button>
        </div>
      </div>

      <div className="flex mt-8 gap-4">
        <p className="font-bold ">Amount: </p>
        <input
          className="border-2 border-black text-black rounded-md  w-60 h-8"
          type="text"
          placeholder="Type value in XRP..."
          value={amount}
          onChange={handleValueChange}
        />
      </div>

      <div className="flex mt-4 gap-4">
        <p className="font-bold">Time: </p>
        <input
          className="border-2 border-black text-black rounded-md  w-60 h-8"
          type="text"
          placeholder="Type time in weeks..."
          value={time}
          onChange={handleTimeChange}
        />
      </div>
      <div className="mt-4 font-bold px-4 w-28 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">
        <button onClick={handleButtonClick}>Add User</button>
      </div>
    </div>
  );
}

export default AddUsers;
