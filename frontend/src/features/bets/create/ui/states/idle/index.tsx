import Big from "big.js"
import React from "react"
import { Button } from "shared/ui/button"
import { Input } from "shared/ui/input"

import styles from "./styles.module.scss"

interface AddBetStateIdleProps {
  selectedMarket: string
  amount: string
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  symbol: string
  potentialWin: Big
  balance: string
  onAddBet: () => Promise<void>
}

export const AddBetStateIdle = ({
  selectedMarket,
  amount,
  onAmountChange,
  symbol,
  potentialWin,
  balance,
  onAddBet,
}: AddBetStateIdleProps) => {
  return (
    <div className={styles.modalBody}>
      <h4>Place a bit</h4>
      <div className={styles.modalBodyBlock}>
        <label className={styles.modalBodyBlockLabel}>You are bidding on</label>
        <span className={styles.modalBodyBlockMarket}>{selectedMarket}</span>
      </div>
      <div className={styles.modalBodyBlock}>
        <label className={styles.modalBodyBlockLabel}>Your bid</label>
        <Input
          value={amount}
          onChange={onAmountChange}
          rightContent={<span style={{ userSelect: "none" }}>{symbol}</span>}
        />
      </div>
      <div className={styles.modalBodyTable}>
        <div className={styles.modalBodyTableRow}>
          <label className={styles.modalBodyTableRowLabel}>Your balance</label>
          <span className={styles.modalBodyTableRowText}>
            {balance} {symbol}
          </span>
        </div>
        <div className={styles.modalBodyTableRow}>
          <label className={styles.modalBodyTableRowLabel}>Potential win</label>
          <span className={styles.modalBodyTableRowText}>
            {potentialWin.toString()} {symbol}
          </span>
        </div>
      </div>
      <Button className={styles.modalBodyBtn} onClick={onAddBet}>
        Place a bid
      </Button>
    </div>
  )
}
