import React from "react"
import { Card } from "shared/ui/card"

import styles from "./styles.module.scss"

interface SkeletonMatchProps {
  count?: number
}

export const SkeletonMatch = ({ count = 1 }: SkeletonMatchProps) => {
  return (
    <>
      {[...Array(count).keys()].map((item) => (
        <Card key={item} className={styles.item} as="li" />
      ))}
    </>
  )
}
