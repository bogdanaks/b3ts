import { task } from "hardhat/config"

import "@nomiclabs/hardhat-ethers"

interface IArgs {
  contract: string
}

task("seeding", "Seeding data")
  .addParam("contract", "Contract address")
  .setAction(async (args: IArgs, hre) => {
    console.log("Start seeding data: ", new Date())
    const Bets = await hre.ethers.getContractAt("Bets", args.contract)
    const matchesIds = [...Array(100).keys()]
    const betsIds = [...Array(100).keys()]
    const markets = ["TEAM_1", "TEAM_2"]

    for (const matchId of matchesIds) {
      const txMatch = await Bets.createMatch(matchId, [["TEAM_1", "TEAM_2"]])
      await txMatch.wait()
      for (const betId of betsIds) {
        const txBet = await Bets.addBet(
          matchId,
          markets[Math.round(Math.random())],
          {
            value: hre.ethers.utils.parseEther("0.1"),
          }
        )
        await txBet.wait()
      }
    }

    console.log("Finish seeding data: ", new Date())
  })

export {}
