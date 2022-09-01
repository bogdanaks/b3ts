import React from "react"

interface MatchTitleProps {
  title: string
}

export const MatchTitle = ({ title }: MatchTitleProps) => {
  return <h3 style={{ fontWeight: 500 }}>{title}</h3>
}
