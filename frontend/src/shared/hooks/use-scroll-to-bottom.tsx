import React, { useEffect } from "react"

export const useScrollToBottom = (
  isLastPage: boolean,
  callback: () => void
) => {
  const handleScroll = () => {
    const userScrollHeight = window.innerHeight + window.scrollY
    const windowBottomHeight = document.documentElement.offsetHeight

    if (userScrollHeight + 2 >= windowBottomHeight) {
      callback()
    }
  }

  useEffect(() => {
    if (isLastPage) return
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isLastPage])
}
