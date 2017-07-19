import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import './AccountNavbar.css'
import { logout } from '../helpers/auth';
import { listenRequest } from '../helpers/request';



export default class AccountNavbar extends React.Component {
  componentDidMount () {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    listenRequest(userId, (tot) => {console.log('totalnya adalah: '+JSON.stringify(tot))});
    $('.dropdown').click(function(){
      $('.dropdown').toggleClass('open')
    })
  }

  render () {
    return (
      <li className="dropdown">
        <a className="dropdown-toggle nav-link">
            <span className="glyphicon glyphicon-user"></span> 
            <strong>{this.props.name || 'Hello!'}</strong>
            <span className="glyphicon glyphicon-chevron-down"></span>
        </a>
        <ul className="dropdown-menu">
            <li>
                <div className="navbar-login">
                    <div className="row">
                        <div className="col-lg-12">
                            <Link to="/dashboard/profile"><p className="text-left m-t-10 m-b-10"><strong>Your Profile</strong></p></Link>
                            <Link to="/dashboard/request"><p className="text-left small m-t-10 m-b-10">Request</p></Link>
                        </div>
                    </div>
                </div>
            </li>
            <li className="divider"></li>
            <li>
                <div className="navbar-login navbar-login-session">
                    <div className="row">
                        <div className="col-lg-12 pull-right no-padding">
                          <p>
                            <a
                              className="btn-sm btn-style-three theme-btn text-center"
                              style={{display: 'block'}}
                              onClick={(e) => {
                              e.preventDefault();
                              logout()
                            }}><span className="lnr lnr-power-switch m-r-10"></span>Logout</a>
                          </p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </li>
    )
  }
}
