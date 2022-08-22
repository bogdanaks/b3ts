import classNames from "classnames"
import React, { HTMLAttributes } from "react"

import styles from "./styles.module.scss"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  as?: "li" | "div"
}

export const Card = ({ children, as = "div", ...props }: CardProps) => {
  if (as === "li") {
    return (
      <li className={classNames(props.className, styles.card)}>{children}</li>
    )
  }
  return (
    <div className={classNames(props.className, styles.card)}>{children}</div>
  )
}
