import React from 'react'
import MenuBar from '../../components/MenuBar'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Profile from './Profile';
import Request from './Request';

export default class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <MenuBar />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <ListGroup>
                <Link to="/dashboard/profile"><ListGroupItem tag="button" action>Profile</ListGroupItem></Link>
                <Link to="/dashboard/property"><ListGroupItem tag="button" action>Properties</ListGroupItem></Link>
                <Link to="/dashboard/transactions"><ListGroupItem tag="button" action>Transactions</ListGroupItem></Link>
                <Link to="/dashboard/requests"><ListGroupItem tag="button" action>Requests</ListGroupItem></Link>
              </ListGroup>
            </div>
            <div className="col-9">
              <Switch>
                <Route exact path='/dashboard/profile' component={Profile} />
                <Route exact path='/dashboard/requests' component={Request} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
