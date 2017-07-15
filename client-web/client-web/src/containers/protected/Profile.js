import React from 'react'
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import {editProfile} from '../../actions/index.js'
import ShowProfile from '../../components/ShowProfile';
import EditProfile from '../../components/EditProfile';

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  render () {
    return (
      <div>
        <Switch>
          <Route exact path='/dashboard/profile' component={ShowProfile} />
          <Route exact path='/dashboard/profile/edit' component={EditProfile} />
        </Switch>
      </div>
    )
  }
  edit(){
    let newData = {
      name: this.refs.name.value,
      phone: this.refs.phone.value,
      password: this.refs.password.value
    }
    this.props.editProfile(newData,`butuh user_id`)
  }

}

const mapStateToProps = (state)=>{

}

const mapDispatchToProps = (dispatch) =>{
  editProfile: (data,id) => dispatch(editProfile(data,id))
}

export default connect(null, mapDispatchToProps)(Profile);
