import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

class MyListProperty extends React.Component {
  render () {
    return (
      <div>
        <div className="row p-t-20 p-b-20">
          <div className="col-lg-4 offset-lg-2">
            <h4>Your Properties</h4>
          </div>
          <div className="col-lg-4 text-right">
            <Link to='/dashboard/property/add'>
              <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-primary">
                Add New
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{

}

const mapDispatchToProps = (dispatch)=>{

}

export default connect (mapStateToProps,mapDispatchToProps)(MyListProperty)
