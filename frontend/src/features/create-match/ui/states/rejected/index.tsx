import React from "react"
import { Button } from "shared/ui/button"

import styles from "./styles.module.scss"

interface CreateMatchStateMainProps {
  onCreateMatch: () => Promise<void>
}

export const CreateMatchStateRejected = ({
  onCreateMatch,
}: CreateMatchStateMainProps) => {
  return (
    <div className={styles.modalBody}>
      <h4>Create match</h4>
      <div className={styles.modalBodyBlock}>
        <h5>Rejected transaction!</h5>
        <Button onClick={onCreateMatch}>Click here to try again</Button>
      </div>
    </div>
  )
}
