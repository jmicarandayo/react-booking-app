import React from 'react'
import Featured from '../../components/featured/Featured'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import PropertyFeatured from '../../components/propertyFeatured/PropertyFeatured'
import PropertyList from '../../components/propertyList/PropertyList'

import './home.css'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="home-container">
          <h1 className='home-title'>Browse by property type</h1>
          <PropertyList/>
          <Featured/>
          <h1 className='home-title'>Homes guests love</h1>
          <PropertyFeatured/>
        </div>
        <MailList/>
        <Footer/>
    </div>
  )
}

export default Home