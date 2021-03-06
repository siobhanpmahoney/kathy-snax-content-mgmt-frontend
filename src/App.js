import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {setUser, loadBio, updateBio} from './actions'
import Home from './components/Home'
import Login from './components/Login'
import BioContainer from './components/bio/BioContainer'
import AnnouncementContainer from './components/announcements/AnnouncementContainer'
import './App.css';

class App extends Component {

  componentDidMount() {
    this.onAuthToken()
  }

  onAuthToken = () => {
    const token = localStorage.getItem('token', token)
    if (token) {
      const url = 'http://localhost:3000/api/v1/current_user'
      return fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }

      })
      .then(response => response.json())
      .then(json => this.props.setUser(json))
    } else {
      return;
    }

  }

  render() {
    return (
      <div className="App">

        <Switch>
            <Route exact path='/' render={ (routerProps) => <Home history={routerProps.history}/> } />

          <Route exact path='/login' render={ (routerProps) => <Login history={routerProps.history}/> } />

        <Route exact path='/bio' render={ (routerProps) => <BioContainer history={routerProps.history}/> } />
        <Route exact path='/announcements' render={ (routerProps) => <AnnouncementContainer history={routerProps.history}/> } />

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
