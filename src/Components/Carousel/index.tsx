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

type Props = {
  items: {
    data: Anime[];
  } | undefined
}

function Carousel({items, ...props}: Props) {
  const router = useRouter()
  const { width } = useWindowSize();
  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={width <= 1170 ? width <= 700 ? 1 : 3 : 5}
        className="home-slider"
        loop 
        pagination
        modules={[Pagination]}
      >
        {
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