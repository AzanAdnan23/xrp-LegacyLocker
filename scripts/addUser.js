// sample testing code

async function main() {
  const DContract = await ethers.getContractFactory("DigitalWill");

  const dContract = DContract.attach(
    "0xDd3330863ecEa52a146f001f6330F2EA24931173"
  );

  // let amount = ethers.utils.parseEther('5');
  // let tx1= await dContract.adduser("0x55f2c051d8136E44942205f0b0045c1824eEa6B0", {value: amount});
  //console.log(tx1);

  //  let tx2 = await dContract.revertToOwner();
  //  console.log("Transection Hash",tx2.hash);

  const tx = await dContract.getRecipientBalance(
    "0xF657E0B79c3b665Ad053866fb7634e3270F4f02F"
  );

  console.log("User info:", tx);

  console.log(typeof tx);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
