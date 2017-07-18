import React from 'react'
import axios from 'axios'
import Countries from 'countries-cities'
import GoogleMapReact from 'google-map-react'
import { upload } from '../helpers/upload'
import geocoder from 'geocoder'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const api = 'http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com/api'
let property = {}

class AddNewProperty extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      access: null,
      category: null,
      cities: [],
      lat: -6.260750,
      lng: 106.781920,
      zoom: 19
    }
  }

  componentWillMount () {
    axios.get(api+'/access')
    .then(response => {
      this.setState({
        access: response.data
      })
    })
    axios.get(api+'/category')
    .then(response => {
      this.setState({
        category: response.data
      })
    })
    let cities = Countries.getCities('indonesia')
    this.setState({
      cities:cities
    })
  }

  componentDidMount() {
    upload('uploader', 'fileButton',(url)=>{
      property.image = url
    })
  }

  render () {
    return (
      <div>
        <form>
          <div className="b-a b-grey" style={{borderRadius:4}}>
            <h5 className="text-center bg-gray padding-15" style={{borderRadius: '4px 4px 0 0'}}>Property Detail</h5>
            <div className="padding-15">
              <div className="row m-t-20">
                <div className="col-lg-3">
                  <p>Property Name</p>
                </div>
                <div className="col-lg-8 m-b-20">
                  <div className="input-group">
                    <input type="text" className="form-control" ref="name" required />
                  </div>
                </div>
                <div className="col-lg-3">
                  <p>Property Image</p>
                </div>
                <div className="col-lg-8 m-b-20">
                  <div className="input-group">
                    <progress value="0" max="100" id="uploader">0%</progress>
                    <input type="file" value="upload" id="fileButton" className="form-control" ref="image" placeholder="add image url here" />
                  </div>
                </div>
                <div className="col-lg-3">
                  <p>Location City</p>
                </div>
                <div className="col-lg-8 m-b-20">
                  <select type="select" className="form-control" ref="city">
                    {this.state.cities.map((city,index)=>{
                      return <option key={index} value={city}>{city}</option>
                    })}
                  </select>
                </div>
                <div className="col-lg-3">
                  <p>Property Status</p>
                </div>
                <div className="col-lg-8 m-b-20">
                  <select type="select" className="form-control" ref="status">
                    <option value='Rent'>Rent</option>
                    <option value='Sell'>Sell</option>
                  </select>
                </div>
                <div className="col-lg-3">
                  <p>Description</p>
                </div>
                <div className="col-lg-8 m-b-20">
                  <textarea type="textarea" className="form-control" ref="descr" required />
                </div>
                <div className="col-lg-3">
                  <p>Price</p>
                </div>
                <div className="col-lg-5 m-b-20">
                  <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">Rp</span>
                    <input type="number" className="form-control" ref="price_amount" required />
                  </div>
                </div>
                <div className="col-lg-3 m-b-20">
                  <select type="select" className="form-control" ref="price_descr">
                    <option value="hour">/ hour</option>
                    <option value="day">/ day</option>
                    <option value="month">/ month</option>
                    <option value="year">/ year</option>
                  </select>
                </div>
                <div className="col-lg-3">
                  <p>Detail</p>
                </div>
                <div className="col-lg-4 m-b-20">
                  <div className="input-group m-b-10">
                    <span className="label">Building Area</span>
                    <div className="input-group">
                      <input type="number" className="form-control" ref="detail_luasBangunan" />
                      <span className="input-group-addon">m2</span>
                    </div>
                  </div>
                  <div className="input-group m-b-10">
                    <span className="label">Land Area</span>
                    <div className="input-group">
                      <input type="number" className="form-control" ref="detail_luasTanah" />
                      <span className="input-group-addon">m2</span>
                    </div>
                  </div>
                  <div className="input-group m-b-10">
                    <span className="label">Floor</span>
                    <input type="number" className="form-control" ref="detail_lantai" />
                  </div>
                </div>
                <div className="col-lg-4 m-b-20">
                  <div className="input-group m-b-10">
                    <span className="label">Electricity</span>
                    <select type="select" className="form-control" ref="detail_listrik">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div className="input-group m-b-10">
                    <span className="label">Appliance</span>
                    <select type="select" className="form-control" ref="detail_perabotan">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-3">
                  <p>Facility</p>
                </div>
                <div className="col-lg-8 m-b-20">
                  <input type="textarea" className="form-control" ref="detail_fasilitas" />
                </div>
                <div className="col-lg-3">
                  <p>Address</p>
                </div>
                <div className="col-lg-8 m-b-20">
                  <div className="input-group">
                    <input type="text" className="form-control" ref="address" onChange={(e)=> this.getLocation(e.target.value)} required />
                  </div>
                </div>
                <div className="col-lg-3">
                  <p>Category</p>
                </div>
                <div className="col-lg-8 m-b-20">
                  <select type="select" className="form-control" ref="_categoryId">
                    {this.state.category == null
                      ? (<option value="596afd36c869be1be9e07840">Rumah</option>)
                      : (this.state.category.map((category, index) => {
                        return (
                          <option value={category._id} key={index}>{category.name}</option>
                        )
                      }))
                    }
                  </select>
                </div>
                <div className="col-lg-3">
                  <p>Access</p>
                </div>
                <div className="col-lg-8 m-b-20">
                  {this.state.access == null ? (<h5>loading..</h5>) : (this.state.access.map((access, index) => {
                    return (<div className="checkbox checkbox-success" key={index}>
                      <input className="checkbox-access" name="access" id={access.name} type="checkbox" value={access._id} />
                      <label htmlFor={access.name}>
                        {access.name}
                      </label>
                    </div>)
                    }))
                  }
                </div>
                <div className="col-lg-3">
                  <p>Location</p>
                </div>
                <div className="col-lg-4 m-b-20">
                  Lat <input type="text" value={this.state.lat}/>
                </div>
                <div className="col-lg-4 m-b-20">
                  Lng <input type="text" value={this.state.lng}/>
                </div>
                <div className ="col-md-10 offset-lg-1">
                <GoogleMapReact
                  style={{width:50, height:250,margin:10}}
                   center={{lat: this.state.lat, lng: this.state.lng}}
                   zoom={this.state.zoom}
                   onClick={(e)=> this.getDot(e)}
                 >
                  <input
                    type='text'
                    onChange={(e)=> this.getLocation(e.target.value)}
                    />
                  <img
                    style={{width:20,height:20}}
                    lat={this.state.lat}
                    lng={this.state.lng}
                    src='http://www.clker.com/cliparts/l/a/V/x/F/r/house-icon-dark-green-hi.png'
                  />
                </GoogleMapReact>
                </div>
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96690.80542089987!2d29.864461132544537!3d40.77109282810726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4f66644bfb9d%3A0x82690ee7586b7eb9!2zxLB6bWl0LCBLb2NhZWxp!5e0!3m2!1str!2str!4v1480782606579"
                  style={{width:565, height:430}}

                  allowFullScreen>
                  <img
                    style={{width:20,height:20}}
                    lat={59.955413}
                    lng={30.337844}
                    src='http://www.clker.com/cliparts/l/a/V/x/F/r/house-icon-dark-green-hi.png'
                    onChange={(e)=> this.getLocation(e)}
                  /></iframe> */}
              </div>
              <div className="col-12 text-center m-t-20">
                <button type="submit" className="button btn-round"
                  onClick={
                    (e)=>{
                      this.submitData(e)
                    }
                  }>Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

  getDot(e){
    this.setState({
      lat: e.lat,
      lng: e.lng
    })
  }

  getLocation(loc){
  geocoder.geocode(loc,(err,data)=>{
    console.log(data);
    if(typeof data !== "undefined" && data.status === 'OK'){
      this.setState({
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      })
    } else {
      return (<h6>no result found</h6>)
    }
  })
  }

  submitData(e){
    e.preventDefault()
    property.name = this.refs.name.value
    property.city = this.refs.city.value
    property.descr = this.refs.descr.value
    property.price_amount = this.refs.price_amount.value
    property.price_descr = this.refs.price_descr.value
    property.detail_luasBangunan = this.refs.detail_luasBangunan.value
    property.detail_luasTanah = this.refs.detail_luasTanah.value
    property.detail_perabotan = this.refs.detail_perabotan.value
    property.detail_listrik = this.refs.detail_listrik.value
    property.detail_lantai = this.refs.detail_lantai.value
    property.detail_fasilitas = this.refs.detail_fasilitas.value
    property.address = this.refs.address.value
    property._categoryId = this.refs._categoryId.value
    property.lat = this.state.lat
    property.lng = this.state.lng

    property._accessId = []
    console.log(property);
    var inputElements = document.getElementsByClassName('checkbox-access');
    for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
        property._accessId.push(inputElements[i].value)
      }
    }
    let token = JSON.parse(localStorage.getItem('token')).token
    if(this.refs.status.value === 'Rent'){
      axios.post(api+`/propertyRent`,property,{
        headers: {'token': token}
      })
      .then(response=>{
        if(response.data.hasOwnProperty('err')){
          console.log(response.data.err);
        } else {
          alert('Success Add New Property')
        }
        console.log(`${JSON.stringify(response.data)}`);
      })
    } else{
      axios.post(api+`/propertySell`,property,{
        headers: {token: token}
      })
      .then(response=>{
        this.props.save()
        console.log(`${JSON.stringify(response.data)}`);
      })
    }
  }
}

export default AddNewProperty
