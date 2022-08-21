import Big from "big.js"
import React, { useState } from "react"

export const useBets = () => {
  const [total, setTotal] = useState(new Big(0))
  const formattingBets = (bets: BetStruct[]) => {
    const res: { [market: string]: BetStruct[] } = {}
    const resWithWotal: {
      [market: string]: { count: number; amount: Big; percent: number }
    } = {}

    bets.forEach((bet) => {
      if (res[bet.market]) {
        res[bet.market].push(bet)
      } else {
        res[bet.market] = [bet]
      }
    })

    let totalAmount = new Big(0)
    Object.entries(res).forEach(([market, bets]) => {
      let total = new Big(0)
      let count = 0
      bets.forEach((bet) => {
        total = total.plus(bet.amount)
        count++
      })
      totalAmount = totalAmount.plus(total)
      resWithWotal[market] = { amount: total.div(10 ** 18), count, percent: 0 }
    })

    Object.entries(resWithWotal).forEach(([market, data]) => {
      const perc = new Big(100).mul(
        data.amount.div(totalAmount.div(10 ** 18).toNumber())
      )
      data["percent"] = Number(perc.toFixed(2))
    })

    setTotal(totalAmount)

    return resWithWotal
  }
  return {
    formattingBets,
    total,
  }
}
