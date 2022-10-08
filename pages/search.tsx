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
  const [animeCount, setanimeCount] = useState<{
    total: number
    perPage: number
  }>({
    total: 0,
    perPage: 0
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(0)
  
  useEffect(() => {
    setLoading(true)
    searchAnime()
  }, [router.isReady, router.query.q, router.query.page])

  const searchAnime = async () => {
      fetchAPI(`https://api.jikan.moe/v4/anime?q=${router.query.q ? router.query.q : ""}&sfw&page=${router.query.page ? router.query.page : 1}`)
      .then(res => {
        console.log(res)
        setCurrentPage(res?.pagination?.current_page)
        setanimeCount({total: res?.pagination?.items?.total, perPage: res?.pagination?.last_visible_page})
        setAllAnime(res?.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
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
      {
        loading ? <h2 className={`${loading ? "block" : "hidden"} text-5xl text-center text-gray-500 py-20`}>LOADING...</h2>
        : 
        <div className="list">
          {
            allAnime?.map((anime: any, index: number) => (
              <Card anime={anime} key={index} onClick={() => getAnime(anime.mal_id)}/>
            ))
          }
        </div>
      }
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e: { selected: number }) => {
          console.log(e.selected + 1)
          router.push(`/search?q=${router.query.q}&page=${e.selected + 1}`)
        }}
        pageRangeDisplayed={10}
        initialPage={currentPage}
        pageCount={animeCount.perPage}
        previousLabel="<"
        className={`${animeCount.total >= 25 ? "flex" : "hidden"} pagination`}
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