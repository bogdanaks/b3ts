import React from "react"
import { Button } from "shared/ui/button"

import styles from "./styles.module.scss"

interface CreateMatchStateSuccessProps {
  hideModal: () => void
}

export const CreateMatchStateSuccess = ({
  hideModal,
}: CreateMatchStateSuccessProps) => {
  return (
    <div className={styles.modalBody}>
      <h4 style={{ marginRight: 25 }}>Create match</h4>
      <div className={styles.modalBodyBlock}>
        <h5>Successfully created!</h5>
        <Button onClick={hideModal}>OK</Button>
      </div>
    </div>
  )
}
