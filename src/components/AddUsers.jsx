import React, { useState } from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill";

function AddUsers() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState();
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();

  const handleButtonClick = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);

    const Signer = provider.getSigner();
    setSigner(Signer);

    // Create an instance of the contract using its address and ABI
    const digitalWill = new ethers.Contract(
      "0x5E52b19D74E513B936236120c963c37d6C85C0f6",
      DigitalWill.abi,
      Signer
    );
    const tx = await digitalWill.adduser(recipient, { value:  ethers.utils.parseEther(amount) });
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
      <button onClick={handleButtonClick}>Add User</button>
    </div>
  );
}

export default AddUsers;
