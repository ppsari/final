import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../helpers/auth';

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
  render() {
    // console.log(this.props.userFirebase);
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <div className="container">
            <NavbarToggler right onClick={this.toggle} />
            <Link to="/">Rumah360</Link>
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
                      <NavLink onClick={() => {
                        logout()
                      }}>Logout</NavLink>
                  </NavItem>)
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
