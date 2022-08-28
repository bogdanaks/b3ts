import { ethers } from "ethers"
import React, { useEffect, useState } from "react"
import { useSigner, useClient, useProvider } from "wagmi"
import Big from "big.js"

import contractABI from "shared/assets/contract.abi.json"
import { config } from "shared/config"
import { Bets } from "app/Bets"

export const useMyContract = () => {
  const client = useClient()
  const { data: signer, status } = useSigner()
  const provider = useProvider()
  const [contract, setContract] = useState<Bets>()
  const [contractState, setContractState] = useState<
    "idle" | "connecting" | "connected" | "error"
  >("idle")

  useEffect(() => {
    if (contract) return
    if (!signer) return
    if (client.status !== "connected") return
    setContractState("connecting")
    try {
      const connectContract: Bets = new ethers.Contract(
        config.contractAddress,
        contractABI,
        signer
      ) as Bets
      setContract(connectContract)
      setContractState("connected")
    } catch (error) {
      setContractState("error")
    }
  }, [client, signer])

  const getMatchesByIds = async (
    ids: number[]
  ): Promise<Bets.MatchStructOutput[]> => {
    if (!contract) return []
    const matches = await contract.getMatchesByIds(ids)
    return matches.filter((item) => item.startAt.toNumber() > 0)
  }

  const getMyMatches = async ({
    limit = 10,
    offset = 0,
  }: {
    limit: number
    offset: number
  }): Promise<Bets.MatchStructOutput[]> => {
    if (!contract) return []
    const matches = await contract.getMyMatches(limit, offset)
    return matches.filter((item) => item.startAt.toNumber() > 0)
  }

  const getMatchesLength = async (): Promise<number | undefined> => {
    if (!contract) return
    const matchesLength = await contract.matchId()

    return matchesLength.toNumber()
  }

  const createMatch = async (
    markets: string[][],
    startAt: number
  ): Promise<ethers.ContractTransaction | undefined> => {
    if (!contract) return
    console.log("Creating match")
    return await contract.createMatch(markets, startAt)
  }

  const getBetsByMatchId = async (
    matchId: number
  ): Promise<Bets.BetStructOutput[] | undefined> => {
    if (!contract) return
    return await contract.getBetsByMatchId(matchId)
  }

  const addBet = async (
    id: number,
    market: string,
    amount: string
  ): Promise<any | undefined> => {
    if (!contract) return
    return await contract.addBet(id, market, {
      value: ethers.utils.parseEther(amount),
    })
  }

  const subscribeEvent = (
    eventName: ContractEvents,
    cb: (...args: any[]) => void
  ) => {
    if (!contract) return

    switch (eventName) {
      case "AddBet":
        provider.once("block", () => {
          contract.on(
            eventName,
            (
              id: Big,
              matchId: Big,
              amount: Big,
              market: string,
              user: string
            ) => {
              cb({ id, matchId, amount, market, user })
            }
          )
        })
        break
      case "CreateMatch":
        provider.once("block", () => {
          contract.on(eventName, (id: Big, marketsList: string[][]) => {
            cb({ id, marketsList })
          })
        })
        break
      case "UpdateMatch":
        provider.once("block", () => {
          contract.on(
            eventName,
            (id: Big, status: number, wonMarkets: string[]) => {
              cb({ id, status, wonMarkets })
            }
          )
        })
        break

      default:
        break
    }
  }

  return {
    contract,
    status,
    getMatchesByIds,
    getMyMatches,
    getMatchesLength,
    createMatch,
    addBet,
    getBetsByMatchId,
    subscribeEvent,
    contractState,
  }
}
