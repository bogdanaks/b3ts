export const generateArrayNumbersFromTo = (from: number, to: number) => {
  const arr = []
  for (let i = from + 1; i <= to; i++) {
    arr.push(i)
  }
  return arr
}
