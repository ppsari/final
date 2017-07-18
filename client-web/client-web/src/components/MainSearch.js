import React from 'react';
import { connect } from 'react-redux'
import { Form } from 'reactstrap';
import countries from 'countries-cities'
import { Link } from 'react-router-dom';
import $ from 'jquery';

import './MainSearch.css'
import { searchProperty } from '../actions/index.js'
import {getRentDataAction,getSellDataAction} from '../actions/index.js'

require('dotenv').config()

class MainSearch extends React.Component {
  constructor(props){
    super(props)
    this.state={
      cities: [],
      propertyRent: [],
      propertySell: [],
    }
  }

  render() {
    return (
      <div className="container MainSearch">
        <Form className="row style-three search-form">
          <div className="col-md-8 offset-md-2 relative">
            <div className="input-group">
              <div className="input-group-addon"><span className="text-white lnr lnr-magnifier"></span></div>
              <input
                type="text"
                className="form-control"
                placeholder="Find a Property that you want"
                ref="search"
                onChange={(e)=> {
                  if(e.target.value === ""){
                    $(".search-result-panel").removeClass("active")
                  } else {
                    $(".search-result-panel").addClass("active")
                  }
                  this.searchProp()
                }}/>
              <select onChange={()=> this.searchProp()} ref="city" className="form-control">
                <option selected="selected" disabled >Select City</option>
                {this.state.cities.map((city,index)=>{
                    return <option key ={index} value={city}>{city}</option>
                })}
              </select>
              <div className="input-group-addon select-caret"><span className="text-white lnr lnr-chevron-down"></span></div>
            </div>
            <div className="search-result-panel">
              { this.state.isSearch
                ? (<div className="row">
                      <div className="col-12">
                        <h5>Loading..</h5>
                      </div>
                  </div>)
              : (<div className="shadow bg-white">
                  <div className="row">
                      <div className="col-12">
                        <h5>Property For Rent</h5>
                      </div>
                  </div>
                { (this.state.propertyRent.length === 0)
                  ? (<div className="row">
                        <div className="col-12">
                          <h5>No Result Found</h5>
                        </div>
                    </div>)
                  : this.state.propertyRent.map((data, index) => {
                    return (
                      <Link to={`/detail/${data.status}/${data._id}`} key={index} >
                        <div className="list-search">
                          <div className="row">
                            <div className="col-2 image-container-list">
                              <img src={data.image} alt="" className="img-responsive"/>
                            </div>
                            <div className="col-10">
                              <h5 className="bold">{data.name}</h5>
                              <h6><span className="lnr lnr-map-marker m-r-5 green"></span>{data.city} | for {data.status} </h6>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                }
                <div className="row">
                    <div className="col-12">
                      <h5>Property For Sell</h5>
                    </div>
                </div>
                { (this.state.propertySell.length === 0)
                  ? (<div className="row">
                        <div className="col-12">
                          <h5>No Result Found</h5>
                        </div>
                    </div>)
                  : this.state.propertySell.map((data, index) => {
                    return (
                      <Link to={`/detail/${data.status}/${data._id}`} key={index} >
                        <div className="list-search">
                          <div className="row">
                            <div className="col-2 image-container-list">
                              <img src={data.image} alt="" className="img-responsive"/>
                            </div>
                            <div className="col-10">
                              <h5 className="bold">{data.name}</h5>
                              <h6><span className="lnr lnr-map-marker m-r-5 green"></span> {data.city} | for {data.status}</h6>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })
                }
              </div>)
              }
            </div>
          </div>
        </Form>
      </div>
    );
  }

  searchProp(){
    this.props.searchProperty(this.refs.search.value,this.refs.city.value)
  }

  componentDidMount(){
    let cities = countries.getCities('indonesia')
    this.setState({
      cities: cities
    })
  }

  componentWillMount(){
    this.props.getSell()
    this.props.getRent()
  }

  componentWillReceiveProps(){
    this.setState({
      isSearch: true
    })
    setTimeout(function() {
      this.setState({
        propertyRent: this.props.dataRent,
        propertySell: this.props.dataSell,
        isSearch: false,
      })}.bind(this),1000)
    }
  }

const mapStateToProps = (state) => {
  return {
    dataSell: state.propertiesSell,
    dataRent: state.searchPropertiesRent,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    searchProperty: (prop,city) => dispatch(searchProperty(prop,city)),
    getRent: () => dispatch(getRentDataAction()),
    getSell: () => dispatch(getSellDataAction())
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(MainSearch)
