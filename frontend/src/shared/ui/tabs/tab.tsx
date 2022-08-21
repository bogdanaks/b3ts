import React from "react"

import styles from "./styles.module.scss"

interface TabProps {
  title: string
  body?: JSX.Element
}

export const Tab = ({ title }: TabProps) => {
  return (
    <div className={styles.tab}>
      <span>{title}</span>
    </div>
  )
}
