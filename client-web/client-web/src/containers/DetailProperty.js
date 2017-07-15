import React from 'react'
import {connect} from 'react-redux'

import MenuBar from '../components/MenuBar'
import Footer from '../components/Footer'

import {getDetailPropertyRent,getDetailPropertySell} from '../actions/index.js'

class DetailProperty extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
       id : this.props.match.params.id,
      status : this.props.match.params.status,
      propStatus: ""
    }
  }

  render () {
    return (
      <div>
        <MenuBar />
        <div className="container">
          <div className="row m-t-30">
            <div className="col-6">
              <h3>{this.props.property.name}</h3>
              <small>{this.props.property.address}</small>
            </div>

            <div className="col-6">
              <h5 className="text-right">Rp {this.props.property.price.amount},-</h5>
            </div>
          </div>
          <div className="row m-t-30">
            <div className="col-8">
              <img src={this.props.property.image} alt="preview" className="img-responsive" />
                <button type="button" onClick={()=> this.enter()}><i className="fa fa-sign-in">Enter</i></button>
              <p className="m-t-20">{this.props.property.descr}</p>
            </div>
            <div className="col-6">

            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
enter(){
 let vr = 'http://localhost:8081/vr/index.html'
   window.location.href = vr+`?key=${this.state.propStatus}/${this.state.id}`
  }

  componentDidMount(){
    if(this.state.status === 'rent'){
        this.setState({
          propStatus: 'propertyRent'
        })
      this.props.getDetailPropertyRent(this.state.id)
    } else{
      this.setState({
        propStatus: 'propertySell'
      })
      this.props.getDetailPropertySell(this.state.id)
    }
  }


}

const mapStateToProps = (state) =>{
  const st = window.location.href.split('/')[4];
  if(st === 'rent'){
    return{
      property: state.propertyRent
    }
  } else{
    return {
      property: state.propertySell
    }
  }
}


const mapDispatchToProps = (dispatch) =>{
  return {
    getDetailPropertyRent: (id) => dispatch(getDetailPropertyRent(id)),
    getDetailPropertySell: (id) => dispatch(getDetailPropertySell(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailProperty)
