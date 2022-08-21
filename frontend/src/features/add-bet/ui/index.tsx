import Big from "big.js"
import React, { useMemo } from "react"

import { Modal } from "shared/ui/modal"
import { useAccount, useBalance } from "wagmi"
import { useAddBet } from "../model"
import { AddBetStateIdle } from "./states/idle"
import { AddBetStatePending } from "./states/pending"
import { AddBetStateProcessing } from "./states/processing"
import { AddBetStateRejected } from "./states/rejected"
import { AddBetStateSuccess } from "./states/success"

import styles from "./styles.module.scss"

export const AddBet = ({
  match,
  market,
  isOpen,
}: {
  match: MatchWithSmart
  market: string
  isOpen: boolean
}) => {
  const {
    onAddBet,
    onAmountChange,
    onMarketClick,
    setToggle,
    setBidState,
    totalBetsByMarket,
    selectedMarket,
    toggle,
    amount,
    bidState,
  } = useAddBet(match)
  const account = useAccount()
  const { data } = useBalance({
    addressOrName: account.address,
  })
  const calculatePotential = useMemo(() => {
    let potentialWon = new Big(0)
    if (!selectedMarket) return potentialWon
    if (!amount) return potentialWon
    if (amount === "0") return potentialWon
    if (!Object.keys(totalBetsByMarket).length) return potentialWon.plus(amount)

    let myTotal = new Big(0)
    let anotherTotal = new Big(0)
    Object.entries(totalBetsByMarket).forEach(([market, data]) => {
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
  }, [totalBetsByMarket, selectedMarket, amount])

  const handleHide = () => {
    setBidState("IDLE")
    setToggle(false)
  }

  return (
    <>
      <li className={styles.item} onClick={() => onMarketClick(market)}>
        <h4 className={styles.itemTitle}>
          <span>{market}</span>
          <span>{totalBetsByMarket[market]?.percent || 0}%</span>
        </h4>
        {isOpen && (
          <div className={styles.itemInfo}>
            <span>Bets: {totalBetsByMarket[market]?.count || 0}</span>
            <span>
              {totalBetsByMarket[market]?.amount.toString() || 0}{" "}
              {data?.symbol || ""}
            </span>
          </div>
        )}
      </li>
      <Modal isShow={toggle} style={{ padding: 0 }} onHide={handleHide}>
        <div className={styles.modalBody}>
          {bidState === "IDLE" && (
            <AddBetStateIdle
              amount={amount}
              balance={data?.formatted || "0"}
              onAddBet={onAddBet}
              onAmountChange={onAmountChange}
              potentialWin={calculatePotential}
              selectedMarket={selectedMarket}
              symbol={data?.symbol || ""}
            />
          )}
          {bidState === "PENDING" && <AddBetStatePending />}
          {bidState === "REJECTED" && (
            <AddBetStateRejected onAddBet={onAddBet} />
          )}
          {bidState === "PROCESSING" && <AddBetStateProcessing />}
          {bidState === "SUCCESS" && (
            <AddBetStateSuccess hideModal={handleHide} />
          )}
        </div>
      </Modal>
    </>
  )
}
