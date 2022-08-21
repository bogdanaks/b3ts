import classNames from "classnames"
import React from "react"

import styles from "../styles.module.scss"

export const StateRejected = ({ onAgain }: { onAgain: () => void }) => {
  return (
    <div className={styles.stateBody}>
      <div className={classNames(styles.stateBodyBlock, styles.warning)}>
        <button onClick={onAgain}>Click here to try again</button>
      </div>
    </div>
  )
}
