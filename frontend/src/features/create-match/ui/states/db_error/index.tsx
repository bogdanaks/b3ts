import React from "react"
import { Button } from "shared/ui/button"

import styles from "./styles.module.scss"

interface CreateMatchStateDbErrorProps {
  retryCreateMatch: () => Promise<void>
  matchId: number | undefined
}

export const CreateMatchStateDbError = ({
  retryCreateMatch,
  matchId,
}: CreateMatchStateDbErrorProps) => {
  return (
    <div className={styles.modalBody}>
      <h4>Create match</h4>
      <div className={styles.modalBodyBlock}>
        <h5>Db Error!</h5>
        <p style={{ marginBottom: 15 }}>Match Id - {matchId}</p>
        <Button onClick={retryCreateMatch}>Click here to try again</Button>
      </div>
    </div>
  )
}
