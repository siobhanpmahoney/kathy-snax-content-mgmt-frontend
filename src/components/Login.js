import React from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions'

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  componentDidMount() {
    // this.props.setUser({id: 3, username: "siohan"})
  }

  onFormUpdates = (event) => {
    let name = event.target.name
    let val = event.target.value
    this.setState({
      [name]: val
    })
  }

  onAuthCredentials = (event) => {
    event.preventDefault()
    const u = this.state
    const auth_url = 'http://localhost:3000/api/v1/login'

    return fetch(auth_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({user: u})
    })
    .then(response => response.json())
    .then(res => this.onAuthToken(res.token))
    .then(json => this.props.setUser(json))
  }


  onAuthToken = (token) => {
    localStorage.setItem('token', token)
    const url = 'http://localhost:3000/api/v1/current_user'
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }

    })
    .then(response => response.json())
  }

  // onAuthorizeUser = (event) => {
  //   event.preventDefault()
  //   let info = this.state
  //   const auth_url = 'http://localhost:3000/api/v1/login'
  //   const token = localStorage.getItem('token')
  //   return fetch(auth_url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accepts': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify(info)
  //   })
  //   .then(response => response.json())
  //   .then(res => {
  //     if (res.error) {
  //       alert(res.error)
  //     } else {
  //       this.onSetUserToken(res)
  //     }
  //   })
  // }
  //
  // onSetUserToken = (user) => {
  //   const token=user.token
  //   localStorage.setItem('token', user.token)
  //   return this.props.setUser(user)
  // }



  // onSetUser = (user) => {
  //   const login_url = 'http://localhost:3000/api/v1/current_user'
  //   const token = localStorage.getItem('token', user.token)
  //   return fetch(login_url, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accepts': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log("got logged in user info? ", data)
  //     return this.props.setUser(data)
  //   })
  // }

  render() {
    if (!!this.props.user.authenticated) {
      return  <Redirect to = '/' />
    }

    return (
      <div>
        <form >
          <input onChange= {this.onFormUpdates} type='text' name='username' value={this.state.username} />
          <input onChange= {this.onFormUpdates} type="password" name='password' value={this.state.password} />
          <button onClick={this.onAuthCredentials}>log in</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
