import React from 'react'
import MenuBar from '../components/MenuBar'
import MainBanner from '../components/MainBanner'
import MainSearch from '../components/MainSearch'
import CardView from '../components/CardView'
import Footer from '../components/Footer'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <MenuBar/>
        <MainBanner />
        <MainSearch />
        <div className="container">
          <div className="row">
            <CardView />
            <CardView />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
