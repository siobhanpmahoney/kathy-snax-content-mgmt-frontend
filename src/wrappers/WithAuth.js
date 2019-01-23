import React from 'react';
import { connect } from 'react-redux';
import { Redirect,withRouter } from 'react-router';
import { setUser } from '../actions/user'
import { Login } from '../components/Login'

export default function (WrappedComponent) {
  class WithAuth extends React.Component {

    render() {

      if (this.props.user.authenticated) {
        return (
          <WrappedComponent {...this.props} />
        )
      } else {
        return (
            <Redirect to='/login' />
          )
      }
      }
    }

    function mapStateToProps(state) {
      return {
        user: state.user,
      };
    }

    return connect(mapStateToProps, {setUser})(WithAuth);
  }
