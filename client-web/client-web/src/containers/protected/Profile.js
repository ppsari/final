import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ShowProfile from '../../components/ShowProfile';

class Profile extends React.Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/dashboard/profile' component={ShowProfile} />
        </Switch>
      </div>
    )
  }
}
export default Profile;
