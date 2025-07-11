import React from 'react'
import Hero from '../Components/Hero'
import CarCard from '../Components/CarCard'
import Featuredsection from '../Components/Featuredsection'
import Burner from '../Components/Burner'
import Testimonial from '../Components/Testimonial'
import Newsletter from '../Components/Newsletter'

const Home = () => {
  return (
    <>
        <Hero />
        <Featuredsection />
        <Burner />
        <Testimonial />
        <Newsletter />
    </>
  )
}

export default Home