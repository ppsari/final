import React from 'react'
import { connect } from 'react-redux'

import { editProfile } from '../actions/index.js'

class EditProfile extends React.Component {
  render () {
    return (
      <div>
        <div className="row p-t-20 p-b-20">
          <div className="col-lg-8 offset-lg-2">
            <h4>Your Profile</h4>
            <div className="row m-t-20">
              <div className="col-lg-3">
                <p>Username</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="text" className="form-control rounded-input" />
                </div>
              </div>
              <div className="col-lg-3">
                <p>Full Name</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="text" className="form-control rounded-input" />
                </div>
              </div>
              <div className="col-lg-3">
                <p>Email</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="email" className="form-control rounded-input" />
                </div>
              </div>
              <div className="col-lg-3">
                <p>Phone Number</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="number" className="form-control rounded-input" />
                </div>
              </div>
              <div className="col-lg-3">
                <p>Password</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="password" className="form-control rounded-input" />
                </div>
              </div>
            </div>
            <div className="col-12 text-center m-t-20">
              <button type="submit" className="button btn-round"
                onClick={()=>this.edit()}>Save
              </button>
            </div>
          </div>
        </div>
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

export default connect(null, mapDispatchToProps)(EditProfile);
