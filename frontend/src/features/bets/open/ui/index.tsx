import React from "react"
import cn from "classnames"

import styles from "./styles.module.scss"

interface BetsOpenProps {
  isOpen: boolean
  onClick: () => void
}

export const BetsOpen = ({ isOpen, onClick }: BetsOpenProps) => {
  return (
    <button
      onClick={onClick}
      className={styles.button}
    >
      {!isOpen ? "Show bets" : "Hide bets"}
    </button>
  )
}
