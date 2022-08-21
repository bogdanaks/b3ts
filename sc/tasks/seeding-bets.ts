import { task } from "hardhat/config"

import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"

interface IArgs {
  contract: string
}

task("seeding-bets", "Seeding bets")
  .addParam("contract", "Contract address")
  .setAction(async (args: IArgs, hre) => {
    const Bets = await hre.ethers.getContractAt("Bets", args.contract)
    const matchesIds = [...Array(10).keys()]
    const betsIds = [...Array(10).keys()]
    const markets = ["WIN_1", "WIN_2"]

    for (const matchId of matchesIds) {
      for (const betId of betsIds) {
        const txBet = await Bets.addBet(
          matchId,
          markets[Math.round(Math.random())],
          {
            value: ethers.utils.parseEther("0.1"),
          }
        )
        await txBet.wait()
      }
    }

    console.log("Successfully seeding bets")
  })

export {}
