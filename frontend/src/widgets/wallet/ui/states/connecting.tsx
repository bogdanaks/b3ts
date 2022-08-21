import React from "react"

import styles from "../styles.module.scss"

export const StateConnecting = () => {
  return (
    <div className={styles.stateBody}>
      <div className={styles.stateBodyBlock}>
        <span>
          Make sure to select all accounts that you want to grant access to.
        </span>
      </div>
    </div>
  )
}
