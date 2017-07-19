import React from 'react'
import { connect } from 'react-redux'

import MenuBar from '../components/MenuBar'
import MainBanner from '../components/MainBanner'
import MainSearch from '../components/MainSearch'
import CardView from '../components/CardView'
import Footer from '../components/Footer'
import TitleSection from '../components/TitleSection'

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
          <TitleSection lightTitle="PROPERTY" boldTitle="FOR RENT" />
          <div className="row">
          {(this.state.propertyRent.length === 0)
          ? (<div className="no-data">
            <h5>No Data</h5>
          </div>)
          : this.state.propertyRent.map((data,index) => {
            return <CardView key={index} data={data} />
          })
        }
          </div>
          <hr/>
          <TitleSection lightTitle="PROPERTY" boldTitle="FOR SELL" />
          <div className="row">
          {(this.state.propertySell.length === 0)
          ? (<div className="no-data">
            <h5>No Data</h5>
          </div>)
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
      console.log(this.props.dataRent);
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
