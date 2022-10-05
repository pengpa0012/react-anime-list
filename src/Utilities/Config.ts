
export const fetchAPI = async (url: string) => {
  const response = await fetch(url)
  const data = response.json()
  return data
}

export const formatNumberToComma = (string: string) => {
  return string?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}