import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../src/Utilities/Config'
import { Anime, Statistics } from '../src/Utilities/Types'

function profile() {
  const router = useRouter()
  const [animeProfile, setAnimeProfile] = useState<Anime>()
  const [stats, setStats] = useState<object[]>()

  useEffect(() => {
    if(!router.isReady) return;
    Promise.all([
      fetchAPI(`https://api.jikan.moe/v4/anime/${router.query.id}`),
      fetchAPI(`https://api.jikan.moe/v4/anime/${router.query.id}/statistics`)
    ])
    .then(([resAnime, resStats]) => {
      const entries = Object.entries(resStats.data).slice(1,-1).map(key => {
        return {title: key[0].split("_").join(" ").toUpperCase(), number: key[1]}
      });
      setStats(entries)
      setAnimeProfile(resAnime.data)
    })
    .catch(console.error)
  }, [router.isReady])

  console.log(stats)

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
      <div className="my-20">
        <iframe className="w-full" height="500" src={`${animeProfile?.trailer?.embed_url}?autoplay=0&mute=0&showinfo=0&rel=0`}></iframe>
      </div>
      <div className="my-20">
        <h2 className="text-4xl font-light mb-2 text-center">Statistics</h2>
        <ul className="flex flex-wrap justify-center gap-10 py-6">
          {
           stats?.map((stat: any, i: number) => (
              <li className="text-center" key={`stat-${i}`}>
                <span className="block mb-4">{stat.title}</span>
                <p className="text-gray-500 text-4xl grid place-items-center mx-auto">{stat.number}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default profile