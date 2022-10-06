import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../../Utilities/Config'
import { Anime } from '../../Utilities/Types'

type Props = {
  animeInfo: {
    info: Anime
    episodes: any
    people: any
  }
  showModal: boolean
  setShowModal: any
  setAnimeInfo: any
  id: number | undefined
}


function Modal({animeInfo, showModal, setShowModal, setAnimeInfo, id, ...props}: Props){ 
  const router = useRouter()
  const [hasEpisodeData, setHasEpisodeData] = useState<boolean | undefined>(undefined)
  const [hasStaffData, setHasStaffData] = useState<boolean | undefined>(undefined)
  
  useEffect(() => {
    if(showModal){
      document.body.style.overflowY = "hidden"
    }else {
      document.body.style.overflowY = "scroll"
    }
  }, [showModal])

  return (
    <>
      <div className={`modal-cover ${showModal ? "pointer-events-auto overflow-y-scroll" : "pointer-events-none overflow-y-hidden"}`}>
        <div className={`modal ${showModal ? "active" : ""}`}>
          {
            animeInfo?.info?.trailer?.embed_url ? 
            <iframe className="w-full" height="400" src={`${animeInfo?.info?.trailer?.embed_url}&autoplay=1&mute=1&showinfo=0&rel=0`}></iframe>
            : <h2 className="text-5xl text-center text-gray-500 py-20">NO TRAILER DATA</h2>
          }
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl">{animeInfo?.info?.title_english || animeInfo?.info?.title}</h3>
                <p className="text-sm">{animeInfo?.info?.title || "N/A"}</p>
              </div>
              <button className="border rounded-md py-2 px-4" onClick={() => {
                document.body.style.overflowY = "scroll"
                router.push(`/profile?id=${animeInfo?.info?.mal_id}`)
                }}>View Details</button>
            </div>
            <div className="flex my-4 text-sm">
              <ul className="w-full">
                <li className="my-1">Episodes: {animeInfo?.info?.episodes || "N/A"}</li>
                <li className="my-1">Type: {animeInfo?.info?.type || "N/A"}</li>
                <li className="my-1">Aired: {animeInfo?.info?.aired?.string || "N/A"}</li>
                <li className="my-1">Popularity: {animeInfo?.info?.popularity || "N/A"}</li>
                <li className="my-1">Season: {animeInfo?.info?.season || "N/A"}</li>
                <li className="my-1">Status: {animeInfo?.info?.status || "N/A"}</li>
              </ul>
              <ul className="w-full">
                <li className="my-1 flex">
                  Studios: 
                  <ul className="flex flex-wrap items-center gap-1">
                    {
                      animeInfo?.info?.studios?.map((item: any, i: number) => (
                        <li className="first:ml-2" key={`studio-${i}`}>{item.name}</li>
                      )) || "N/A"
                    }
                  </ul>
                </li>
                <li className="my-1">Rating: {animeInfo?.info?.rating || "N/A"}</li>
                <li className="my-1">Year: {animeInfo?.info?.year || "N/A"}</li>
                <li className="my-1">Score: {animeInfo?.info?.score || "N/A"}</li>
                <li className="my-1">Source: {animeInfo?.info?.source || "N/A"}</li>
                <li className="my-1 flex">
                  Genres:
                  <ul className="flex flex-wrap items-center gap-1">
                    {
                      animeInfo?.info?.genres?.map((item: any, i: number) => (
                        <li className="first:ml-2 text-xs" key={`genre-${i}`}>{item.name}</li>
                      )) || "N/A"
                    }
                  </ul>
                </li>
              </ul>
            </div>
            <div className="my-2">
              <h3 className="text-xl mb-2">Synopsis</h3>
              <p className="text-sm text-gray-600 leading-snug">{animeInfo?.info?.synopsis}</p>
            </div>
          </div>
        </div>
        <div className={`overlay ${showModal ? "active" : ""}`} onClick={() => {
          setShowModal(false)
          setAnimeInfo({
            info: {},
            episodes: {},
            people: []
          })
          setHasEpisodeData(undefined)
          setHasStaffData(undefined)
        }}></div>
      </div>
    </>
  )
}

export default Modal