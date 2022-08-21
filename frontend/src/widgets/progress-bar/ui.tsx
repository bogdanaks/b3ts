import React from "react"
import cn from "classnames"

import styles from "./styles.module.scss"

interface ProgressBarProps {
  steps: number
  activeStep: number
}

export const ProgressBar = ({ steps, activeStep }: ProgressBarProps) => {
  return (
    <div className={styles.progress}>
      <div className={styles.progressBarWrapper} />
      <div
        className={styles.progressBar}
        style={{
          width: ((activeStep - 1) / (steps - 1)) * 100 + "%",
        }}
      />
      <ul className={styles.progressNum}>
        {Array.from(Array(steps).keys()).map((_, index) => (
          <li
            key={index}
            className={cn(styles.step, {
              [styles.active]: index + 1 <= activeStep,
            })}
          />
        ))}
      </ul>
    </div>
  )
}
