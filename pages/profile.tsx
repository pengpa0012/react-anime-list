import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../src/Utilities/Config'
import { Anime } from '../src/Utilities/Types'

function profile() {
  const router = useRouter()
  const [animeProfile, setAnimeProfile] = useState<Anime>()

  useEffect(() => {
    if(!router.isReady) return;
    fetchAPI(`https://api.jikan.moe/v4/anime/${router.query.id}`)
    .then(res => {
      console.log(res)
      setAnimeProfile(res.data)
    })
    .catch(console.error)
  }, [router.isReady])

  console.log(router)
  
  return (
    <div className="container">
      <h1 className="text-6xl">{animeProfile?.title}</h1>
    </div>
  )
}

export default profile