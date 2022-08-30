import React, { useEffect, useState } from "react"
import { useProgressBar } from "widgets/progress-bar/model"
import { useConnect } from "wagmi"
import { useDisconnect } from "wagmi"

type WALLET_STATE = "IDLE" | "CONNECTING" | "REJECTED" | "CONNECTED"

export const useWalletModel = () => {
  const { activeStep, onChangeStep } = useProgressBar()
  const { connect, connectors, error, isSuccess } = useConnect()
  const { disconnect } = useDisconnect()

  const [state, setState] = useState<WALLET_STATE>("IDLE")
  const [information, setInformation] = useState({
    titleLeft: "",
    titleRight: "",
    description: "",
  })

  const getInformation = () => {
    switch (state) {
      case "IDLE":
        return {
          titleLeft: "Connect your wallet",
          titleRight: "Connect your wallet",
          description:
            "Connecting your wallet is like “logging in” to Web3. Select your wallet from the options to get started.",
        }
      case "CONNECTING":
        return {
          titleLeft: "Approve Connection",
          titleRight: "Connecting..",
          description:
            "Please approve the connection in your wallet and authorize access to continue.",
        }
      case "REJECTED":
        return {
          titleLeft: "Approve Connection",
          titleRight: "Connection Rejected",
          description:
            "Please approve the connection in your wallet and authorize access to continue.",
        }

      default:
        return information
    }
  }

  useEffect(() => {
    setInformation(getInformation())
  }, [state])

  const handleDisconnect = async () => {
    onChangeStep(1)
    setState("IDLE")
    disconnect()
  }

  const connectMM = async () => {
    console.log("click mm")

    onChangeStep(2)
    setState("CONNECTING")
    connect({ connector: connectors[0] })
  }

  const connectWC = async () => {
    console.log("click wc")

    onChangeStep(2)
    setState("CONNECTING")
    connect({ connector: connectors[1] })
  }

  const connectCB = async () => {
    console.log("click cb")

    onChangeStep(2)
    setState("CONNECTING")
    connect({ connector: connectors[2] })
  }

  useEffect(() => {
    if (!isSuccess) return
    setState("CONNECTED")
    onChangeStep(3)
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      if (error.name === "UserRejectedRequestError") {
        setState("REJECTED")
      }
    }
  }, [error])

  return {
    state,
    information,
    activeStep,
    onChangeState: setState,
    connectMM,
    connectWC,
    connectCB,
    disconnectWallet: handleDisconnect,
    onChangeStep,
  }
}
