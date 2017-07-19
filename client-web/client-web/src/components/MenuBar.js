import React from 'react';
import $ from 'jquery';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../helpers/auth';
import './MenuBar.css'

import AccountNavbar from './AccountNavbar';

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentWillMount() {
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();

      if(scroll >= 550){
        $(".MenuBar").addClass("active")
      } else {
        $(".MenuBar").removeClass("active")
      }
    })
  }

  render() {
    return (
      <div className={`MenuBar ${this.props.home ? 'home' : ''}`}>
        <Navbar className="style-three" light toggleable>
          <button type="button" className="navbar-toggler navbar-toggler-right" onClick={this.toggle}>
            <span className="lnr lnr-menu text-white"></span>
          </button>
          <div className="container">
            <Link to="/"><span className="Logo">Room360</span></Link>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                { localStorage.getItem('user') !== null
                  ? <Link to="/dashboard/property/add" className="nav-link">Sell Your Property</Link>
                  : <NavLink onClick={()=> this.sellProp()}>Sell Your Property</NavLink>
                }
                </NavItem>
                { localStorage.getItem('user') !== null
                  ? (<AccountNavbar name={this.props.user.username} />)
                  : (<NavItem>
                      <Link to="/login" className="nav-link">Login / Register</Link>
                    </NavItem>)
                }
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
  sellProp(){
    if(!localStorage.getItem('user')){
      alert('You Must Login First to Sell!')
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(MenuBar);
