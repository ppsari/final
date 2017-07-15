import React from 'react'
import axios from 'axios'
import { login, resetPassword } from '../helpers/auth'
import { connect } from 'react-redux';

import {
  loginAction,
} from '../actions';
var jwtDecode = require('jwt-decode');

const api = 'http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com'
function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class Login extends React.Component {
  state = { loginMessage: null }
  handleSubmit = (e) => {
    e.preventDefault()
    let user = {}
    user.email = this.email.value
    user.password = this.pw.value
    console.log(user);
    axios.post(`${api}/login`, user)
    .then((data) => {
      if(data.data.hasOwnProperty('err')){
        this.setState(setErrorMsg('Invalid username/password'))
      } else {
        console.log('et');
        let user = jwtDecode(data.data.token)
        console.log(user)
        this.props.login(user);
        localStorage.setItem('user', JSON.stringify(user));
        window.location = '/dashboard/profile'
      }
    })
    .catch((error) => {
      this.setState(setErrorMsg('Invalid username/password'))
    })
    // login(this.email.value, this.pw.value)
    //   .catch((error) => {
    //     this.setState(setErrorMsg('Invalid username/password'))
    //   })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  render () {
    return (
      <div className="col-sm-12 p-t-20">
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.loginMessage &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.loginMessage} <a onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
            </div>
          }
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(loginAction(data)),
  }
}

export default connect(null, mapDispatchToProps)(Login);
