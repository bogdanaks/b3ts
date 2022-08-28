import { task } from "hardhat/config"

import "@nomiclabs/hardhat-ethers"

interface IArgs {
  contract: string
  matchid: string
  marketslist: string[][]
}

task("create-match", "Create match")
  .addParam("contract", "Contract address")
  .addParam("marketslist", "Markets List")
  .setAction(async (args: IArgs, hre) => {
    const Bets = await hre.ethers.getContractAt("Bets", args.contract)

    const tx = await Bets.createMatch(args.marketslist, Date.now())
    await tx.wait()

    console.log(`Successfully create match by id - ${tx}`)
  })

export {}
