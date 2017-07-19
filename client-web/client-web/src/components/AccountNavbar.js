import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import './AccountNavbar.css'

export default class AccountNavbar extends React.Component {
  componentDidMount () {
    $('.dropdown').click(function(){
      $('.dropdown').toggleClass('open')
    })
  }

  render () {
    return (
      <li className="dropdown">
        <a className="dropdown-toggle nav-link">
            <span className="glyphicon glyphicon-user"></span> 
            <strong>Ppsari</strong>
            <span className="glyphicon glyphicon-chevron-down"></span>
        </a>
        <ul className="dropdown-menu">
            <li>
                <div className="navbar-login">
                    <div className="row">
                        <div className="col-lg-12">
                            <Link to="/dashboard/profile"><p className="text-left"><strong>Your Profile</strong></p></Link>
                            <Link to="/dashboard/request"><p className="text-left small">Request</p></Link>
                        </div>
                    </div>
                </div>
            </li>
            <li className="divider"></li>
            <li>
                <div className="navbar-login navbar-login-session">
                    <div className="row">
                        <div className="col-lg-4 pull-right">
                          <p className="text-left">
                            <a className="btn btn-primary btn-block btn-sm">Logout</a>
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
