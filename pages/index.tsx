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
  const [searchText, setSearchText] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  
  const queryAllAnime = () => {
    fetchAPI("https://api.jikan.moe/v4/anime")
    .then(res => {
      setAllAnime(res.data)
    })
    .catch(console.error)
  }

  useEffect(() => {
    queryAllAnime()
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

  const onSearchAnime = () => {
    if(!searchText) return queryAllAnime()
    setLoading(true)
    fetchAPI(`https://api.jikan.moe/v4/anime?q=${searchText}&sfw`)
    .then(res => {
      setAllAnime(res.data)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
    .catch(console.error)
  }

  return (
    <div className="container py-20">
      <div className="mb-12">
        <div className="flex">
          <input type="text" placeholder="Search" className="border rounded-tl-md rounded-bl-md p-2 focus:outline-blue-500" onChange={(e) => setSearchText(e.target.value)} />
          <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded-tr-md rounded-br-md -ml-1" onClick={() => onSearchAnime()}>Search</button>
        </div>
      </div>
      <div className="list">
        {
          allAnime?.map((anime: any, index: number) => (
            <Card anime={anime} key={index} onClick={() => getAnime(anime.mal_id)}/>
          ))
        }
      </div>
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
