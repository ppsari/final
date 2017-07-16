import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ShowProfile extends React.Component {
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
                  <input type="text" className="form-control rounded-input" value="johndoe" disabled />
                </div>
              </div>
              <div className="col-lg-3">
                <p>Full Name</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="text" className="form-control rounded-input" value="John Doe" disabled />
                </div>
              </div>
              <div className="col-lg-3">
                <p>Email</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="email" className="form-control rounded-input" value="johndoe@gmail.com" disabled />
                </div>
              </div>
              <div className="col-lg-3">
                <p>Phone Number</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="number" className="form-control rounded-input"  value="+6298472847883" disabled />
                </div>
              </div>
              <div className="col-lg-3">
                <p>Password</p>
              </div>
              <div className="col-lg-8 m-b-20">
                <div className="input-group">
                  <input type="password" className="form-control rounded-input"  value="lalaland" disabled />
                </div>
              </div>
            </div>
            <div className="col-12 text-center m-t-20">
              <Link to='/dashboard/profile/edit'>
                <button type="submit" className="button btn-round">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{

}

export default connect(mapStateToProps, null)(ShowProfile);
