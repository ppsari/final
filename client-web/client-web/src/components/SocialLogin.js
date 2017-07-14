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
      <div className="col-sm-12">
        <h6 className="text-center">Sign in With Social Account</h6>
        <div id="firebaseui-auth-container"></div>
      </div>
    )
  }
}
