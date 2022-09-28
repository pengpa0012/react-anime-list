import React, { useEffect, useState } from 'react'

type Props = {
  animeInfo: any
  showModal: boolean
  setShowModal: any
  setAnimeInfo: any
  loadIframe: any
  getEpisodes: any
  hasData: boolean | undefined
  setHasData: any
  getStaff: any
}


function Modal({animeInfo, showModal, setShowModal, setAnimeInfo, loadIframe, getEpisodes, hasData, setHasData, getStaff, ...props}: Props) { 
  console.log(animeInfo)
  return (
    <>
      <div className={`modal-cover ${showModal ? "pointer-events-auto overflow-y-scroll" : "pointer-events-none overflow-y-hidden"}`}>
        <div className={`modal ${showModal ? "active" : ""}`}>
          {
            Object.keys(animeInfo?.info).length > 1 ?
            <iframe srcDoc="Loading..." onLoad={(e) => loadIframe(e)} className="w-full" height="400" src={`${animeInfo?.info?.trailer?.embed_url}&autoplay=1&mute=1&showinfo=0&rel=0`}></iframe>
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
                      animeInfo?.info?.genres?.map((item: any, i: number) => (
                        <li className="inline first:ml-2 mr-1 text-sm" key={`genre-${i}`}>{item.name}</li>
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
            <div className="flex justify-between items-center my-4 p-2">
              <h3 className="text-xl">Latest Episodes</h3>
              <button className="py-2 px-4 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed" disabled={animeInfo?.episodes?.episodes?.length > 0 || hasData == false ? true : false} onClick={getEpisodes}>
                Show
              </button>
            </div>
            <div className={`grid grid-cols-1 ${hasData ? "lg:grid-cols-2" : "lg:grid-cols-1"} px-2`}>
             <h1 className={`${hasData || hasData == undefined ? "hidden" : "block"} text-center text-gray-500 `}>NO DATA</h1>
              {
                animeInfo?.episodes?.episodes?.map((ep: any, i: number) => (
                  <div className="p-2 flex flex-1" key={`ep-${i}`}>
                    <img src={ep.images.jpg.image_url || "https://via.placeholder.com/100"} className="mr-4" />
                    <div>
                      <h4 className="text-md">{ep.episode}</h4>
                      <p className="text-sm">{ep.title}</p>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="flex justify-between items-center my-4 p-2">
              <h3 className="text-xl">Staff</h3>
              <button className="py-2 px-4 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed" disabled={animeInfo?.people?.length > 0 ? true : false} onClick={getStaff}>
                Show
              </button>
            </div>
            <div className={`grid grid-cols-1 lg:grid-cols-2 px-2`}>
              {
                animeInfo?.people?.map((ep: any, i: number) => (
                  <div className="p-2 flex flex-1" key={`ep-${i}`}>
                    <img src={ep.person.images.jpg.image_url || "https://via.placeholder.com/100"} className="mr-4 w-16 object-cover" />
                    <div>
                      <h4 className="text-md">{ep.person.name}</h4>
                      {
                        ep.positions.map((pos: any, i: number) => (
                          <p className="text-sm" key={`pos-${i}`}>{pos}</p>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
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
          setHasData(undefined)
        }}></div>
      </div>
    </>
  )
}

export default Modal