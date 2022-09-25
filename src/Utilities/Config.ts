
export const fetchAPI = async (url: string) => {
  const response = await fetch(url)
  const data = response.json()
  return data
}