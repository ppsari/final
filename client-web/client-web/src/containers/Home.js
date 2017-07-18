import React from 'react'
import { connect } from 'react-redux'

import MenuBar from '../components/MenuBar'
import MainBanner from '../components/MainBanner'
import MainSearch from '../components/MainSearch'
import CardView from '../components/CardView'
import Footer from '../components/Footer'

import {getRentDataAction,getSellDataAction} from '../actions/index.js'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      propertyRent : [],
      propertySell : []
    }
  }
  render () {
    return (
      <div>
        <MenuBar home />
        <MainBanner />
        <MainSearch />
        <div className="container">
          <h3>For Rent</h3>
          <div className="row">
          {(this.state.propertyRent.length === 0)
          ? <h5>No Result Found</h5>
          : this.state.propertyRent.map((data,index) => {
            return <CardView key={index} data={data} />
          })
        }
          </div>
          <hr/>
          <h3>For Sell</h3>
          <div className="row">
          {(this.state.propertySell.length === 0)
          ? <h5>No Result Found</h5>
          : this.state.propertySell.map((data,index) => {
              return <CardView key={index} data={data} />
          })
        }
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  componentWillMount(){
    this.props.getSell()
    this.props.getRent()
  }

  componentWillReceiveProps(){
    setTimeout(function() {
      this.setState({
        propertyRent : this.props.dataRent,
        propertySell : this.props.dataSell
      })}.bind(this), 10);
    }
  }

const mapStateToProps = (state) => {
  return {
    dataSell: state.propertiesSell,
    dataRent: state.propertiesRent,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    getRent: () => dispatch(getRentDataAction()),
    getSell: () => dispatch(getSellDataAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
