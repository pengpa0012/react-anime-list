import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Card from '../src/Components/Card'
import { fetchAPI } from '../src/Utilities/Config'
import { Anime } from '../src/Utilities/Types'

const Home: NextPage = () => {
  const router = useRouter()
  const [animeTop, setAnimeTop] = useState<Anime>()
  const [seasonAnime, setSeasonAnime] = useState<{
    data: Anime[]
  }>()

  useEffect(() => {
    Promise.all([
      fetchAPI("https://api.jikan.moe/v4/anime/5114"),
      fetchAPI("https://api.jikan.moe/v4/seasons/now")
    ])
    .then(([topAnime, seasonAnime]) => {
      setAnimeTop(topAnime.data)
      setSeasonAnime(seasonAnime)
    })
    .catch(console.error)

    
  }, [])

  console.log(seasonAnime)
  
  return (
    <div className="container py-10">
      <div className="mb-20">
        <h1 className="text-4xl mb-6 px-2">Top Anime</h1>
        <div className="flex flex-col lg:flex-row px-2">
          <div className="w-full md:w-1/2 mb-12 lg:mb-0 mr-0 lg:mr-6">
            <img src={animeTop?.images?.jpg.large_image_url} className="w-full"/>
          </div>
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-3xl mb-4">{animeTop?.title_english || animeTop?.title}</h2>
              <div className="mb-2">
                <h4 className="text-lg font-semibold">Genres</h4>
                <ul className="flex gap-4">
                  {
                    animeTop?.genres.map((genre: any, i: number) => (
                      <li key={`genre-${i}`}>{genre.name}</li>
                    ))  
                  }   
                </ul>
              </div>
              <div className="mb-2">
                <h4 className="text-lg font-semibold">Producers</h4>
                <ul className="flex flex-wrap gap-4">
                  {
                    animeTop?.producers.map((producer: any, i: number) => (
                      <li key={`producer-${i}`}>{producer.name}</li>
                    ))  
                  }   
                </ul>
              </div>
              <p className="text-md text-gray-500 leading-snug my-6">{animeTop?.synopsis}</p>
              <button className="border rouded-md py-2 px-4">View Details</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-20">
        <h2 className="text-3xl mb-4 px-2">Season Anime</h2>
        <div className="list">
          {
            seasonAnime?.data.map((anime: any, index: number) => (
              <Card anime={anime} key={index}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home
