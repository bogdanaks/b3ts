import Big from "big.js"
import { ethers } from "ethers"
import moment from "moment"
import React from "react"
import { shortAddress } from "shared/lib/short-address"
import { useAccount, useBalance } from "wagmi"

import styles from "./styles.module.scss"

export const BetsList = ({ match }: { match: MatchWithSmart }) => {
  const account = useAccount()
  const { data } = useBalance({
    addressOrName: account.address,
  })

  if (!match.matchFromSmart || !match.matchFromSmart.bets.length) {
    return (
      <div className={styles.wrapper}>
        <span>Not yet</span>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {[...match.matchFromSmart.bets].reverse().map((bet, index) => (
          <li className={styles.listItem} key={index}>
            <span className={styles.listItemMarket}>{bet.market}</span>
            <span>{shortAddress(bet.user)}</span>
            <span>
              {ethers.utils.formatEther(bet.amount.toString())}{" "}
              {data?.symbol || ""}
            </span>
            <span>
              {moment(new Big(bet.createdAt).toNumber()).format(
                "DD/MM HH:mm:ss"
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
