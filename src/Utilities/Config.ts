import { DetailedHTMLProps, ImgHTMLAttributes } from "react"

export const fetchAPI = async (url: string) => {
  const response = await fetch(url)
  const data = response.json()
  return data
}

export const formatNumberToComma = (string: string) => {
  return string?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const profileData = [
  {
    title: "Staff",
    endpoint: "staff",
  },
  {
    title: "Characters",
    endpoint: "characters",
  },
  {
    title: "Latest Episodes",
    endpoint: "videos",
  },
  {
    title: "Related Animes",
    endpoint: "relations",
  }
]

export const handleImgError = (img: any) => {
  img.target.src = "https://via.placeholder.com/225x335"
}
