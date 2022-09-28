import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Card from '../src/Components/Card'
import Modal from '../src/Components/Modal'
import { fetchAPI } from '../src/Utilities/Config'

const Home: NextPage = () => {
  const [allAnime, setAllAnime] = useState<Object[]>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [animeInfo, setAnimeInfo] = useState<any>({
    info: {},
    episodes: {},
    people: []
  })
  const [id, setId] = useState<number>()
  const [hasData, setHasData] = useState<boolean | undefined>(undefined)

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

  const getAnimeStaff = async () => {
    fetchAPI(`https://api.jikan.moe/v4/anime/${id}/staff`)
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
      setHasData(response.data.episodes.length > 0 ? true : false)
      setAnimeInfo({
        ...animeInfo,
        episodes: response.data
      })
    })
    .catch(console.error)
  }


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
      <Modal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        setAnimeInfo={setAnimeInfo} 
        animeInfo={animeInfo} 
        loadIframe={loadIframe} 
        getEpisodes={getAnimeEpisodes}
        hasData={hasData}
        setHasData={setHasData}
        getStaff={getAnimeStaff}
      />
    </div>
  )
}

export default Home
