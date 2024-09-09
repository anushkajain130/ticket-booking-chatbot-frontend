import React from 'react'
// import image1 from "../assets/elizabeth-george-E_evIcvACS8-unsplash.jpg"
import "./carouselCard.css"
const CarouselCard = ({image}) => {
  return (
    <div className='carousel-card'>
      <img src={image} alt="" />
      <h1>GOVERNMENT MUSEUM CHENNAI</h1>
      <p>The proposal for a Museum in Egmore</p>
      <button>EXPLORE MORE</button>
    </div> 
  )
}

export default CarouselCard
