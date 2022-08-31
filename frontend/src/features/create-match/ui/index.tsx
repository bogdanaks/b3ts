import { Wallet } from "widgets/wallet/ui"
import React, { FormEvent } from "react"
import { Button } from "shared/ui/button"
import { Input } from "shared/ui/input"
import { Modal } from "shared/ui/modal"
import { useAccount } from "wagmi"
import { useCreateMatch } from "../model"
import { CreateMatchStateDbError } from "./states/db_error"
import { CreateMatchStatePending } from "./states/pending"
import { CreateMatchStateProcessing } from "./states/processing"
import { CreateMatchStateRejected } from "./states/rejected"
import { CreateMatchStateSuccess } from "./states/success"

import styles from "./styles.module.scss"
import useIsMounted from "shared/hooks/use-is-mounted"

export const CreateMatch = () => {
  const {
    setState,
    form,
    onCreateMatch,
    onInputChange,
    retryCreateMatchDatabase,
    toggle,
    setToggle,
    state,
    matchId,
  } = useCreateMatch()
  const { address } = useAccount()
  const isMounted = useIsMounted()

  const handleHide = () => {
    setState("IDLE")
    setToggle(false)
  }

  const handleForm = (e: FormEvent) => {
    e.preventDefault()
    setToggle(true)
    onCreateMatch()
  }

  const handleRetry = async () => {
    setToggle(true)
    await onCreateMatch()
  }

  if (!isMounted()) return null

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleForm} className={styles.form}>
        <Input
          placeholder="title"
          value={form.title || ""}
          onChange={(e) => onInputChange(e, "title")}
          classNameWrapper={styles.input}
        />
        <Input
          placeholder="sport_id"
          value={form.sport_id || ""}
          onChange={(e) => onInputChange(e, "sport_id")}
          classNameWrapper={styles.input}
        />
        <Input
          placeholder="status"
          value={form.status || ""}
          onChange={(e) => onInputChange(e, "status")}
          classNameWrapper={styles.input}
        />
        <Input
          placeholder="markets"
          value={form.markets || ""}
          onChange={(e) => onInputChange(e, "markets")}
          classNameWrapper={styles.input}
        />
        <Input
          placeholder="start_at"
          value={form.start_at}
          onChange={(e) => onInputChange(e, "start_at")}
          classNameWrapper={styles.input}
        />
        {address ? (
          <Button className={styles.btn}>Create match</Button>
        ) : (
          <Wallet />
        )}
      </form>
      <Modal isShow={toggle} style={{ padding: 0 }} onHide={handleHide}>
        <div className={styles.modalBody}>
          {state === "PENDING" && <CreateMatchStatePending />}
          {state === "REJECTED" && (
            <CreateMatchStateRejected onCreateMatch={handleRetry} />
          )}
          {state === "DB_ERROR" && (
            <CreateMatchStateDbError
              retryCreateMatch={retryCreateMatchDatabase}
              matchId={matchId}
            />
          )}
          {state === "PROCESSING" ||
            (state === "DB_CREATING" && <CreateMatchStateProcessing />)}
          {state === "SUCCESS" && (
            <CreateMatchStateSuccess hideModal={() => setToggle(false)} />
          )}
        </div>
      </Modal>
    </div>
  )
}
