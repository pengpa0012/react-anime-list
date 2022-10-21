import React, { HTMLAttributes, useEffect, useState } from 'react'
import { Anime } from '../../Utilities/Types'

type Props = {
  anime: Anime
  home?: boolean
  onClick?: () => void
  className?: string
  content?: React.ReactNode
}


function Card({anime, onClick, home, className, ...props}: Props) { 

  return (
    <>
      <div className={`${className} card`} onClick={onClick}>
        <div className="card-overlay"></div>
        <div className="card-details">
          {props.content}
        </div>
        <img src={anime?.images.jpg.image_url} loading="lazy"/>
      </div>
    </>
  )
}

export default Card