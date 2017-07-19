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
    // console.log(this.props.userFirebase);
    return (
      <div className={`MenuBar ${this.props.home ? 'home' : ''}`}>
        <Navbar className="style-three" light toggleable>
          <div className="container">
            <NavbarToggler right onClick={this.toggle} />
            <Link to="/">Room360</Link>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                { localStorage.getItem('user') !== null
                  ? <Link to="/dashboard/property/add" className="nav-link">Sell Your Property</Link>
                  : <NavLink onClick={()=> this.sellProp()}>Sell Your Property</NavLink>
                }
                </NavItem>
                { localStorage.getItem('user') !== null
                  ? (<NavItem>
                      <Link to="/dashboard/profile" className="nav-link">Dashboard</Link>
                    </NavItem>)
                  : <h1></h1>
                }
                { localStorage.getItem('user') !== null
                  ? (<NavItem>
                      <NavLink onClick={() => {
                        logout()
                      }}>Logout</NavLink>
                    </NavItem>)
                  : (<NavItem>
                      <Link to="/login" className="nav-link">Login / Register</Link>
                    </NavItem>)
                }
                { localStorage.getItem('user') !== null
                  ? (<AccountNavbar />)
                  : null
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
