import { BetInfo } from "entities/bet/ui/bet-info"
import React, { useState } from "react"

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
  match: Match
  market: string
  isOpen: boolean
}) => {
  const [isLoadBets, setIsLoadBets] = useState(false)
  const {
    onAddBet,
    onAmountChange,
    onMarketClick,
    setToggle,
    setBidState,
    potentialWon,
    selectedMarket,
    toggle,
    amount,
    bidState,
    totalByMarket,
  } = useAddBet(match, isLoadBets || isOpen)
  const account = useAccount()
  const { data } = useBalance({
    addressOrName: account.address,
  })

  const handleMarket = () => {
    setIsLoadBets(true)
    onMarketClick(market)
  }

  const handleHide = () => {
    setBidState("IDLE")
    setToggle(false)
    setIsLoadBets(false)
  }

  return (
    <>
      <li className={styles.item} onClick={handleMarket}>
        <h4 className={styles.itemTitle}>
          <span>{market}</span>
        </h4>
        {isOpen && data && (
          <BetInfo
            symbol={data.symbol}
            amount={
              totalByMarket ? totalByMarket[market]?.amount.toString() : "0"
            }
            count={totalByMarket ? totalByMarket[market]?.count : 0}
            percent={totalByMarket ? totalByMarket[market]?.percent || 0 : 0}
          />
        )}
      </li>
      <Modal isShow={toggle} style={{ padding: 0 }} onHide={handleHide}>
        <div className={styles.modalBody}>
          {bidState === "IDLE" && data && (
            <AddBetStateIdle
              amount={amount}
              balance={data.formatted}
              onAddBet={onAddBet}
              onAmountChange={onAmountChange}
              potentialWin={potentialWon}
              selectedMarket={selectedMarket}
              symbol={data.symbol}
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
