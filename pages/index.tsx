import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Card from '../src/Components/Card'
import { fetchAPI } from '../src/Utilities/Config'
import { Anime } from '../src/Utilities/Types'

const Home: NextPage = () => {
  const router = useRouter()
  const [animeTop, setAnimeTop] = useState<Anime>()

  useEffect(() => {
    fetchAPI("https://api.jikan.moe/v4/top/anime")
    .then(res => {
      setAnimeTop(res.data[0])
    })
    .catch(console.error)
  }, [])
  
  console.log(animeTop)

  return (
    <div className="container py-20">
      <div className="my-10">
        <div className="flex flex-col md:flex-row px-2">
          <img src={animeTop?.images?.jpg.large_image_url} className="w-full md:w-1/2 mb-6 md:mb-0 mr-0 md:mr-12" />
          <div className="w-full md:w-1/2">
            <div className="mb-6">
              <h1 className="text-3xl mb-4">{animeTop?.title_english || animeTop?.title}</h1>
              <p className="text-md text-gray-500 leading-snug">{animeTop?.synopsis}</p>
            </div>
            <div className="mb-2">
              <h4 className="text-xl font-bold">Streaming On:</h4>
              <div className="flex gap-10">
                <h1>TEST</h1>
                <h1>TEST</h1>
                <h1>TEST</h1>
                <h1>TEST</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
