import React from 'react'
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
const DisplayCard = () => {
  return (
    <div className='displayCard-container'>
      <div className='display-card'>
      <img src={image1} alt="" />
      <h1>GOVERNMENT MUSEUM CHENNAI</h1>
      <p>The proposal for a Museum in Egmore</p>
      </div>
      <div className='display-card'>
      <img src={image2} alt="" />
      <h1>GOVERNMENT MUSEUM CHENNAI</h1>
      <p>The proposal for a Museum in Egmore</p>
      </div>
      <div className='display-card'>
      <img src={image3} alt="" />
      <h1>GOVERNMENT MUSEUM CHENNAI</h1>
      <p>The proposal for a Museum in Egmore</p>
      </div>
    </div>
  )
}

export default DisplayCard
