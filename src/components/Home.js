import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions'
import WithAuth from '../wrappers/WithAuth'


const Home = (props) => {
  console.log("home props", props.user)
  return (
    <div>Home</div>
  )
}

function mapStateToProps(state, props) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithAuth(Home)))
