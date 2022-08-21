import React from "react"
import { useToggle } from "shared/hooks/use-toggle"
import { shortAddress } from "shared/lib/short-address"
import { Modal } from "shared/ui/modal"
import { IoClose } from "react-icons/io5"
import { useAccount } from "wagmi"

import styles from "./styles.module.scss"
import { ProgressBar } from "widgets/progress-bar/ui"
import { StateWallets } from "./states/wallets"
import { WalletInstructions } from "./instructions"
import { useWalletModel } from "../model"
import { StateRejected } from "./states/rejected"
import { StateConnecting } from "./states/connecting"
import useIsMounted from "shared/hooks/use-is-mounted"

export const Wallet = () => {
  const {
    state,
    information,
    activeStep,
    connectCB,
    connectMM,
    connectWC,
    disconnectWallet,
    onChangeStep,
    onChangeState,
  } = useWalletModel()

  const { address } = useAccount()
  const { toggle, setToggle } = useToggle()
  const isMounted = useIsMounted()

  const handleConnectClick = () => {
    setToggle(true)
  }

  const handleAgainClick = () => {
    onChangeStep(1)
    onChangeState("IDLE")
  }

  if (isMounted() && address) {
    return (
      <div className={styles.walletConnected}>
        <span>{shortAddress(address)}</span>
        <button onClick={disconnectWallet}>Disconnect</button>
      </div>
    )
  }

  return (
    <>
      <div className={styles.wallet} onClick={handleConnectClick}>
        Connect wallet
      </div>
      <Modal
        isShow={toggle}
        style={{ padding: 0 }}
        onHide={() => setToggle(false)}
        isShowClose={false}
      >
        <div className={styles.body}>
          <div className={styles.bodyProgress}>
            <WalletInstructions
              title={information.titleLeft}
              description={information.description}
            />
            <div className={styles.bodyProgressBar}>
              <ProgressBar steps={3} activeStep={activeStep} />
            </div>
          </div>
          <div className={styles.bodyWallets}>
            <div className={styles.bodyWalletsHeader}>
              <h4>{information.titleRight}</h4>
              <IoClose
                fontSize={24}
                className={styles.bodyWalletsHeaderClose}
                onClick={() => setToggle(false)}
              />
            </div>
            {state === "IDLE" && (
              <StateWallets
                onCB={connectCB}
                onMM={connectMM}
                onWC={connectWC}
              />
            )}
            {state === "CONNECTING" && <StateConnecting />}
            {state === "REJECTED" && (
              <StateRejected onAgain={handleAgainClick} />
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
