import React from "react"

import styles from "./styles.module.scss"

export const AddBetStatePending = () => {
  return (
    <div className={styles.modalBody}>
      <h4>Place a bit</h4>
      <div className={styles.modalBodyBlock}>
        <h5>Confirmation transaction..</h5>
        <span>Confirm the transaction in your wallet</span>
      </div>
    </div>
  )
}
