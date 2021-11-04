import { ethers } from "hardhat";

async function main() {
  const GameItems = await ethers.getContractFactory("GameItems");
  const gameItems = await GameItems.deploy();

  await gameItems.deployed();

  console.log("GameItems deployed to:", gameItems.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
