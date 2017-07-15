import React from 'react'
import MenuBar from '../../components/MenuBar'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import MenuDashboard from '../../components/MenuDashboard';
import Profile from './Profile';
import Request from './Request';
import Transaction from './Transaction';
import MyProperties from './MyProperties';
import MyDetailProperty from './MyDetailProperty';
import MyDetailRoom from './MyDetailRoom';

export default class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <MenuBar />
        <MenuDashboard />
        <div className="container dashboard-container">
          <div className="row">
            <div className="col-12">
            </div>
            <div className="col-12">
              <Switch>
                <Route exact path='/dashboard/profile' component={Profile} />
                <Route exact path='/dashboard/requests' component={Request} />
                <Route exact path='/dashboard/transactions' component={Transaction} />
                <Route exact path='/dashboard/property' component={MyProperties} />
                <Route exact path='/dashboard/property/:id' component={MyDetailProperty} />
                <Route exact path='/dashboard/property/:id/:idroom' component={MyDetailRoom} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
