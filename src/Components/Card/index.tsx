import React from 'react'

type Props = {
  anime: any
}

import styles from './Card.module.css';

function Card({anime, ...props}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.overlay}></div>
      <div className={styles.details}>
        <h1 className="text-2xl font-semibold mb-4">{anime.title}</h1>
        <p>Score: {anime.score}</p>
        <p>Episodes: {anime.episodes}</p>
        <p>Type: {anime.type}</p>
      </div>
      <img src={anime.images.jpg.image_url}/>
    </div>
  )
}

export default Card