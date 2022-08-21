import React from "react"
import { Button } from "shared/ui/button"

import styles from "./styles.module.scss"

interface AddBetStateMainProps {
  onAddBet: () => Promise<void>
}

export const AddBetStateRejected = ({ onAddBet }: AddBetStateMainProps) => {
  return (
    <div className={styles.modalBody}>
      <h4>Place a bit</h4>
      <div className={styles.modalBodyBlock}>
        <h5>Rejected transaction!</h5>
        <Button onClick={onAddBet}>Click here to try again</Button>
      </div>
    </div>
  )
}
