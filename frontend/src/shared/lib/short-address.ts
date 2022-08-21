export const shortAddress = (address: string): string => {
  const leftSide = address.slice(0, 2)
  const rightSide = address.slice(-4)
  return `${leftSide}...${rightSide}`
}
