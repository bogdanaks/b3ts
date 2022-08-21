import React, { useState } from "react"

export const useToggle = () => {
  const [toggle, setToggle] = useState(false)

  return {
    toggle,
    setToggle,
  }
}
