import React from "react"

import styles from "./styles.module.scss"

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.wrapper}>{children}</div>
}
