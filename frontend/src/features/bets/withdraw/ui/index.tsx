import React from "react"
import cn from "classnames"

import styles from "./styles.module.scss"

interface BetsWithdrawProps {
  onClick: () => void
}

export const BetsWithdraw = ({ onClick }: BetsWithdrawProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      Withdraw
    </button>
  )
}
