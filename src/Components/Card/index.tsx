import React, { useEffect, useState } from 'react'

type Props = {
  anime: any,
  onClick: () => void
}


function Card({anime, onClick, ...props}: Props) { 

  return (
    <>
      <div className="card" onClick={onClick}>
        <div className="card-overlay"></div>
        <div className="card-details">
          <h1 className="text-2xl font-semibold mb-4">{anime.title}</h1>
          <p>Score: {anime.score}</p>
          <p>Episodes: {anime.episodes}</p>
          <p>Type: {anime.type}</p>
        </div>
        <img src={anime.images.jpg.image_url}/>
      </div>
    </>
  )
}

export default Card