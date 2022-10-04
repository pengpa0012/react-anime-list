import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Card from '../src/Components/Card'
import Modal from '../src/Components/Modal'
import Search from '../src/Components/Search'
import { fetchAPI } from '../src/Utilities/Config'

function search() {
  const router = useRouter()
  const [allAnime, setAllAnime] = useState<Object[]>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [animeInfo, setAnimeInfo] = useState<any>({
    info: {},
    episodes: {},
    people: []
  })
  const [id, setId] = useState<number>()
  
  useEffect(() => {
    (router.query.q == "all" ? fetchAPI("https://api.jikan.moe/v4/anime") : fetchAPI(`https://api.jikan.moe/v4/anime?q=${router.query.q}&sfw`))
    .then(res => {
      console.log(res)
      setAllAnime(res.data)
    })
    .catch(console.error)
  }, [router.query])



  const getAnime = async (id: number) => {
    setId(id)
    setShowModal(true)
    setAnimeInfo({
      info: allAnime?.filter((anime: any) => anime.mal_id == id)[0],
    })
  }

  console.log(allAnime)
  
  return (
    <div className="container py-20">
      <div className="list">
        {
          allAnime?.length! > 0 ?
          allAnime?.map((anime: any, index: number) => (
            <Card anime={anime} key={index} onClick={() => getAnime(anime.mal_id)}/>
          ))
          : <h1>Loading</h1>
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

export default search