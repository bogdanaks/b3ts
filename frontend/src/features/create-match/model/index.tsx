import { useMyContract } from "shared/hooks/use-my-contract"
import { useToggle } from "shared/hooks/use-toggle"
import React, { ChangeEvent, useState } from "react"
import { ContractTransaction } from "ethers"
import { createMatchAPI } from "shared/api"

export const useCreateMatch = () => {
  const { toggle, setToggle } = useToggle()
  const { createMatch } = useMyContract()
  const [error, setError] = useState("")
  const [matchId, setMatchId] = useState<number | undefined>()

  const [state, setState] = useState<
    | "IDLE"
    | "PROCESSING"
    | "SUCCESS"
    | "REJECTED"
    | "PENDING"
    | "DB_CREATING"
    | "DB_ERROR"
  >("IDLE")
  const [form, setForm] = useState<{
    [key: string]: string
  }>({
    status: "1",
    start_at: String(Date.now()),
    markets: '{"TEAM": ["TEAM_1", "TEAM_2"]}',
  })

  const processingTx = async (tx: ContractTransaction): Promise<void> => {
    setState("PROCESSING")
    const receipt = await tx.wait()

    if (receipt.confirmations >= 1 && receipt.blockNumber) {
      const event = receipt.events?.find(
        (event) => event.event === "CreateMatch"
      )
      if (!event || !event.args) {
        setState("REJECTED")
        return
      }
      const { id } = event.args

      setMatchId(id.toNumber())
      setState("DB_CREATING")
      await onCreateMatchDatabase({
        sc_id: id.toNumber(),
        title: form.title,
        sport_id: form.sport_id,
        status: Number(form.status),
        markets: form.markets,
        start_at: Number(form.start_at),
      })
    }
  }

  const onCreateMatch = async (): Promise<void> => {
    setState("PENDING")
    let tx
    try {
      tx = await createMatch(
        Object.values(JSON.parse(form.markets)),
        Number(form.start_at)
      )
      if (!tx) return
    } catch (error) {
      console.log("err", error)

      setState("REJECTED")
      return
    }
    await processingTx(tx)
  }

  const onCreateMatchDatabase = async ({
    sc_id,
    title,
    sport_id,
    status,
    markets,
    start_at,
  }: {
    sc_id: number
    title: string
    sport_id: string
    status: number
    markets: string
    start_at: number
  }): Promise<void> => {
    try {
      await createMatchAPI({
        sc_id,
        status,
        markets,
        start_at,
        title,
        sport_id,
      })
      setState("SUCCESS")
    } catch (error) {
      setState("DB_ERROR")
    }
  }

  const retryCreateMatchDatabase = async () => {
    if (!matchId) return
    await onCreateMatchDatabase({
      sc_id: matchId,
      title: form.title,
      sport_id: form.sport_id,
      status: Number(form.status),
      markets: form.markets,
      start_at: Number(form.start_at),
    })
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setForm((prevState) => ({ ...prevState, [name]: e.target.value }))
  }

  return {
    onInputChange,
    onCreateMatch,
    setToggle,
    setState,
    setForm,
    onCreateMatchDatabase,
    retryCreateMatchDatabase,
    toggle,
    form,
    state,
    matchId,
  }
}
