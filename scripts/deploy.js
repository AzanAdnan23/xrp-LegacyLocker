async function main() {
  const token = await ethers.deployContract("Switch");

  console.log("Faucet address:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
