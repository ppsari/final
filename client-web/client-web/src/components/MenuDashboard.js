import React from 'react'
import { NavLink } from 'react-router-dom'
import './MenuDashboard.css';

export default class MenuDashboard extends React.Component {
  render () {
    return (
      <nav className="MenuDashboard">
        <div className="container">
          <ul className="flex-menu nav navbar-nav">
            <NavLink to="/dashboard/profile" className="menu-dashboard">
              <li className="text-center">
                <span className="lnr lnr-user icon-dashboard"></span>
                <span className="dashboard-menu-text">Profile</span>
              </li>
            </NavLink>
            <NavLink to="/dashboard/property" className="menu-dashboard">
              <li className="text-center">
                <span className="lnr lnr-apartment icon-dashboard"></span>
                <span className="dashboard-menu-text">Properties</span>
              </li>
            </NavLink>
            <NavLink to="/dashboard/requests" className="menu-dashboard">
              <li className="text-center">
                <span className="lnr lnr-book icon-dashboard"></span>
                <span className="dashboard-menu-text">Requests</span>
              </li>
            </NavLink>
            <NavLink to="/dashboard/transactions" className="menu-dashboard">
              <li className="text-center">
                <span className="lnr lnr-pie-chart icon-dashboard"></span>
                <span className="dashboard-menu-text">Transactions</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </nav>
    )
  }
}
