import classNames from "classnames"
import React, { HTMLAttributes } from "react"

import styles from "./styles.module.scss"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={classNames(styles.button, props.className)}>
      {children}
    </button>
  )
}
