import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

export default class LoginRegisterPage extends React.Component {
  constructor () {
    super()
    this.state = {
      isLogin: true;
      isRegister: flase;
    }
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="">
          </div>
          <Login />
          <Register />

        </div>

      </div>
    )
  }
}
