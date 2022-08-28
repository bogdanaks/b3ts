import React from "react"

import styles from "./styles.module.scss"

export const CreateMatchStateProcessing = () => {
  return (
    <div className={styles.modalBody}>
      <h4>Create match</h4>
      <div className={styles.modalBodyBlock}>
        <h5>Processing transaction..</h5>
        <span>
          The transaction is being processed, don't worry, if you close this
          window, the processing will not be stopped
        </span>
      </div>
    </div>
  )
}
