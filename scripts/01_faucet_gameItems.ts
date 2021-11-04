import assert from "assert";
import { ethers } from "hardhat";
// import GameItemsArtifact from "../artifacts/contracts/GameItems.sol/GameItems.json";

const CONTRACT_ADDRESS = process.env.GAME_ITEMS_ADDRESS;

async function main() {
  assert(CONTRACT_ADDRESS);

  const [admin, bob, cathy] = await ethers.getSigners();
  const gameItems = await ethers.getContractAt("GameItems", CONTRACT_ADDRESS);

  const itemId = 0;
  await gameItems.connect(bob).faucet(itemId, 100);

  const [ABalance, BBalance, CBalance] = await gameItems.balanceOfBatch(
    [admin.address, bob.address, cathy.address],
    [itemId, itemId, itemId]
  );

  console.log("admin", ABalance.toString());
  console.log("bob", BBalance.toString());
  console.log("cathy", CBalance.toString());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
