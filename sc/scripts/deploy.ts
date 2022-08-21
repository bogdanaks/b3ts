import { ethers } from "hardhat"

async function main() {
  const Bets = await ethers.getContractFactory("Bets")
  const bets = await Bets.deploy(
    100,
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  )

  await bets.deployed()

  console.log("Bets deployed to:", bets.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
