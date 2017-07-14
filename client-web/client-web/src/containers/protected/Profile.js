import React from 'react'
import {connect} from 'react-redux'

import {editProfile} from '../../actions/index.js'

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  render () {
    return (
      <div>
        <h3>Name</h3>
        <input type="text" ref="name"/>
        <h3>Phone</h3>
        <input type="text" ref="phone"/>
        <h3>Password</h3>
        <input type="password" ref="password"/>
        <button type="submit"
          onClick={()=>this.edit()}>Submit</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
