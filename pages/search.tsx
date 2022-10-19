import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Card from '../src/Components/Card'
import Modal from '../src/Components/Modal'
import Search from '../src/Components/Search'
import { fetchAPI } from '../src/Utilities/Config'
import { Anime } from '../src/Utilities/Types'

function search() {
  const router = useRouter()
  const [allAnime, setAllAnime] = useState<Anime[]>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [animeInfo, setAnimeInfo] = useState<Anime>()
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
    if(router.isReady) {
      fetchAPI(`https://api.jikan.moe/v4/anime?q=${router.query.q == "undefined" ? "" : router.query.q}&sfw&page=${router.query.page || 1}`)
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
  }, [router.isReady, router.query])


  const getAnime = async (id: number) => {
    setId(id)
    setShowModal(true)
    setAnimeInfo(allAnime?.filter((anime: any) => anime.mal_id == id)[0])
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
        nextLabel={
          <svg width="15" height="15" viewBox="0 0 73 108" fill="none">
          <path d="M16.4958 16.3464L56.7043 54.0167L16.4958 91.6878" stroke="#8B8B8B" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
        onPageChange={(e: { selected: number }) => {
          setCurrentPage(e.selected + 1)
          router.push(`/search?q=${router.query.q}&page=${e.selected + 1}`)
        }}
        pageRangeDisplayed={10}
        forcePage={currentPage - 1}
        pageCount={animeCount.perPage}
        previousLabel={
          <svg width="15" height="15" viewBox="0 0 73 108" fill="none">
          <path d="M56.7043 91.6877L16.4958 54.0175L56.7043 16.3464" stroke="#8B8B8B" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
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