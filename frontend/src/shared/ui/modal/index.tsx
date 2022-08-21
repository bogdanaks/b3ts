import React, { HTMLAttributes, useRef } from "react"
import ReactDOM from "react-dom"
import { IoClose } from "react-icons/io5"
import { useOutsideClick } from "shared/hooks/use-outside-click"

import styles from "./styles.module.scss"

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element
  isShow?: boolean
  onHide: () => void
  title?: string
  isShowClose?: boolean
}

export const Modal = ({
  children,
  isShow,
  title,
  onHide,
  isShowClose = true,
  ...props
}: ModalProps) => {
  const divRef = useRef()
  useOutsideClick(divRef, onHide)

  if (!isShow) return null

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalWrapper} />
      <div className={styles.modalBody} {...props} ref={divRef}>
        {isShowClose && (
          <IoClose
            fontSize={24}
            className={styles.modalBodyClose}
            onClick={onHide}
          />
        )}
        {title && <h4 className={styles.title}>{title}</h4>}
        {children}
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement
  )
}
