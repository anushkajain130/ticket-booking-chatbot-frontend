import React from 'react'
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import "./carouselCard.css" 
// import image1 from "../assets/elizabeth-george-E_evIcvACS8-unsplash.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import CarouselCard from './carouselCard';
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
const Carousel = () => {
    
  return (
    <div className='carousel-container'>
    <div className='carousel'>
    <Swiper
      grabCursor={true}
      // effect={'creative'}
      // creativeEffect={{
      //   prev: {
      //     shadow: true,
      //     translate: [0, 0, -400],
      //   },
      //   next: {
      //     translate: ['100%', 0, 0],
      //   },
      // }}
      // navigation={true}
      // // pagination={{
      // //   clickable: true,
      // // }}
      slidesPerView={1}
        spaceBetween={30}
        loop={true}
      autoplay={{
        delay: 2500,  
        disableOnInteraction: false,  
      }}
      // fadeEffect={{
      //   crossFade: true,
      // }}
      modules={[Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide><CarouselCard image = {image1}/></SwiperSlide>
      <SwiperSlide><CarouselCard image = {image2}/></SwiperSlide>
      <SwiperSlide><CarouselCard image = {image3}/></SwiperSlide>
      {/* <SwiperSlide><CarouselCard image = {image3}/></SwiperSlide> */}
      
    </Swiper>
    </div>
    </div>
  )
}

export default Carousel;
