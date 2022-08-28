import classNames from "classnames"
import React, { ChangeEventHandler, HTMLAttributes } from "react"

import styles from "./styles.module.scss"

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  rightContent?: React.ReactNode
  classNameWrapper?: string
  classNameInput?: string
}

export const Input = ({
  value,
  onChange,
  rightContent,
  classNameWrapper,
  classNameInput,
  ...props
}: InputProps) => {
  return (
    <div className={classNames(styles.inputWrapper, classNameWrapper)}>
      <input
        className={classNames(styles.input, classNameInput)}
        type="text"
        value={value}
        onChange={onChange}
        {...props}
      />
      {rightContent && (
        <div className={styles.rightContent}>{rightContent}</div>
      )}
    </div>
  )
}
