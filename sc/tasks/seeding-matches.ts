import { task } from "hardhat/config"

import "@nomiclabs/hardhat-ethers"

interface IArgs {
  contract: string
}

task("seeding-matches", "Seeding matches")
  .addParam("contract", "Contract address")
  .setAction(async (args: IArgs, hre) => {
    const Bets = await hre.ethers.getContractAt("Bets", args.contract)
    const matchesIds = [...Array(10).keys()]

    for (const matchId of matchesIds) {
      const txMatch = await Bets.createMatch(matchId, [["WIN_1", "WIN_2"]])
      await txMatch.wait()
    }

    console.log("Successfully seeding matches")
  })

export {}
