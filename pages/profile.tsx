import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../src/Utilities/Config'
import { Anime } from '../src/Utilities/Types'

function profile() {
  const router = useRouter()
  const [animeProfile, setAnimeProfile] = useState<Anime>()

  useEffect(() => {
    if(!router.isReady) return;
    fetchAPI(`https://api.jikan.moe/v4/anime/${router.query.id}`)
    .then(res => {
      console.log(res)
      setAnimeProfile(res.data)
    })
    .catch(console.error)
  }, [router.isReady])

  console.log(animeProfile?.trailer?.embed_url.replace("youtube", "youtube-nocookie"))
  
  return (
    <div className="container py-20">
      <div className="flex flex-col lg:flex-row px-2">
        <div className="w-full md:w-1/2 mb-12 lg:mb-0 mr-0 lg:mr-10">
          <img src={animeProfile?.images?.jpg.large_image_url} className="w-full rounded-md"/>
        </div>
        <div className="w-full">
          <div className="mb-6">
            <h2 className="text-3xl mb-4">{animeProfile?.title_english || animeProfile?.title}</h2>
            <div className="mb-2">
              <h4 className="text-lg font-semibold">Genres</h4>
              <ul className="flex gap-4">
                {
                  animeProfile?.genres.map((genre: any, i: number) => (
                    <li key={`genre-${i}`}>{genre.name}</li>
                  ))  
                }   
              </ul>
            </div>
            <div className="mb-2">
              <h4 className="text-lg font-semibold">Producers</h4>
              <ul className="flex flex-wrap gap-4">
                {
                  animeProfile?.producers.map((producer: any, i: number) => (
                    <li key={`producer-${i}`}>{producer.name}</li>
                  ))  
                }   
              </ul>
            </div>
            <p className="text-md text-gray-500 leading-snug my-6">{animeProfile?.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default profile