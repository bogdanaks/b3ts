import { useMyContract } from "shared/hooks/use-my-contract"
import { useToggle } from "shared/hooks/use-toggle"
import React, { ChangeEvent, useMemo, useState } from "react"
import { useBets } from "entities/bet/model"
import Big from "big.js"
import Imask from "imask"

export const useAddBet = (match: MatchWithSmart) => {
  const { toggle, setToggle } = useToggle()
  const [selectedMarket, setSelectedMarket] = useState("")
  const { addBet } = useMyContract()
  const { formattingBets, total } = useBets()
  const [amount, setAmount] = useState("0")
  const [bidState, setBidState] = useState<
    "IDLE" | "PROCESSING" | "SUCCESS" | "REJECTED" | "PENDING"
  >("IDLE")

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

  const totalBetsByMarket: {
    [market: string]: { count: number; amount: Big; percent: number }
  } = useMemo(() => {
    if (!match.matchFromSmart || !match.matchFromSmart.bets.length) {
      return {}
    }

    return formattingBets(match.matchFromSmart.bets)
  }, [match])

  return {
    onAmountChange,
    onAddBet,
    onMarketClick,
    setToggle,
    setBidState,
    totalBetsByMarket,
    total,
    toggle,
    selectedMarket,
    amount,
    bidState,
  }
}
