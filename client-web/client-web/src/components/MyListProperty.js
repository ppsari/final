import React from 'react'
import { Link } from 'react-router-dom'

import './MyListProperty.css';
import ListViewProperty from './ListViewProperty';
import TitleSection from './TitleSection';

class MyListProperty extends React.Component {
  render () {
    return (
      <div>
        <div className="row p-t-20 p-b-20">
          <div className="col-lg-8 offset-lg-2">
            <TitleSection lightTitle="YOUR" boldTitle="PROPERTIES" />
            <div className="flex-space-between m-b-30">
              <h5>Your List Properties</h5>
              <Link to='/dashboard/property/add' className="pull-right">
                <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-primary">
                  Add New
                </button>
              </Link>
            </div>
            <hr />
            <ListViewProperty />
          </div>
        </div>
      </div>
    )
  }
}


export default MyListProperty
