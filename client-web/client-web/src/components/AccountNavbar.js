import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'

import './AccountNavbar.css'
import { logout } from '../helpers/auth';
import { listenRequest } from '../helpers/request';
import Notification from './Notification'

const api = 'https://api.room360.ga/api'

class AccountNavbar extends React.Component {
  constructor () {
    super()
    this.state = {
      list:[],
      request: 0,
    }
  }

listRequest(){
  const token = JSON.parse(localStorage.getItem('token')).token
  axios.get(api+`/request`,{headers:{token:token}})
  .then(response=>{
    this.setState({
      list: response.data
      })
    })
  }

  componentDidMount () {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    listenRequest(userId, (data) => {
      // console.log('totalnya adalah: '+JSON.stringify(tot))
      // console.log(userId);
      // console.log(this.props.user._id);
      // console.log(JSON.stringify(tot) != 0);
      // console.log(tot)
      console.log(JSON.parse(data.val()))
      if(data.val() !== null){
        let total = JSON.parse(data.val()).tot
        console.log(total);
        if(this.props.user._id === userId && total !== 0){
          $('.Notification').addClass('active')
          this.setState({
            request: JSON.stringify(total),
          })

          setTimeout(function(){
            $('.Notification').removeClass('active')
          }, 10000)
        }
      }
    });
    $('.dropdown').click(function(){
      $('.dropdown').toggleClass('open')
    })
  }

  render () {
    return (
      <li className="dropdown">
        <a className="dropdown-toggle nav-link" onClick={()=> this.listRequest()}>
            <strong>{this.props.user.name || 'Hello!'} <span className="badge pull-right">{this.state.request || null}</span></strong>
            <span className="glyphicon glyphicon-chevron-down"></span>
        </a>
        <ul className="dropdown-menu">
            <li>
                <div className="navbar-login">
                    <div className="row">
                        <div className="col-lg-12">
                            <Link to="/dashboard/profile"><p className="text-left m-t-10 m-b-10"><strong>Your Profile</strong></p></Link>
                            <Link to="/dashboard/requests">
                              {this.state.list.map((l,index)=>{
                                return <div className=""><div className="row" key={index}>
                                  <div className="col-md-4 p-r-0"><img className="img-responsive"
                                    src={l.connections._propertyId.image}
                                    alt="pic" /></div>
                                <div className="col-md-8">
                                  <p>{l._userId.name}</p>
                                </div>
                              </div><hr /></div>
                              })}
                            </Link>
                        </div>
                    </div>
                </div>
            </li>
            <li className="divider"></li>
            <li>
                <div className="navbar-login navbar-login-session">
                    <div className="row">
                        <div className="col-lg-12 pull-right no-padding">
                          <p>
                            <a
                              className="btn-sm btn-style-three theme-btn text-center"
                              style={{display: 'block'}}
                              onClick={(e) => {
                              e.preventDefault();
                              logout()
                            }}><span className="lnr lnr-power-switch m-r-10"></span>Logout</a>
                          </p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <Notification count={this.state.request} />
    </li>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(AccountNavbar);
