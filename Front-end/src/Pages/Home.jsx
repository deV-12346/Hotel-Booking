import React from 'react'
import Hero from "../Components/Hero"
import FeaturedDestination from '../Components/FeaturedDestination'
import { ExclusiveOffers } from '../Components/ExclusiveOffers'
import Testimonial from '../Components/Testimonial'
import NewsLetter from "../Components/NewsLetter"
import Recommeneded from '../Components/Recommended'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Recommeneded/>
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonial />
      <NewsLetter />
    </div>
  )
}

export default Home