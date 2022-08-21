import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import cn from "classnames"

import styles from "./styles.module.scss"

export const SportsBar = () => {
  const router = useRouter()

  return (
    <ul className={styles.list}>
      <li
        className={cn(styles.listItem, {
          [styles.active]: router.asPath === "/sports/football",
        })}
      >
        <Link href="/sports/football">
          <a>
            <Image
              src="/assets/sports/football.webp"
              alt="Football"
              width={30}
              height={30}
            />
            <span>Football</span>
          </a>
        </Link>
      </li>
      <li
        className={cn(styles.listItem, {
          [styles.active]: router.asPath === "/sports/csgo",
        })}
      >
        <Link href="/sports/csgo">
          <a>
            <Image
              src="/assets/sports/csgo.webp"
              alt="CS:GO"
              width={30}
              height={30}
            />
            <span>CS:GO</span>
          </a>
        </Link>
      </li>
      <li
        className={cn(styles.listItem, {
          [styles.active]: router.asPath === "/sports/dota2",
        })}
      >
        <Link href="/sports/dota2">
          <a>
            <Image
              src="/assets/sports/dota.webp"
              alt="DOTA"
              width={30}
              height={30}
            />
            <span>DOTA 2</span>
          </a>
        </Link>
      </li>
    </ul>
  )
}
