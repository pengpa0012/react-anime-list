import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Card from '../src/Components/Card'

const Home: NextPage = () => {
  const [allAnime, setAllAnime] = useState<Object[]>()

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch("https://api.jikan.moe/v4/anime")
      const data = response.json()
      return data
    }

    fetchAPI()
    .then(res => setAllAnime(res.data))
    .catch(console.error)
  }, [])

  console.log(allAnime)
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {
        allAnime?.map((anime: any, index: number) => (
          <Card anime={anime} key={index} />
        ))
      }
    </div>
  )
}

export default Home
