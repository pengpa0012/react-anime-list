import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Card from '../src/Components/Card'
import { fetchAPI, handleImgError } from '../src/Utilities/Config'
import { Anime, Character } from '../src/Utilities/Types'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { useWindowSize } from 'react-use'
import Carousel from '../src/Components/Carousel'

const Home: NextPage = () => {
  const router = useRouter()
  const [seasonAnime, setSeasonAnime] = useState<{
    data: Anime[]
  }>()
  const [characters, setCharacters] = useState<object[]>()
  const { width } = useWindowSize();

  useEffect(() => {
    Promise.all([
      fetchAPI("https://api.jikan.moe/v4/seasons/now"),
      fetchAPI("https://api.jikan.moe/v4/characters?order_by=favorites&sort=desc")
    ])
    .then(([seasonAnime, characters]) => {
      setCharacters(characters.data)
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
            <img src="https://cdn.myanimelist.net/images/anime/1223/96541l.jpg" className="w-full rounded-md"/>
          </div>
          <div className="w-full">
            <div className="mb-6">
              <h2 className="text-3xl mb-4">Fullmetal Alchemist: Brotherhood</h2>
              <div className="mb-2">
                <h4 className="text-lg font-semibold">Genres</h4>
                <ul className="flex gap-4">
                  <li>Action</li>
                  <li>Adventure</li>
                  <li>Drama</li>
                  <li>Fantasy</li>
                </ul>
              </div>
              <div className="mb-2">
                <h4 className="text-lg font-semibold">Producers</h4>
                <ul className="flex flex-wrap gap-4">
                  <li>Aniplex</li>
                  <li>Square Enix</li>
                  <li>Mainichi Broadcasting System</li>
                  <li>Studio Moriken</li>
                </ul>
              </div>
              <p className="text-md text-gray-500 leading-snug my-6">
                After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life. Instead, they suffered brutal personal loss: Alphonse's body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse's soul in the physical realm by binding it to a hulking suit of armor. The brothers are rescued by their neighbor Pinako Rockbell and her granddaughter Winry. Known as a bio-mechanical engineering prodigy, Winry creates prosthetic limbs for Edward by utilizing "automail," a tough, versatile metal used in robots and combat armor. After years of training, the Elric brothers set off on a quest to restore their bodies by locating the Philosopher's Stone—a powerful gem that allows an alchemist to defy the traditional laws of Equivalent Exchange. As Edward becomes an infamous alchemist and gains the nickname "Fullmetal," the boys' journey embroils them in a growing conspiracy that threatens the fate of the world. [Written by MAL Rewrite]
              </p>
              <button className="border rounded-md py-2 px-4" onClick={() => router.push(`/profile?id=5114`)}>View Details</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-20">
        <h2 className="text-center lg:text-left text-3xl mb-12 px-2">Seasonal Animes</h2>
        <Carousel items={seasonAnime?.data} content={(content: Anime) => (
          <Card details={
            <>
              <h1 className="text-2xl font-semibold mb-4">{content?.title}</h1>
              <p>Score: {content?.score || "N/A"}</p>
              <p>Episodes: {content?.episodes || "N/A"}</p>
              <p>Type: {content?.type || "N/A"}</p>
            </>
          } anime={content} onClick={() => router.push(`/profile?id=${content?.mal_id}`)}/>
        )} />
      </div>
      <div className="mb-20">
        <h2 className="text-center lg:text-left text-3xl mb-12 px-2">Top Characters</h2>
        <Carousel items={characters} content={(content: Character) => (
          <Card details={
            <>
              <h1 className="text-2xl font-semibold mb-4">{content?.name}</h1>
              <p>Favorites: {content?.favorites || "N/A"}</p>
            </>
            } anime={content} onClick={() => console.log("test")}/>
        )} />
      </div>
    </div>
  )
}

export default Home