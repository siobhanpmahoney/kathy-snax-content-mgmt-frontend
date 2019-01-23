import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Switch>
          <Route exact path='/' component={Home} />

          <Route exact path='/login' render={ (routerProps) => <Login history={routerProps.history}/> } />

          <Redirect to='/' />

        </Switch>


      </div>
    );
  }
}

export default withRouter(App);
