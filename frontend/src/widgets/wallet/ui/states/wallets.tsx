import Image from "next/image"
import React from "react"

import styles from "../styles.module.scss"

interface StateWalletsProps {
  onMM: () => void
  onWC: () => void
  onCB: () => void
}

export const StateWallets = ({ onCB, onMM, onWC }: StateWalletsProps) => {
  return (
    <ul className={styles.bodyWalletsList}>
      <li onClick={onMM} className={styles.bodyWalletsListItem}>
        <Image
          src="/assets/wallet-icons/metamask.svg"
          alt="MetaMask"
          width={32}
          height={32}
        />
        <span>MetaMask</span>
      </li>
      <li onClick={onWC} className={styles.bodyWalletsListItem}>
        <Image
          src="/assets/wallet-icons/walletconnect.svg"
          alt="WalletConnect"
          width={32}
          height={32}
        />
        <span>WalletConnect</span>
      </li>
      <li onClick={onCB} className={styles.bodyWalletsListItem}>
        <Image
          src="/assets/wallet-icons/coinbase.svg"
          alt="CoinBase"
          width={32}
          height={32}
        />
        <span>Coinbase Wallet</span>
      </li>
    </ul>
  )
}
