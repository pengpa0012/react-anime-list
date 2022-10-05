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

  
  return (
    <div className="container py-20 px-2">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 mr-0 lg:mr-10">
          <img src={animeProfile?.images?.jpg.large_image_url} className="w-full rounded-md"/>
        </div>
        <div className="w-full">
          <div className="mb-6">
            <h2 className="text-3xl mb-4">{animeProfile?.title_english || animeProfile?.title}</h2>
            <div className="flex my-4 text-sm">
              <ul className="w-full">
                <li className="my-1">Episodes: {animeProfile?.episodes || "N/A"}</li>
                <li className="my-1">Type: {animeProfile?.type || "N/A"}</li>
                <li className="my-1">Aired: {animeProfile?.aired?.string || "N/A"}</li>
                <li className="my-1">Popularity: {animeProfile?.popularity || "N/A"}</li>
                <li className="my-1">Season: {animeProfile?.season || "N/A"}</li>
                <li className="my-1">Status: {animeProfile?.status || "N/A"}</li>
                <li className="my-1 flex">
                  Studios: 
                  <ul className="flex flex-wrap items-center gap-1">
                    {
                      animeProfile?.studios?.map((item: any, i: number) => (
                        <li className="first:ml-2" key={`studio-${i}`}>{item.name}</li>
                      )) || "N/A"
                    }
                  </ul>
                </li>
              </ul>
              <ul className="w-full">
                <li className="my-1">Rating: {animeProfile?.rating || "N/A"}</li>
                <li className="my-1">Year: {animeProfile?.year || "N/A"}</li>
                <li className="my-1">Score: {animeProfile?.score || "N/A"}</li>
                <li className="my-1">Source: {animeProfile?.source || "N/A"}</li>
                <li className="my-1 flex">
                  Genres:
                  <ul className="flex flex-wrap items-center gap-1">
                    {
                      animeProfile?.genres?.map((item: any, i: number) => (
                        <li className="first:ml-2" key={`genre-${i}`}>{item.name}</li>
                      )) || "N/A"
                    }
                  </ul>
                </li>
                <li className="my-1 flex">
                  Producers: 
                  <ul className="flex flex-wrap items-center gap-1">
                    {
                      animeProfile?.producers?.map((item: any, i: number) => (
                        <li className="first:ml-2" key={`studio-${i}`}>{item.name}</li>
                      )) || "N/A"
                    }
                  </ul>
                </li>
              </ul>
            </div>
            <div className="my-2">
              <h3 className="text-xl mb-2">Synopsis</h3>
              <p className="text-sm text-gray-500 leading-snug">{animeProfile?.synopsis}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6">
        <iframe className="w-full" height="500" src={`${animeProfile?.trailer?.embed_url}?autoplay=0&mute=0&showinfo=0&rel=0`}></iframe>
      </div>
    </div>
  )
}

export default profile