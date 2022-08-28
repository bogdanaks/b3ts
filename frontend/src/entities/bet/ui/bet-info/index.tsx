import React from "react"

import styles from "./styles.module.scss"

interface BetInfoProps {
  symbol: string
  count: number
  percent: number
  amount: string
}

export const BetInfo = ({ symbol, count, percent, amount }: BetInfoProps) => {
  return (
    <div className={styles.wrapper}>
      <span>
        <span className={styles.gray}>Pct.</span>
        {percent || 0}%
      </span>
      <span>
        <span className={styles.gray}>Bets</span> {count || 0}
      </span>
      <span>
        {amount || 0} {symbol}
      </span>
    </div>
  )
}
