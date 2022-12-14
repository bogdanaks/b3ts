import { task } from "hardhat/config"

import "@nomiclabs/hardhat-ethers"

interface IArgs {
  contract: string
  sizem: number
  sizeb: number
}

task("seeding", "Seeding data")
  .addParam("contract", "Contract address")
  .addParam("sizem", "Seed size matches")
  .addParam("sizeb", "Seed size bets")
  .setAction(async (args: IArgs, hre) => {
    console.log("Start seeding data: ", new Date())
    const Bets = await hre.ethers.getContractAt("Bets", args.contract)
    const matchesIds = [...Array(args.sizem).keys()]
    const betsIds = [...Array(args.sizeb).keys()]
    const markets = ["TEAM_1", "TEAM_2"]

    for (const matchId of matchesIds) {
      const txMatch = await Bets.createMatch([["TEAM_1", "TEAM_2"]], Date.now())
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
