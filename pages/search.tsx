import React, { useEffect, useState } from 'react'
import Card from '../src/Components/Card'
import Modal from '../src/Components/Modal'
import Search from '../src/Components/Search'
import { fetchAPI } from '../src/Utilities/Config'

function search() {
  
  const [allAnime, setAllAnime] = useState<Object[]>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [animeInfo, setAnimeInfo] = useState<any>({
    info: {},
    episodes: {},
    people: []
  })
  const [id, setId] = useState<number>()
  
  useEffect(() => {
    queryAllAnime()
  }, [])
  
  const queryAllAnime = () => {
    fetchAPI("https://api.jikan.moe/v4/anime")
    .then(res => {
      console.log(res)
      setAllAnime(res.data)
    })
    .catch(console.error)
  }

  const getAnime = async (id: number) => {
    setId(id)
    setShowModal(true)
    setAnimeInfo({
      info: allAnime?.filter((anime: any) => anime.mal_id == id)[0],
    })
  }
  
  return (
    <div className="container py-20">
      <Search setAllAnime={setAllAnime} queryAllAnime={queryAllAnime} />
      {
        allAnime?.length! > 0 ?
          <div className="list">
            {
              allAnime?.map((anime: any, index: number) => (
                <Card anime={anime} key={index} onClick={() => getAnime(anime.mal_id)}/>
              ))
            }
          </div>
          : <h1 className="text-center text-gray-500 font-bold text-4xl my-20">NO RESULTS FOUND</h1>
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

export default search