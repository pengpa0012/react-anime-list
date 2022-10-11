import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Card from '../src/Components/Card'
import { fetchAPI, handleImgError } from '../src/Utilities/Config'
import { Anime } from '../src/Utilities/Types'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { useWindowSize } from 'react-use'
import Carousel from '../src/Components/Carousel'

const Home: NextPage = () => {
  const router = useRouter()
  const [animeTop, setAnimeTop] = useState<Anime>()
  const [seasonAnime, setSeasonAnime] = useState<{
    data: Anime[]
  }>()
  const [producers, setProducers] = useState<object[]>()

  useEffect(() => {
    Promise.all([
      fetchAPI("https://api.jikan.moe/v4/anime/5114"),
      fetchAPI("https://api.jikan.moe/v4/seasons/now"),
      fetchAPI("https://api.jikan.moe/v4/producers")
    ])
    .then(([topAnime, seasonAnime, producers]) => {
      setProducers(producers.data)
      setAnimeTop(topAnime.data)
      setSeasonAnime(seasonAnime)
    })
    .catch(console.error)

    
  }, [])

  
  return (
    <div className="container py-10">
      <div className="mb-20">
        <h1 className="text-4xl mb-6 px-2">Top Anime</h1>
        <div className="flex flex-col lg:flex-row px-2">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0 mr-0 lg:mr-10">
            <img src={animeTop?.images?.jpg.large_image_url} className="w-full rounded-md"/>
          </div>
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-3xl mb-4">{animeTop?.title_english || animeTop?.title}</h2>
              <div className="mb-2">
                <h4 className="text-lg font-semibold">Genres</h4>
                <ul className="flex gap-4">
                  {
                    animeTop?.genres.map((genre: any, i: number) => (
                      <li key={`genre-${i}`}>{genre.name}</li>
                    ))  
                  }   
                </ul>
              </div>
              <div className="mb-2">
                <h4 className="text-lg font-semibold">Producers</h4>
                <ul className="flex flex-wrap gap-4">
                  {
                    animeTop?.producers.map((producer: any, i: number) => (
                      <li key={`producer-${i}`}>{producer.name}</li>
                    ))  
                  }   
                </ul>
              </div>
              <p className="text-md text-gray-500 leading-snug my-6">{animeTop?.synopsis}</p>
              <button className="border rounded-md py-2 px-4" onClick={() => router.push(`/profile?id=${animeTop?.mal_id}`)}>View Details</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-20">
        <h2 className="text-center lg:text-left text-3xl mb-12 px-2">Seasonal Animes</h2>
        <Carousel items={seasonAnime?.data} content={(content: any) => (
          <Card anime={content} onClick={() => router.push(`/profile?id=${content?.mal_id}`)}/>
        )}  />
      </div>
      <div className="mb-20 container">
        <h2 className="text-center lg:text-left text-3xl mb-12 px-2">Anime Studios</h2>
        <Carousel items={producers} content={(content: any) => (
          <div className="card">
            <div className="card-overlay"></div>
            <div className="card-details">
              <h1 className="text-2xl font-semibold mb-4">{content.titles[0].title}</h1>
              <p>Favorites: {content.favorites || "N/A"}</p>
            </div>
            <img src={content.images.jpg.image_url} onError={handleImgError} loading="lazy"/>
          </div>
        )} />
      </div>
    </div>
  )
}

export default Home