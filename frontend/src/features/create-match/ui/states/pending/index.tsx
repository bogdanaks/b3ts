import React from "react"

import styles from "./styles.module.scss"

export const CreateMatchStatePending = () => {
  return (
    <div className={styles.modalBody}>
      <h4>Create match</h4>
      <div className={styles.modalBodyBlock}>
        <h5>Confirmation transaction..</h5>
        <span>Confirm the transaction in your wallet</span>
      </div>
    </div>
  )
}
