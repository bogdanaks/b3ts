import Link from "next/link"
import React from "react"
import { Wallet } from "widgets/wallet/ui"

import styles from "./styles.module.scss"

export const Header = () => {
  return (
    <div className={styles.header}>
      <span className={styles.logo}>
        <Link href="/">B3TS</Link>
      </span>
      <ul className={styles.headerList}>
        <li className={styles.headerListItem}>
          <Link href="/my-bets">
            <a>My bets</a>
          </Link>
        </li>
      </ul>
      <div className={styles.wallet}>
        <Wallet />
      </div>
    </div>
  )
}
