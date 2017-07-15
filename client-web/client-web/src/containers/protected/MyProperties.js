import React from 'react'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import MyListProperty from '../../components/MyListProperty'
import MyDetailProperty from '../../components/MyDetailProperty';
import MyDetailRoom from '../../components/MyDetailRoom';
import AddProperty from '../../components/AddProperty';

class MyProperties extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/dashboard/property' component={MyListProperty} />
          <Route exact path='/dashboard/property/add' component={AddProperty} />
          <Route exact path='/dashboard/property/detail/:id' component={MyDetailProperty} />
          <Route exact path='/dashboard/property/detail:id/:idroom' component={MyDetailRoom} />
        </Switch>
      </div>
    )
  }
}

export default MyProperties
