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
  items?: any
  content?: any
}

function Carousel({items, content, ...props}: Props) {
  const router = useRouter()
  const { width } = useWindowSize();
  return (
    <>
      {
        width >= 768 ? 
        <div className="list">
          {
            items?.map((data: any, i: number) => (
              <Card anime={data} onClick={() => router.push(`/profile?id=${data?.mal_id}`)} key={`card-${i}`}/>
            ))
          }
        </div>
        :
        <Swiper
          spaceBetween={10}
          slidesPerView={width <= 1170 ? width <= 700 ? 1 : 3 : 5}
          className="home-slider"
          loop 
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {
            items?.map((producer: any, index: number) => (
              <SwiperSlide key={`card-${index}`} className="flex justify-center pb-12">
                {content(producer)}
              </SwiperSlide>
            ))
          }
        </Swiper>
      }
      
    </>
  )
}

export default Carousel