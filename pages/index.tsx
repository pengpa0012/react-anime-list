import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Card from '../src/Components/Card'

const Home: NextPage = () => {
  const [allAnime, setAllAnime] = useState<Object[]>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [animeInfo, setAnimeInfo] = useState<Object>({
    info: {},
    episodes: [],
    people: {}
  })
  const [id, setId] = useState<number>()

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


  const getAnime = async (id: number) => {
    setId(id)
    setShowModal(true)
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/videos`)
    const animeEpisodes = await response.json()
    
    setAnimeInfo({
      info: allAnime?.filter((anime: any) => anime.mal_id == id)[0],
      episodes: animeEpisodes.data
    })
  }

  const getAnimePeople = async (id: number) => {
    const response = await fetch(`https://api.jikan.moe/v4/people/${id}/full`)
    const animePeople = await response.json()
    
    setAnimeInfo({
      ...animeInfo,
      people: animePeople.data
    })
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 py-20 px-6">
      {
        allAnime?.map((anime: any, index: number) => (
          <Card anime={anime} key={index} onClick={() => getAnime(anime.mal_id)}/>
        ))
      }
      <div className={`modal ${showModal ? "active" : ""}`}>
        <h1>MODAL</h1>
      </div>
      <div className={`overlay ${showModal ? "active" : ""}`} onClick={() => setShowModal(false)}></div>
    </div>
  )
}

export default Home
