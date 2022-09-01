import { Bets } from "app/Bets"
import Big from "big.js"
import React, { useEffect, useMemo, useState } from "react"
import { useMyContract } from "shared/hooks/use-my-contract"
import { useAccount } from "wagmi"

export const useBets = (matchId: number, isOpen: boolean) => {
  const { getBetsByMatchId } = useMyContract()
  const [bets, setBets] = useState<Bets.BetStructOutput[]>([])
  const { address } = useAccount()

  const formattingBets = (bets: Bets.BetStructOutput[]) => {
    const sortByMarkets: { [market: string]: Bets.BetStructOutput[] } = {}
    const resByTotalMarkets: {
      [market: string]: {
        totalCount: number
        myCount: number
        totalAmount: Big
        myAmount: Big
        percent: number
      }
    } = {}

    bets.forEach((bet) => {
      if (sortByMarkets[bet.market]) {
        sortByMarkets[bet.market].push(bet)
      } else {
        sortByMarkets[bet.market] = [bet]
      }
    })

    let totalAmount = new Big(0)
    let myTotalAmount = new Big(0)
    Object.entries(sortByMarkets).forEach(([market, bets]) => {
      let total = new Big(0)
      let myTotal = new Big(0)
      let totalCount = 0
      let myCount = 0
      bets.forEach((bet) => {
        total = total.plus(new Big(bet.amount.toString()))
        if (bet.user === address) {
          myTotal = myTotal.plus(new Big(bet.amount.toString()))
          myCount++
        }
        totalCount++
      })
      totalAmount = totalAmount.plus(total)
      myTotalAmount = myTotalAmount.plus(myTotal)
      resByTotalMarkets[market] = {
        totalAmount: total.div(10 ** 18),
        myAmount: myTotal.div(10 ** 18),
        totalCount,
        myCount,
        percent: 0,
      }
    })

    Object.entries(resByTotalMarkets).forEach(([_, data]) => {
      const perc = new Big(100).mul(
        data.totalAmount.div(totalAmount.div(10 ** 18).toNumber())
      )
      data["percent"] = Number(perc.toFixed(2))
    })

    console.log("totalAmount", totalAmount.toString())
    console.log("myTotalAmount", myTotalAmount.toString())

    return { totalAmount, totalByMarket: resByTotalMarkets }
  }

  const { totalAmount, totalByMarket } = useMemo(() => {
    if (!bets.length)
      return { totalAmount: new Big(0), totalByMarket: undefined }
    return formattingBets(bets)
  }, [bets])

  useEffect(() => {
    if (!matchId) return
    if (!isOpen) return
    ;(async () => {
      const res = await getBetsByMatchId(matchId)
      if (!res) return
      setBets(res)
    })()
  }, [matchId, isOpen])

  return {
    totalAmount,
    totalByMarket,
    bets,
  }
}
