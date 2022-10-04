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
  const [hasEpisodeData, setHasEpisodeData] = useState<boolean | undefined>(undefined)
  const [hasStaffData, setHasStaffData] = useState<boolean | undefined>(undefined)
  
  useEffect(() => {
    if(showModal){
      document.body.style.overflowY = "hidden"
    }else {
      document.body.style.overflowY = "scroll"
    }
  }, [showModal])

  const getAnimeStaff = async () => {
    fetchAPI(`https://api.jikan.moe/v4/anime/${id}/staff`)
    .then(response => {
      setHasStaffData(response.people.length > 0 ? true : false)
      console.log(response)
      setAnimeInfo({
        ...animeInfo,
        people: response.data
      })
    })
    .catch((err) => {
      console.error(err)
      setHasStaffData(false)
    })
  }

  const getAnimeEpisodes = async () => {
    fetchAPI(`https://api.jikan.moe/v4/anime/${id}/videos`)
    .then(response => {
      console.log(response, id)
      setHasEpisodeData(response.data.episodes.length > 0 ? true : false)
      setAnimeInfo({
        ...animeInfo,
        episodes: response.data
      })
    })
    .catch((err) => {
      console.error(err)
      setHasEpisodeData(false)
    })
  }

  const collection = (collection: any, episodes: boolean) => (
    <>
      { episodes ? 
      <h1 className={`${hasEpisodeData || hasEpisodeData == undefined ? "hidden" : "block"} text-center text-gray-500 `}>NO EPISODES DATA</h1> : 
      <h1 className={`${hasStaffData || hasStaffData == undefined ? "hidden" : "block"} text-center text-gray-500 `}>NO STAFF DATA</h1> }
      <div className={`grid grid-cols-1 lg:grid-cols-2 px-2`}>
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
    </>
  )

  console.log(animeInfo)
  return (
    <>
      <div className={`modal-cover ${showModal ? "pointer-events-auto overflow-y-scroll" : "pointer-events-none overflow-y-hidden"}`}>
        <div className={`modal ${showModal ? "active" : ""}`}>
          {
            Object.keys(animeInfo?.info).length > 1 ?
            <iframe className="w-full" height="400" src={`${animeInfo?.info?.trailer?.embed_url}&autoplay=1&mute=1&showinfo=0&rel=0`}></iframe>
            : undefined
          }
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-2xl">{animeInfo?.info?.title_english || animeInfo?.info?.title}</h3>
                <p className="text-sm">{animeInfo?.info?.title || "N/A"}</p>
              </div>
              <button className="border rounded-md py-2 px-4">View Details</button>
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
            {/* <div className="flex justify-between items-center my-4">
              <h3 className="text-xl">Latest Episodes</h3>
              <button className="py-2 px-4 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed" disabled={hasEpisodeData || hasEpisodeData == false} onClick={getAnimeEpisodes}>
                Show
              </button>
            </div>
            {collection(animeInfo?.episodes?.episodes, true)}
            <div className="flex justify-between items-center my-4">
              <h3 className="text-xl">Staff</h3>
              <button className="py-2 px-4 rounded-md border disabled:opacity-50 disabled:cursor-not-allowed" disabled={hasStaffData || hasStaffData == false} onClick={getAnimeStaff}>
                Show
              </button>
            </div>
            {collection(animeInfo?.people, false)} */}
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