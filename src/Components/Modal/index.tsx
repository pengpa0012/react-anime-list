import React, { useEffect, useState } from 'react'

type Props = {
  animeInfo: any
  showModal: boolean
  setShowModal: any
  setAnimeInfo: any
  loadIframe: any
  getEpisodes: any
}


function Modal({animeInfo, showModal, setShowModal, setAnimeInfo, loadIframe, getEpisodes, ...props}: Props) { 
  console.log(animeInfo)
  return (
    <>
      <div className={`modal-cover ${showModal ? "pointer-events-auto overflow-y-scroll" : "pointer-events-none overflow-y-hidden"}`}>

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
            <div className="flex justify-between my-4">
              <h3 className="text-xl">Episodes</h3>
              <button className="py-2 px-4 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed" disabled={animeInfo?.episodes?.episodes?.length > 0 ? true : false} onClick={getEpisodes}>
                Show
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {
                animeInfo?.episodes?.episodes?.length > 0 ?
                  animeInfo?.episodes?.episodes?.map((ep: any, i: number) => (
                    <div className="p-2 flex flex-1" key={`ep-${i}`}>
                      <img src={ep.images.jpg.image_url || "https://via.placeholder.com/100"} className="mr-4" />
                      <div>
                        <h4 className="text-md">{ep.episode}</h4>
                        <p className="text-sm">{ep.title}</p>
                      </div>
                    </div>
                  ))
                : <h1 className="text-xl">No Data</h1>
              }
            </div>
          </div>
        </div>
        <div className={`overlay ${showModal ? "active" : ""}`} onClick={() => {
          setShowModal(false)
          setAnimeInfo({
            info: {},
            episodes: {},
            people: {}
          })
        }}></div>
      </div>
    </>
  )
}

export default Modal