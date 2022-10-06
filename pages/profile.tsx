import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchAPI, formatNumberToComma, profileData } from '../src/Utilities/Config'
import { Anime, Statistics } from '../src/Utilities/Types'

function profile() {
  const router = useRouter()
  const [animeProfile, setAnimeProfile] = useState<Anime>()
  const [stats, setStats] = useState<object[]>()
  const [staff, setStaff] = useState<object[]>()
  const [relatedAnimes, setRelatedAnimes] = useState<object[]>()
  const [latestEpisodes, setLatestEpisodes] = useState<object[]>()

  useEffect(() => {
    if(!router.isReady) return;
    setStaff(undefined)
    setRelatedAnimes(undefined)
    setLatestEpisodes(undefined)
    Promise.all([
      fetchAPI(`https://api.jikan.moe/v4/anime/${router.query.id}`),
      fetchAPI(`https://api.jikan.moe/v4/anime/${router.query.id}/statistics`)
    ])
    .then(([resAnime, resStats]) => {
      const entries = Object.entries(resStats.data).slice(1,-1).map((key: any) => {
        return {title: key[0].split("_").join(" ").toUpperCase(), number: formatNumberToComma(key[1])}
      });
      setStats(entries)
      setAnimeProfile(resAnime.data)
    })
    .catch(console.error)
  }, [router.isReady, router.query.id])

  const loadData = async (endpoint: string, setterName: string) => {
    fetchAPI(`https://api.jikan.moe/v4/anime/${router.query.id}/${endpoint}`)
    .then(response => {
      const responseConfig = endpoint == "videos" ? response.data.episodes : response.data

      switch(setterName) {
        case "Staff": 
          setStaff(responseConfig)
          break
        case "Related Animes":
          setRelatedAnimes(responseConfig)
          break
        case "Latest Episodes":
          setLatestEpisodes(responseConfig)
        default:
          break
      }
    })
    .catch(console.error)
  }

  return (
    <div className="container py-20 px-2">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 mr-0 lg:mr-10">
          <img src={animeProfile?.images?.jpg.large_image_url} className="w-full rounded-md"/>
        </div>
        <div className="w-full">
          <div className="mb-6">
            <h2 className="text-3xl mb-4">{animeProfile?.title_english || animeProfile?.title}</h2>
            <div className="flex flex-col sm:flex-row my-4 text-sm">
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
                      animeProfile?.studios.length! > 0 ?
                      animeProfile?.studios?.map((item: any, i: number) => (
                        <li className="first:ml-2" key={`studio-${i}`}>{item.name}</li>
                      )) : <li className="ml-2">N/A</li>
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
                      animeProfile?.genres.length! > 0 ?
                      animeProfile?.genres?.map((item: any, i: number) => (
                        <li className="first:ml-2" key={`genre-${i}`}>{item.name}</li>
                      )) : <li className="ml-2">N/A</li>
                    }
                  </ul>
                </li>
                <li className="my-1 flex">
                  Producers: 
                  <ul className="flex flex-wrap items-center gap-1">
                    {
                      animeProfile?.producers.length! ?
                      animeProfile?.producers?.map((item: any, i: number) => (
                        <li className="first:ml-2" key={`studio-${i}`}>{item.name}</li>
                      )) : <li className="ml-2">N/A</li>
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
        {
          animeProfile?.trailer?.embed_url ? 
            <iframe className="w-full" height="500" src={`${animeProfile?.trailer?.embed_url}?autoplay=0&mute=0&showinfo=0&rel=0`}></iframe>
          : <h2 className="text-5xl text-center text-gray-500 py-20">NO TRAILER DATA</h2>
        }
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
      <div className="my-20">
        {
          profileData?.map((data: {title: string, endpoint: string}, i: number) => {

            const collection = data.title == "Staff" ? staff : undefined || data.title == "Related Animes" ? relatedAnimes?.sort((a:any, b:any) => b.entry.length - a.entry.length) : data.title == "Latest Episodes" ? latestEpisodes : undefined

            return <div className="border border-t-0 border-l-0 border-r-0 py-8" key={`data-${i}`}>
              <div className="flex justify-between">
                <h2 className="text-gray-500 text-3xl">{data.title}</h2>
                <button disabled={collection?.length == 0 || collection  ? true : false} className="border rounded-md py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => loadData(data.endpoint, data.title)}>Show</button>
              </div>
              <h2 className={`${collection?.length == 0 ? "block" : "hidden"} text-2xl text-gray-500 text-center`}>NO DATA</h2>
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2`}>
                {
                  data.title == "Related Animes" ? 
                  collection?.map((item: any, i: number) => (
                    <div className="p-2" key={`relation-${i}`}>
                      <h3 className="mb-2 text-2xl">{item.relation}</h3>
                      <ul>
                        {
                          item.entry.map((anime: any, i: number) => (
                            <li key={`name-${i}`} onClick={() => router.push(`/profile?id=${anime.mal_id}`)} className="cursor-pointer hover:text-blue-500 hover:underline inline-block">{anime.name}</li>
                          ))
                        }
                      </ul>
                    </div>
                  ))
                  :
                  collection?.map((item: any, i: number) => (
                    <div className="p-2 flex" key={`ep-${i}`}>
                      <img loading="lazy" alt="IMG" src={(data.title == "Staff" ? item.person.images.jpg.image_url : item.images.jpg.image_url )|| "https://via.placeholder.com/100"} className={`mr-4 w-16 object-cover`} />
                      <div>
                        <h4 className="text-md">{data.title == "Staff" ? item.person.name : item.episode}</h4>
                        {
                          data.title == "Staff" ? 
                          item.positions.map((pos: any, i: number) => (
                            <p className="text-xs" key={`pos-${i}`}>{pos}</p>
                          )) : <p className="text-sm">{item.title}</p>
                        }
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default profile