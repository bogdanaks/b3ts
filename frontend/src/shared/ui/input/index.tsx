import React, { ChangeEventHandler, HTMLAttributes } from "react"

import styles from "./styles.module.scss"

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  rightContent?: React.ReactNode
}

export const Input = ({ value, onChange, rightContent }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
      />
      {rightContent && rightContent}
    </div>
  )
}
