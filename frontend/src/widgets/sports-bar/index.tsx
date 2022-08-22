import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import cn from "classnames"

import styles from "./styles.module.scss"

interface SportsBarProps {
  rootRoute: string
  activeLink?: number
}

export const SportsBar = ({ rootRoute, activeLink }: SportsBarProps) => {
  const router = useRouter()

  return (
    <ul className={styles.list}>
      <li
        className={cn(styles.listItem, {
          [styles.active]:
            router.asPath === `/${rootRoute}/football` || activeLink === 1,
        })}
      >
        <Link href={`/${rootRoute}/football`}>
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
          [styles.active]:
            router.asPath === `/${rootRoute}/csgo` || activeLink === 2,
        })}
      >
        <Link href={`/${rootRoute}/csgo`}>
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
          [styles.active]:
            router.asPath === `/${rootRoute}/dota2` || activeLink === 3,
        })}
      >
        <Link href={`/${rootRoute}/dota2`}>
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
