// sample testing code

async function main() {
  const DContract = await ethers.getContractFactory("DigitalWill");

  const dContract = DContract.attach(
    "0xE899A0F80Efdb05ebD015E9312085BDD318D4086"
  );

  // let amount = ethers.utils.parseEther('5');
  // let tx1= await dContract.adduser("0x55f2c051d8136E44942205f0b0045c1824eEa6B0", {value: amount});
  //console.log(tx1);

  //  let tx2 = await dContract.revertToOwner();
  //  console.log("Transection Hash",tx2.hash);

  const tx = await dContract.getRecipientBalance(
    "0x83bac192f2fa774962a538D2ee300695f84eea6f"
  );

  console.log(ethers.utils.formatEther(tx));

  console.log(typeof tx);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
