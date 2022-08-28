import { Bets } from "app/Bets"
import Big from "big.js"
import React, { useEffect, useMemo, useState } from "react"
import { useMyContract } from "shared/hooks/use-my-contract"

export const useBets = (matchId: number, isOpen: boolean) => {
  const { getBetsByMatchId } = useMyContract()
  const [bets, setBets] = useState<Bets.BetStructOutput[]>([])

  const formattingBets = (bets: Bets.BetStructOutput[]) => {
    const sortByMarkets: { [market: string]: Bets.BetStructOutput[] } = {}
    const resByTotalMarkets: {
      [market: string]: { count: number; amount: Big; percent: number }
    } = {}

    bets.forEach((bet) => {
      if (sortByMarkets[bet.market]) {
        sortByMarkets[bet.market].push(bet)
      } else {
        sortByMarkets[bet.market] = [bet]
      }
    })

    let totalAmount = new Big(0)
    Object.entries(sortByMarkets).forEach(([market, bets]) => {
      let total = new Big(0)
      let count = 0
      bets.forEach((bet) => {
        total = total.plus(new Big(bet.amount.toString()))
        count++
      })
      totalAmount = totalAmount.plus(total)
      resByTotalMarkets[market] = {
        amount: total.div(10 ** 18),
        count,
        percent: 0,
      }
    })

    Object.entries(resByTotalMarkets).forEach(([market, data]) => {
      const perc = new Big(100).mul(
        data.amount.div(totalAmount.div(10 ** 18).toNumber())
      )
      data["percent"] = Number(perc.toFixed(2))
    })

    return { total: totalAmount, totalByMarket: resByTotalMarkets }
  }

  const { total, totalByMarket } = useMemo(() => {
    if (!bets.length) return { total: new Big(0), totalByMarket: undefined }
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

  console.log("totalByMarket", totalByMarket)

  return {
    total,
    totalByMarket,
    bets,
  }
}
