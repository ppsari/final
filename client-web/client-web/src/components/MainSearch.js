import React from 'react';
import { connect } from 'react-redux'
import { Button, Form, Input } from 'reactstrap';
import countries from 'countries-cities'

import { searchProperty } from '../actions/index.js'

require('dotenv').config()
 
class Example extends React.Component {
  constructor(props){
    super(props)
    this.state={
      cities: []
    }
  }
  render() {
    return (
      <div className="container MainSearch">
        <Form className="row">
          <div className="col-md-6 offset-md-2">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Find a Property that you want" 
              ref="search" 
              onChange={()=> this.searchProp()}/>
          </div>
          <div className="col-2">
            <select onChange={()=> this.searchProp()} ref="city">
              <option disabled>Select City</option>
              {this.state.cities.map((city,index)=>{
                  return <option key ={index} value={city}>{city}</option>
              })}
            </select>
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
}

const mapDispatchToProps = (dispatch) =>{
  return {
    searchProperty: (prop,city) => dispatch(searchProperty(prop,city))
  }
}

export default connect (null,mapDispatchToProps)(Example)
