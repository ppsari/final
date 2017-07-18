import React from 'react'
import { Route, Switch } from 'react-router-dom'

import MyListProperty from '../../components/MyListProperty'
import MyDetailProperty from '../../components/MyDetailProperty';
import MyEditProperty from '../../components/MyEditProperty';
import AddProperty from '../../components/AddProperty';
import AddNewRoom from '../../components/AddNewRoom';

class MyProperties extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/dashboard/property' component={MyListProperty} />
          <Route exact path='/dashboard/property/add' component={AddProperty} />
          <Route exact path='/dashboard/property/detail/:status/:id' component={MyDetailProperty} />
          <Route exact path='/dashboard/property/edit/:status/:id' component={MyEditProperty} />
          <Route exact path='/dashboard/property/add-room/:status/:idproperty' component={AddNewRoom} />
        </Switch>
      </div>
    )
  }
}

export default MyProperties
