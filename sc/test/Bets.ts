import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { ethers } from "hardhat"
import { expect } from "chai"
import { Bets } from "../typechain-types"

describe("Bets", function () {
  async function deploy() {
    const [owner, otherAccount, otherAccount2] = await ethers.getSigners()

    const Bets = await ethers.getContractFactory("Bets")
    const bets = await Bets.deploy(2.5 * 100, otherAccount2.getAddress())

    return { bets, owner, otherAccount, otherAccount2 }
  }

  async function createMatch(bets: Bets) {
    const tx = await bets.createMatch(
      [
        ["TEAM_1", "TEAM_2"],
        ["TOTAL_LS_10", "TOTAL_GR_10"],
      ],
      Date.now()
    )
    await tx.wait()
  }

  describe("Deployment", function () {
    it("Im an owner", async function () {
      const { bets, owner } = await loadFixture(deploy)

      expect(await bets.owner()).to.equal(owner.address)
    })
  })

  describe("Matches", function () {
    it("Create match", async function () {
      const { bets } = await loadFixture(deploy)
      await createMatch(bets)
      expect(await bets.matchId()).to.equal(1)
    })

    it("Update match", async function () {
      const { bets } = await loadFixture(deploy)
      await createMatch(bets)
      expect(await bets.matchId()).to.equal(1)
      await bets.updateMatch(1, 2, ["TEAM_1"], Date.now())
      const match = await bets.getMatchesByIds([1])
      // console.log("updated match", match)
    })

    it("Get matches", async function () {
      const { bets } = await loadFixture(deploy)
      await createMatch(bets)
      await createMatch(bets)
      const matches = await bets.getMatchesByIds([1, 2])
      expect(matches.length).to.equal(2)
      expect(matches[0].id.toNumber()).to.equal(1)
      expect(matches[1].id.toNumber()).to.equal(2)
    })

    it("Get my matches", async function () {
      const { bets } = await loadFixture(deploy)
      await createMatch(bets)
      await bets.addBet(1, "TEAM_1")
      await bets.addBet(1, "TEAM_1")
      const myMatches = await bets.getMyMatches(10, 0)
      expect(myMatches.length).to.equal(1)
      expect(myMatches[0].id.toNumber()).to.equal(1)
    })
  })

  describe("Bets", function () {
    it("Add bet", async function () {
      const { bets } = await loadFixture(deploy)
      await createMatch(bets)
      await bets.addBet(1, "TEAM_1")
      const match = await bets.getMatchesByIds([1])
      // console.log("match", match)
    })

    it("Get bets by match id", async function () {
      const { bets } = await loadFixture(deploy)
      await createMatch(bets)
      await bets.addBet(1, "TEAM_1", {
        value: ethers.utils.parseEther("15"),
      })
      const betsById = await bets.getBetsByMatchId(1)
      // console.log("betsById", betsById)
    })
  })

  // describe("Withdraws", function () {
  //   it("Withdraw my bets", async function () {
  //     const { bets, owner, otherAccount, otherAccount2 } = await loadFixture(
  //       deploy
  //     )
  //     await createMatch(bets)

  //     await bets.addBet(1, "TEAM_1", {
  //       value: ethers.utils.parseEther("20"),
  //     })
  //     await bets.addBet(1, "TEAM_1", {
  //       value: ethers.utils.parseEther("20"),
  //     })
  //     await bets.addBet(1, "TEAM_2", {
  //       value: ethers.utils.parseEther("10"),
  //     })

  //     await bets.connect(otherAccount).addBet(1, "TEAM_1", {
  //       value: ethers.utils.parseEther("40"),
  //     })
  //     await bets.connect(otherAccount).addBet(1, "TEAM_2", {
  //       value: ethers.utils.parseEther("10"),
  //     })

  //     await bets.updateMatch(1, 2, ["TEAM_1"], Date.now())
  //     const balancePiggyBankBefore = await otherAccount2.getBalance()
  //     await bets.withdrawByMatchId(1)
  //     const balancePiggyBankAfter = await otherAccount2.getBalance()
  //     expect(balancePiggyBankAfter).to.equal(
  //       balancePiggyBankBefore.add(ethers.utils.parseEther("1.25"))
  //     )
  //   })
  // })
})
