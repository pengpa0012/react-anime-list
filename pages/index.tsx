import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Card from '../src/Components/Card'
import { fetchAPI } from '../src/Utilities/Config'

const Home: NextPage = () => {
  const router = useRouter()
  const [animeTop, setAnimeTop] = useState<object[]>()

  useEffect(() => {
    fetchAPI("https://api.jikan.moe/v4/top/anime")
    .then(res => {
      setAnimeTop(res.data.slice(0, 10))
    })
    .catch(console.error)
  }, [])
    

  return (
    <div className="container py-20">
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold">ANIME LIST</h1>
        <button className="border rounded-md px-4 py-2" onClick={() => router.push("/search")}>Search Anime</button>
      </div>  
      <div className="my-20">
        <h2 className="text-xl font-bold mb-4">Top 10 Anime</h2>
        <div className="flex">
          {
            animeTop?.map((anime: any, index: number) => (
              <Card anime={anime} key={index} home/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home
