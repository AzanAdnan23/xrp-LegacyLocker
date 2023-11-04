import React from "react";
import { ethers } from "ethers";
import DigitalWill from "../artifacts/contracts/DigitalWill.sol/DigitalWill";

function RevertPayment() {
  const handleButtonClick = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    const Signer = provider.getSigner();

    const digitalWill = new ethers.Contract(
      "0xbBdE203FB84d3822460634f52906C091a7cD608A",
      DigitalWill.abi,
      Signer
    );

    const tx = await digitalWill.revertToOwner();
    await tx.wait();
    console.log(" payment reverted: ", tx);

    alert(" payment revertedd to ur wallet..");
  };

  return (
    <div className="px-8 ">
      <h3 className="text-lg font-bold mt-8"> Revert Payment: </h3>

      <p className="my-2"> Click the button and sign the transection with your connected wallet. </p>

      <p>
        Get your funds back in the wallet from which you made the payment and
        specified the user.
        <br />
        Note: Only the designated wallet will work for this purpose.
      </p>
      <div className="mt-4  text-center font-bold px-4 w-40 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800">
        <button onClick={handleButtonClick}> Revet Payment</button>
      </div>
    </div>
  );
}

export default RevertPayment;
