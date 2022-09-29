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

  useEffect(() => {
    fetchAPI("https://api.jikan.moe/v4/anime")
    .then(res => {
      setAllAnime(res.data)
    })
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

  console.log(allAnime)

  return (
    <div className="container list py-20 px-6">
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
        id={id}
      />
    </div>
  )
}

export default Home
