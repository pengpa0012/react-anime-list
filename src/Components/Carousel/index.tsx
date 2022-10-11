import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { useWindowSize } from 'react-use'
import { useRouter } from 'next/router';
import { Anime } from '../../Utilities/Types';
import Card from '../Card';
// import required modules
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css/pagination";
import { handleImgError } from '../../Utilities/Config';

type Props = {
  items?: {
    data: Anime[];
  } | undefined
  customData?: object[]
}

function Carousel({items, customData, ...props}: Props) {
  const router = useRouter()
  const { width } = useWindowSize();
  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={width <= 1170 ? width <= 700 ? 1 : 3 : 5}
        className="home-slider"
        loop 
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {
          customData ?
          customData?.map((producer: any, index: number) => (
            <SwiperSlide key={index} className="flex justify-center pb-12">
              <div className="card">
                <div className="card-overlay"></div>
                <div className="card-details">
                  <h1 className="text-2xl font-semibold mb-4">{producer.titles[0].title}</h1>
                  <p>Favorites: {producer.favorites || "N/A"}</p>
                </div>
                <img src={producer.images.jpg.image_url} onError={handleImgError} loading="lazy"/>
              </div>
            </SwiperSlide>
          ))
          :
          items?.data.map((anime: any, index: number) => (
            <SwiperSlide key={index} className="flex justify-center pb-12">
              <Card anime={anime} onClick={() => router.push(`/profile?id=${anime?.mal_id}`)}/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  )
}

export default Carousel