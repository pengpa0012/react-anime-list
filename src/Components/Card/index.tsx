import React, { useEffect, useState } from 'react'
import { Anime } from '../../Utilities/Types'

type Props = {
  anime: Anime
  home?: boolean
  onClick?: () => void
}


function Card({anime, onClick, home, ...props}: Props) { 

  return (
    <>
      <div className="card" onClick={onClick}>
        <div className="card-overlay"></div>
        <div className="card-details">
          <h1 className="text-2xl font-semibold mb-4">{anime.title}</h1>
          <p>Score: {anime.score || "N/A"}</p>
          <p>Episodes: {anime.episodes || "N/A"}</p>
          <p>Type: {anime.type || "N/A"}</p>
        </div>
        <img src={anime.images.jpg.image_url}/>
      </div>
    </>
  )
}

export default Card