import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import MenuBar from '../components/MenuBar'
import Footer from '../components/Footer'
// import SocialLogin from '../components/SocialLogin'

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <MenuBar />
        <div className="container m-t-30">
          <div className="row p-t-65 p-b-65">
            <div className="col-4 offset-md-4">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                    >
                  Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                  >
                  Register
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Login />
                </TabPane>
                <TabPane tabId="2">
                  <Register />
                </TabPane>
              </TabContent>
              <hr />
              {/* <SocialLogin /> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
