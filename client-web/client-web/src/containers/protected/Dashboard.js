import React from 'react'
import MenuBar from '../../components/MenuBar'
import { Route, Switch } from 'react-router-dom'

import MenuDashboard from '../../components/MenuDashboard';
import Profile from './Profile';
import Request from './Request';
import Transaction from './Transaction';
import MyProperties from './MyProperties';
import Page404 from '../../containers/Page404.js'

export default class Dashboard extends React.Component {
  render () {
    return (
      <div className="Dashboard">
        <MenuBar />
        <MenuDashboard />
        <div className="container dashboard-container">
          <div className="row">
            <div className="col-12">
            </div>
            <div className="col-12">
              <Switch>
                <Route path='/dashboard/profile' component={Profile} />
                <Route path='/dashboard/requests' component={Request} />
                <Route path='/dashboard/transactions' component={Transaction} />
                <Route path='/dashboard/property' component={MyProperties} />
                <Route component={Page404} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
