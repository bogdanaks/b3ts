import moment from "moment"
import React from "react"

import styles from "./styles.module.scss"

interface MatchDateProps {
  date: Date
}

export const MatchDate = ({ date }: MatchDateProps) => {
  return (
    <span className={styles.date}>
      {moment(date).format("DD/MM/YYYY hh:mm")}
    </span>
  )
}
