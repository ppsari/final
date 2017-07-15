import React from 'react'
import { connect } from 'react-redux'

import MenuBar from '../components/MenuBar'
import MainBanner from '../components/MainBanner'
import MainSearch from '../components/MainSearch'
import CardView from '../components/CardView'
import Footer from '../components/Footer'

import {getRentDataAction,getSellDataAction} from '../actions/index.js'

class Home extends React.Component {
  render () {
    let propertyRent = this.props.dataRent
    let propertySell = this.props.dataSell
    return (
      <div>
        <MenuBar/>
        <MainBanner />
        <MainSearch />
        <div className="container">
          <h3>For Rent</h3>
          <div className="row">
            { propertyRent.map((data) => (
              <CardView key={data._id} data={data} />
            ))}
          </div>
          <hr/>
          <h3>For Sell</h3>
          <div className="row">
            { propertySell.map((data) => (
              <CardView key={data._id} data={data} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  componentDidMount(){
    this.props.getRent()
    this.props.getSell()
  }
}




const mapStateToProps = (state) => {
  return {
    dataRent: state.propertiesRent,
    dataSell: state.propertiesSell,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    getRent: () => dispatch(getRentDataAction()),
    getSell: () => dispatch(getSellDataAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
