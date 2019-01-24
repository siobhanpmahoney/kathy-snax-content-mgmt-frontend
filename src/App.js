import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {setUser} from './actions'
import Home from './components/Home'
import Login from './components/Login'
import './App.css';

class App extends Component {

  render() {
    console.log("App", this.props)
    return (
      <div className="App">

        <Switch>
            <Route exact path='/' render={ (routerProps) => <Home history={routerProps.history}/> } />

          <Route exact path='/login' render={ (routerProps) => <Login history={routerProps.history}/> } />

          {/*<Redirect to='/' />*/}

        </Switch>


      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setUser}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
