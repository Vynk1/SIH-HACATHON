import React from 'react'
import HeroSection from '../component/HeroSection'
import AboutUs from '../component/AboutUs'
//import Stats from '../component/Stats'
import TestimonialsSection from '../component/testimonials'
import Team from '../component/OurTeam'

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <AboutUs/>
      {/* <Stats /> */}
      <TestimonialsSection/>
      <Team />
    </>
  )
}

export default LandingPage
