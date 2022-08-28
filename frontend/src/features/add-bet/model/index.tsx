import { useMyContract } from "shared/hooks/use-my-contract"
import { useToggle } from "shared/hooks/use-toggle"
import React, { ChangeEvent, useMemo, useState } from "react"
import { useBets } from "entities/bet/model"
import Imask from "imask"
import Big from "big.js"

export const useAddBet = (match: Match, isOpen: boolean) => {
  const { toggle, setToggle } = useToggle()
  const [selectedMarket, setSelectedMarket] = useState("")
  const { addBet } = useMyContract()
  const { total, bets, totalByMarket } = useBets(match.id, isOpen)
  const [amount, setAmount] = useState("0")
  const [bidState, setBidState] = useState<
    "IDLE" | "PROCESSING" | "SUCCESS" | "REJECTED" | "PENDING"
  >("IDLE")

  const potentialWon = useMemo(() => {
    let potentialWon = new Big(0)
    if (!selectedMarket) return potentialWon
    if (!amount) return potentialWon
    if (amount === "0") return potentialWon
    if (!totalByMarket || !Object.keys(totalByMarket).length)
      return potentialWon.plus(amount)

    let myTotal = new Big(0)
    let anotherTotal = new Big(0)
    Object.entries(totalByMarket).forEach(([market, data]) => {
      if (selectedMarket === market) {
        myTotal = data.amount
        return
      }
      anotherTotal = anotherTotal.plus(data.amount)
    })

    if (myTotal.eq(0)) return anotherTotal.plus(amount)

    const myTotalWithMe = new Big(amount).plus(myTotal)
    const proportion = new Big(amount).div(myTotalWithMe)
    const won = proportion.mul(anotherTotal)

    return won.plus(amount)
  }, [amount, totalByMarket])

  const onMarketClick = async (market: string) => {
    setSelectedMarket(market)
    setToggle(true)
  }

  const processingTx = async (tx: any) => {
    setBidState("PROCESSING")
    const receipt = await tx.wait()

    if (receipt.confirmations >= 1 && receipt.blockNumber) {
      setBidState("SUCCESS")
    }
  }

  const onAddBet = async () => {
    setBidState("PENDING")
    let tx
    try {
      tx = await addBet(match.id, selectedMarket, amount)
      if (!tx) return
    } catch (error) {
      setBidState("REJECTED")
      return
    }
    await processingTx(tx)
  }

  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amountMasker = Imask.createMask({
      mask: /^[0-9]*\.?[0-9]*$/,
    })

    const formattedAmount = amountMasker.resolve(e.target.value)
    setAmount(formattedAmount)
  }

  return {
    onAmountChange,
    onAddBet,
    onMarketClick,
    setToggle,
    setBidState,
    potentialWon,
    total,
    toggle,
    selectedMarket,
    amount,
    bidState,
    bets,
    totalByMarket,
  }
}
