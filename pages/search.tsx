import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
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
  const [totalAnime, setTotalAnime] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  
  useEffect(() => {
    searchAnime(router.query.page ? router.query.page : router.asPath.split("=")[2])
  }, [router.pathname, router.query])

  const searchAnime = (page: any) => {
    setLoading(true)
    fetchAPI(`https://api.jikan.moe/v4/anime?q=${router.query.q ? router.query.q : ""}&sfw&page=${page}`)
    .then(res => {
      console.log(res)
      setLoading(false)
      setTotalAnime(res.pagination.last_visible_page)
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
      <div className="list">
        {
          loading ? <h2 className={`${loading ? "block" : "hidden"} text-5xl text-center text-gray-500 py-20`}>LOADING...</h2>
          :
          allAnime?.length! > 0 ?
          allAnime?.map((anime: any, index: number) => (
            <Card anime={anime} key={index} onClick={() => getAnime(anime.mal_id)}/>
          ))
          : <h2 className="text-5xl text-center text-gray-500 py-20">NO DATA</h2>
        }
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e: { selected: number }) => {
          router.push(`/search?q=${router.query.q}&page=${e.selected + 1}`)
          setCurrentPage(e.selected + 1)
        }}
        pageRangeDisplayed={5}
        pageCount={totalAnime}
        previousLabel="<"
        className="flex gap-10 justify-center my-20"
      />
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