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


function Modal({animeInfo, showModal, setShowModal, setAnimeInfo, loadIframe, getEpisodes, hasData, setHasData, getStaff, ...props}: Props){ 

  const collection = (collection: any, episodes: boolean) => (
    <div className={`grid grid-cols-1 lg:grid-cols-2 px-2`}>
      { episodes ? <h1 className={`${hasData || hasData == undefined ? "hidden" : "block"} text-center text-gray-500 `}>NO DATA</h1> : undefined }
      {
        collection?.map((item: any, i: number) => (
          <div className="p-2 flex flex-1" key={`ep-${i}`}>
            <img loading="lazy" alt="STAFF IMG" src={(episodes ? item.images.jpg.image_url : item.person.images.jpg.image_url) || "https://via.placeholder.com/100"} className={`mr-4 ${episodes ? "" : "w-16"} object-cover`} style={episodes ? { maxWidth: 200, maxHeight: 150 } : { maxHeight: 96 }} />
            <div>
              <h4 className="text-md">{episodes ? item.episode : item.person.name}</h4>
              {
                episodes ? <p className="text-sm">{item.title}</p> : 
                item.positions.map((pos: any, i: number) => (
                  <p className="text-xs" key={`pos-${i}`}>{pos}</p>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )

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
            <h3 className="text-2xl mb-2">{animeInfo?.info?.title}</h3>
            <div className="flex">
              <ul className="w-1/2">
                <li className="my-1">Episodes: {animeInfo?.info?.episodes || "N/A"}</li>
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
                <li className="my-1">Type: {animeInfo?.info?.type}</li>
              </ul>
              <ul className="w-1/2">
                <li className="my-1">Score: {animeInfo?.info?.score}</li>
                <li className="my-1">Source: {animeInfo?.info?.source}</li>
              </ul>
            </div>
            <div className="my-2">
              <h3 className="text-xl mb-2">Synopsis</h3>
              <p className="text-sm text-gray-600 leading-snug">{animeInfo?.info?.synopsis}</p>
            </div>
            <div className="flex justify-between items-center my-4">
              <h3 className="text-xl">Latest Episodes</h3>
              <button className="py-2 px-4 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed" disabled={animeInfo?.episodes?.episodes?.length > 0 || hasData == false ? true : false} onClick={getEpisodes}>
                Show
              </button>
            </div>
            {collection(animeInfo?.episodes?.episodes, true)}
            <div className="flex justify-between items-center my-4">
              <h3 className="text-xl">Staff</h3>
              <button className="py-2 px-4 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed" disabled={animeInfo?.people?.length > 0 ? true : false} onClick={getStaff}>
                Show
              </button>
            </div>
            {collection(animeInfo?.people, false)}
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