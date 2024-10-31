export const convertDate = (timeStamp: number): string => {
  const date = new Date(timeStamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}