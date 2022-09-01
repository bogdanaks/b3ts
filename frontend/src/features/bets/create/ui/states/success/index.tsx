import React from "react"
import { Button } from "shared/ui/button"

import styles from "./styles.module.scss"

interface AddBetStateMainProps {
  hideModal: () => void
}

export const AddBetStateSuccess = ({ hideModal }: AddBetStateMainProps) => {
  return (
    <div className={styles.modalBody}>
      <h4>Place a bit</h4>
      <div className={styles.modalBodyBlock}>
        <h5>Successfully bid!</h5>
        <Button onClick={hideModal}>OK</Button>
      </div>
    </div>
  )
}
