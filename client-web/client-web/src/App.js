import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store/configureStore';
import './App.css';
// import { firebaseAuth } from './config/constants';
import Page404 from './containers/Page404.js'
import Register from './components/Register';
import LoginRegisterPage from './containers/LoginRegisterPage';
import Home from './containers/Home';
import ListProperty from './containers/ListProperty';
import DetailProperty from './containers/DetailProperty';
import Dashboard from './containers/protected/Dashboard';
import Documentation from './components/Documentation';
import Notification from './components/Notification';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
      ? <Component {...props} />
      : <Redirect to='/dashboard/profile' />
      }
    />
  )
}

class App extends Component {
  constructor () {
    super()
    this.state = {
      authed: false,
      loading: true,
    }
  }
  componentDidMount () {
    // this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({
    //       authed: true,
    //       loading: false,
    //     })
    //   } else {
    //     this.setState({
    //       authed: false,
    //       loading: false,
    //     })
    //   }
    // })
    if(localStorage.getItem('user') !== null) {
      this.setState({
        authed: true,
        loading: false,
      })
    } else {
      this.setState({
        authed: false,
        loading: false,
      })
    }
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Notification />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path='/detail/:status/:id' component={DetailProperty} />
              <Route exact path='/property' component={ListProperty} />
              <Route exact path='/documentation' component={Documentation}/>
              <PublicRoute authed={this.state.authed} path='/login' component={LoginRegisterPage} />
              <PublicRoute authed={this.state.authed} path='/register' component={Register} />
              <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
              <Route component={Page404} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
