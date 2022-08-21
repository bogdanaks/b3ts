import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Wallet } from "widgets/wallet/ui"

import styles from "./styles.module.scss"

export const Header = () => {
  const router = useRouter()
  return (
    <div className={styles.header}>
      <span className={styles.logo}>
        <Link href="/">B3TS</Link>
      </span>
      <ul className={styles.headerList}>
        <li
          className={classNames(styles.headerListItem, {
            [styles.active]: router.asPath === "/my-bets",
          })}
        >
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
