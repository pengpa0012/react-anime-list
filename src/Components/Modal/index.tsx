import React, { useEffect, useState } from 'react'

type Props = {
  animeInfo: any
  showModal: boolean
  setShowModal: any
  setAnimeInfo: any
  loadIframe: any
}


function Modal({animeInfo, showModal, setShowModal, setAnimeInfo, loadIframe, ...props}: Props) { 
  console.log(animeInfo)
  return (
    <>
      <div className={`modal-cover ${showModal ? "pointer-events-auto overflow-y-scroll" : "pointer-events-none overflow-y-hidden"}`} onClick={() => {
        setShowModal(false)
        setAnimeInfo({
          info: {},
          episodes: {},
          people: {}
        })
      }}>

        <div className={`modal ${showModal ? "active" : ""}`}>
          {
            Object.keys(animeInfo?.info).length > 1 ?
            <iframe srcDoc="Loading..." onLoad={(e) => loadIframe(e)} className="w-full pointer-events-none" height="400" src={`${animeInfo?.info?.trailer?.embed_url}&autoplay=1&mute=1&controls=0&showinfo=0&rel=0`}></iframe>
            : undefined
          }
          <div className="p-6">
            <div className="flex">
              <ul className="w-1/2">
                <li className="my-1">Title: {animeInfo?.info?.title}</li>
                <li className="my-1">Episodes: {animeInfo?.info?.episodes}</li>
                <li className="my-1 flex">
                  Genres: 
                  <ul>
                    {
                      animeInfo?.info?.genres?.map((item: any) => (
                        <li className="inline first:ml-2 mr-1 text-sm">{item.name}</li>
                      ))
                    }
                  </ul>
                </li>
              </ul>
              <ul className="w-1/2">
                <li className="my-1">Type: {animeInfo?.info?.type}</li>
                <li className="my-1">Score: {animeInfo?.info?.score}</li>
                <li className="my-1">Source: {animeInfo?.info?.source}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={`overlay ${showModal ? "active" : ""}`}></div>
    </>
  )
}

export default Modal