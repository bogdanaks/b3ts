import React from "react"
import styles from "./styles.module.scss"

interface WalletInstructionsProps {
  title: string
  description: string
}

export const WalletInstructions = ({
  title,
  description,
}: WalletInstructionsProps) => {
  return (
    <>
      <h4 className={styles.bodyProgressTitle}>{title}</h4>
      <span className={styles.bodyProgressText}>{description}</span>
    </>
  )
}
