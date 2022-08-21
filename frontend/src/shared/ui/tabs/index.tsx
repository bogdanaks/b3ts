import React, { HTMLAttributes, ReactElement, useState } from "react"
import { Tab } from "./tab"
import cn from "classnames"

import styles from "./styles.module.scss"

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement<any>[]
  activeDefault?: number
}

const Tabs = ({ children, activeDefault = 0, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(activeDefault)
  return (
    <div {...props}>
      <ul className={styles.tabs}>
        {children.map((child, index) => {
          return (
            <li
              key={index}
              className={cn({ [styles.activeTab]: index === activeTab })}
              onClick={() => setActiveTab(index)}
            >
              {React.cloneElement(child as React.ReactElement<any>, {
                isActive: index === activeTab,
              })}
            </li>
          )
        })}
      </ul>
      <div className={styles.body}>{children[activeTab].props.body}</div>
    </div>
  )
}

Tabs.Tab = Tab

export default Tabs
