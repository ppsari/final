import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { editProfile , getProfile } from '../actions/index.js'


class ShowProfile extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      user: null
    }
  }
  render () {
    return (
      <div>
        <div className="row p-t-20 p-b-20">
          <div className="col-lg-8 offset-lg-2">
            <h4>Your Profile</h4>
          {(this.state.user === null)
          ? <img
            src='http://testmadina.com/Images/loading1.gif'
            style={{height:200, width: 200,margin:'auto'}}/>
          : <div className="row m-t-20">
             <div className="col-lg-3">
                <p>Username</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="text" className="form-control rounded-input" defaultValue={this.state.user.username} ref="username"/>
                </div>
              </div>
              <div className="col-lg-3">
                <p>Full Name</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="text" placeholder="please input your name here" className="form-control rounded-input" defaultValue={this.state.user.name || ""} ref="name"/>
                </div>
              </div>
              <div className="col-lg-3">
                <p>Email</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="email" className="form-control rounded-input" defaultValue={this.state.user.email} ref="email" disabled/>
                </div>
              </div>
              <div className="col-lg-3">
                <p>Phone Number</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="text" placeholder="please input your phone number here" className="form-control rounded-input"  defaultValue={this.state.user.phone} ref="phone"/>
                </div>
              </div>
              <div className="col-lg-3">
                <p>Password</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="password" className="form-control rounded-input"  defaultValue={this.state.user.password} ref="password" />
                </div>
              </div>
          </div>
        }
            <div className="col-12 text-center m-t-20">
                <button type="submit" className="button btn-round"
                  onClick={()=>{this.edit()}}>
                  Edit
                </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  edit(){
  const userId = JSON.parse(localStorage.getItem('user'))._id

    let newData ={
      username: this.refs.username.value || this.state.user.username,
      name: this.refs.name.value || this.state.user.name,
      email: this.state.user.username,
      phone: this.refs.phone.value || this.state.user.phone,
      password: this.refs.password.value || this.state.user.password
    }
    this.props.editProfile(newData,userId || "")
    this.setState({
      user: newData
    })
    if(this.props.message !== "")
    setTimeout(()=>{
      alert(`${this.props.message}`)
    },100)
  }

  componentWillMount(){
    const userId = JSON.parse(localStorage.getItem('user'))._id
    this.props.getProfile(userId)
  }

  componentWillReceiveProps(){
    setTimeout(()=>{
      this.setState({
        user: this.props.user
      })
    },500)
  }
}

const mapStateToProps = (state) =>{
  return {
    user: state.user,
    message: state.message
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    editProfile: (user,id) => dispatch(editProfile(user,id)),
    getProfile: (id) => dispatch(getProfile(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowProfile);
