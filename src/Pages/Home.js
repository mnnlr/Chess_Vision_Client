import React from 'react'
import HeroSection from '../components/home/Herosection'
import Cards from '../components/home/Cards'
import Product from '../components/home/Product'
import Gridimages from '../components/home/Gridimages'

function Home() {
  return (<>
    <HeroSection />
    <Cards />
    <Product title="Card title" description="Some quick example text to build on the card title and make up the bulk of the card's content." />
    <Gridimages />
  </>
  )
}

export default Home