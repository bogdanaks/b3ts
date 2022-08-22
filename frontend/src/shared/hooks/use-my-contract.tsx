import { Contract, ethers } from "ethers"
import React, { useEffect, useState } from "react"
import { useSigner, useClient, useProvider } from "wagmi"
import Big from "big.js"

import contractABI from "shared/assets/contract.abi.json"
import { config } from "shared/config"

export const useMyContract = () => {
  const client = useClient()
  const { data: signer, status } = useSigner()
  const provider = useProvider()
  const [contract, setContract] = useState<Contract | undefined>(undefined)
  const [contractState, setContractState] = useState<
    "idle" | "connecting" | "connected" | "error"
  >("idle")

  useEffect(() => {
    if (contract) return
    if (!signer) return
    if (client.status !== "connected") return
    setContractState("connecting")
    try {
      const connectContract = new ethers.Contract(
        config.contractAddress,
        contractABI,
        signer
      )
      setContract(connectContract)
      setContractState("connected")
    } catch (error) {
      setContractState("error")
    }
  }, [client, signer])

  const getMatchesByIds = async (ids: number[]): Promise<MatchStruct[]> => {
    if (!contract) return []
    const matches: any[] = await contract.getMatches(ids)
    const clearMatches = matches.filter((item) => item.createdAt > 0)
    const matchesFormatting = clearMatches.map((item) => {
      return {
        id: Big(item.id).toNumber(),
        status: item.status,
        wonMarkets: item.wonMarkets,
        markets: item.markets,
        bets: item.bets,
        createdAt: Big(item.createdAt).toNumber(),
      }
    })
    return matchesFormatting
  }

  const getMyMatches = async ({
    limit = 10,
    offset = 0,
  }: {
    limit: number
    offset: number
  }): Promise<MatchStruct[]> => {
    if (!contract) return []
    const matches: any[] = await contract.getMyMatches(limit, offset)
    const clearMatches = matches.filter((item) => item.createdAt > 0)
    const matchesFormatting = clearMatches.map((item) => {
      return {
        id: Big(item.id).toNumber(),
        status: item.status,
        wonMarkets: item.wonMarkets,
        markets: item.markets,
        bets: item.bets,
        createdAt: Big(item.createdAt).toNumber(),
      }
    })
    return matchesFormatting
  }

  const getMatchesLength = async (): Promise<number | undefined> => {
    if (!contract) return
    const matchesLength = await contract.matchesLength()

    return new Big(matchesLength).toNumber()
  }

  const createMatch = async (id: number, markets: string[][]) => {
    if (!contract) return
    await contract.createMatch(id, markets)
    console.log("Creating match: ", id)
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
    subscribeEvent,
    contractState,
  }
}
