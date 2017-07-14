import React from 'react'
import { register } from '../helpers/auth'
import axios from 'axios'
const api = 'http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends React.Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    let user = {}
    user.username = this.username.value
    user.email = this.email.value
    user.password = this.pw.value
    axios.post(`${api}/register`, user)
    .then((data) => {
      console.log(data.data);
    })
    .catch(err => console.log(err))

    console.log(user);
    register(this.email.value, this.pw.value)
    .catch(e => this.setState(setErrorMsg(e)))
  }

  render () {
    return (
      <div className="col-sm-12 p-t-20">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input className="form-control" ref={(username) => this.username = username} placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.registerError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    )
  }
}
