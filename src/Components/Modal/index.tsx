import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../../Utilities/Config'
import { Anime } from '../../Utilities/Types'

type Props = {
  animeInfo: Anime | undefined
  showModal: boolean
  setShowModal: any
  setAnimeInfo: any
  id: number | undefined
}


function Modal({animeInfo, showModal, setShowModal, setAnimeInfo, id, ...props}: Props){ 
  const router = useRouter()
  
  useEffect(() => {
    if(showModal){
      document.body.style.overflowY = "hidden"
    }else {
      document.body.style.overflowY = "scroll"
    }
  }, [showModal])

  console.log(animeInfo)

  return (
    <>
      <div className={`modal-cover ${showModal ? "pointer-events-auto overflow-y-scroll" : "pointer-events-none overflow-y-hidden"}`}>
        <div className={`modal ${showModal ? "active" : ""}`}>
          {
            animeInfo?.trailer?.embed_url ? 
            <iframe className="w-full" height="400" src={`${animeInfo?.trailer?.embed_url}&autoplay=1&mute=1&showinfo=0&rel=0`}></iframe>
            : <h2 className="text-5xl text-center text-gray-500 py-20">NO TRAILER DATA</h2>
          }
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl">{animeInfo?.title_english || animeInfo?.title}</h3>
                <p className="text-sm">{animeInfo?.title || "N/A"}</p>
              </div>
              <button className="border rounded-md py-2 px-4" onClick={() => {
                document.body.style.overflowY = "scroll"
                router.push(`/anime?id=${animeInfo?.mal_id}`)
                }}>View Details</button>
            </div>
            <div className="flex flex-col sm:flex-row my-4 text-sm">
              <ul className="w-full">
                <li className="my-1">Episodes: {animeInfo?.episodes || "N/A"}</li>
                <li className="my-1">Type: {animeInfo?.type || "N/A"}</li>
                <li className="my-1">Aired: {animeInfo?.aired?.string || "N/A"}</li>
                <li className="my-1">Popularity: {animeInfo?.popularity || "N/A"}</li>
                <li className="my-1">Season: {animeInfo?.season || "N/A"}</li>
                <li className="my-1">Status: {animeInfo?.status || "N/A"}</li>
              </ul>
              <ul className="w-full">
                <li className="my-1 flex">
                  Studios: 
                  <ul className="flex flex-wrap items-center gap-1">
                    {
                      animeInfo?.studios?.map((item: any, i: number) => (
                        <li className="first:ml-2" key={`studio-${i}`}>{item.name}</li>
                      )) || "N/A"
                    }
                  </ul>
                </li>
                <li className="my-1">Rating: {animeInfo?.rating || "N/A"}</li>
                <li className="my-1">Year: {animeInfo?.year || "N/A"}</li>
                <li className="my-1">Score: {animeInfo?.score || "N/A"}</li>
                <li className="my-1">Source: {animeInfo?.source || "N/A"}</li>
                <li className="my-1 flex">
                  Genres:
                  <ul className="flex flex-wrap items-center gap-1">
                    {
                      animeInfo?.genres?.map((item: any, i: number) => (
                        <li className="first:ml-2 text-xs" key={`genre-${i}`}>{item.name}</li>
                      )) || "N/A"
                    }
                  </ul>
                </li>
              </ul>
            </div>
            <div className="my-2">
              <h3 className="text-xl mb-2">Synopsis</h3>
              <p className="text-sm text-gray-600 leading-snug">{animeInfo?.synopsis}</p>
            </div>
          </div>
        </div>
        <div className={`overlay ${showModal ? "active" : ""}`} onClick={() => {
          setShowModal(false)
          setAnimeInfo({})
        }}></div>
         {/* style={{backgroundImage: `url(${animeInfo?.trailer?.images?.maximum_image_url})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}} */}
      </div>
    </>
  )
}

export default Modal