import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../src/Utilities/Config'
import { Character } from '../src/Utilities/Types'

function character() {
  const router = useRouter()
  const [character, setCharacter] = useState<Character>()
  
  useEffect(() => {
    fetchAPI(`https://api.jikan.moe/v4/characters/${router.query.id}/full`)
    .then(response => setCharacter(response.data))
    .catch(console.error)
  }, [router.isReady, router.query.id])

  return (
    <div className="container py-10">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 mr-0 lg:mr-10">
          <img src={character?.images?.jpg.image_url} className="w-full rounded-md"/>
        </div>
        <div className="w-full">
          <h2 className="text-3xl mb-4">{character?.name}</h2>
          <ul className="w-full mb-4">
            <li className="my-1">Favorites: {character?.favorites || "N/A"}</li>
            <li className="my-1 flex">
              Nicknames: 
              <ul className="flex flex-wrap items-center gap-1">
                {
                  character?.nicknames.length! > 0 ?
                  character?.nicknames?.map((item: any, i: number) => (
                    <li className="first:ml-2" key={`studio-${i}`}>{item},</li>
                  )) : <li className="ml-2">N/A</li>
                }
              </ul>
            </li>
          </ul>
          <p className="text-sm">{character?.about}</p>
        </div>
      </div>
    </div>
  )
}

export default character