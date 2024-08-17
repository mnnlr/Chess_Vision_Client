import React from 'react'
import HeroSection from '../components/home/Herosection'
import Cards from '../components/home/Cards'
import Product from '../components/home/Product'
import Gridimages from '../components/home/Gridimages'

function Home() {
  return (<>
   <HeroSection/>
   <Cards/>
   <Product/>
   <Gridimages/>
</>
  )
}

export default Home