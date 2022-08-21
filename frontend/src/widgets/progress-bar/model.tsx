import React, { useState } from "react"

export const useProgressBar = () => {
  const [activeStep, setActiveStep] = useState(1)

  const handleChangeStep = (step: number) => {
    setActiveStep(step)
  }

  return {
    activeStep,
    onChangeStep: handleChangeStep,
  }
}
