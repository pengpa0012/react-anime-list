import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Card from '../src/Components/Card'
import { fetchAPI } from '../src/Utilities/Config'

const Home: NextPage = () => {
  const [allAnime, setAllAnime] = useState<Object[]>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [animeInfo, setAnimeInfo] = useState<any>({
    info: {},
    episodes: {},
    people: {}
  })
  const [id, setId] = useState<number>()

  useEffect(() => {
    fetchAPI("https://api.jikan.moe/v4/anime")
    .then(res => setAllAnime(res.data))
    .catch(console.error)
  }, [])

  useEffect(() => {
    if(showModal){
      document.body.style.overflowY = "hidden"
    }else {
      document.body.style.overflowY = "scroll"
    }
  }, [showModal])

  const getAnime = async (id: number) => {
    setId(id)
    setShowModal(true)
    setAnimeInfo({
      info: allAnime?.filter((anime: any) => anime.mal_id == id)[0],
    })
  }

  const getAnimePeople = async () => {
    fetchAPI(`https://api.jikan.moe/v4/people/${id}/full`)
    .then(response => {
      setAnimeInfo({
        ...animeInfo,
        people: response.data
      })
    })
    .catch(console.error)
  }

  const getAnimeEpisodes = async () => {
    fetchAPI(`https://api.jikan.moe/v4/anime/${id}/videos`)
    .then(response => {
      setAnimeInfo({
        ...animeInfo,
        episodes: response.data
      })
    })
    .catch(console.error)
  }

  console.log(animeInfo)

  const loadIframe = (e: any) => {
    e.target.removeAttribute("srcdoc")
  }

  return (
    <div className="container flex flex-wrap justify-center gap-2 py-20 px-6">
      {
        allAnime?.map((anime: any, index: number) => (
          <Card anime={anime} key={index} onClick={() => getAnime(anime.mal_id)}/>
        ))
      }
      <div className={`modal-cover ${showModal ? "pointer-events-auto overflow-y-scroll" : "pointer-events-none overflow-y-hidden"}`} onClick={() => {
        setShowModal(false)
        setAnimeInfo({
          info: {},
          episodes: {},
          people: {}
        })
      }}>

      <div className={`modal ${showModal ? "active" : ""}`}>
        {
          Object.keys(animeInfo?.info).length > 1 ?
          <iframe srcDoc="Loading..." onLoad={(e) => loadIframe(e)} className="w-full pointer-events-none" height="400" src={`${animeInfo?.info?.trailer?.embed_url}&autoplay=1&mute=1&controls=0&showinfo=0&rel=0`}></iframe>
          : undefined
        }
        <div className="p-6">
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
          <h1 className="text-2xl">{animeInfo?.info.title}</h1>
        </div>
      </div>
      </div>
      <div className={`overlay ${showModal ? "active" : ""}`}></div>
    </div>
  )
}

export default Home
