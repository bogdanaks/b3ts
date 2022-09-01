import React from "react"
import { Card } from "shared/ui/card"

import styles from "./styles.module.scss"

interface MatchSkeletonProps {
  count?: number
}

export const MatchSkeleton = ({ count = 1 }: MatchSkeletonProps) => {
  return (
    <>
      {[...Array(count).keys()].map((item) => (
        <Card key={item} className={styles.item} as="li" />
      ))}
    </>
  )
}
