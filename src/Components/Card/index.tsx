import React, { HTMLAttributes, useEffect, useState } from 'react'
import { Anime, Character } from '../../Utilities/Types'

type Props = {
  anime: Anime | Character
  home?: boolean
  onClick?: () => void
  className?: string
  details?: React.ReactNode
}


function Card({anime, onClick, home, className, details, ...props}: Props) { 

  return (
    <>
      <div className={`${className} card`} onClick={onClick}>
        <div className="card-overlay"></div>
        <div className="card-details">
          {details}
        </div>
        <img src={anime?.images.jpg.image_url} loading="lazy"/>
      </div>
    </>
  )
}

export default Card