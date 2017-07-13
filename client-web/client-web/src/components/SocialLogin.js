import React from 'react'
import { register, loadUi } from '../helpers/auth'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends React.Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    register(this.email.value, this.pw.value)
    .catch(e => this.setState(setErrorMsg(e)))
  }

  componentWillMount () {
    loadUi()
  }

  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h6>Login With Social Account</h6>
        <div id="firebaseui-auth-container"></div>
      </div>
    )
  }
}
