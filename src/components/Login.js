import React from 'react'
import { withRouter, Redirect } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../actions/user'

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      console.log("prevProps: ", prevProps)
      console.log("currentProps: ", this.props)
    }
  }


  onFormUpdates = (event) => {
    let name = event.target.name
    let val = event.target.value
    this.setState({
      [name]: val
    })
  }

  onAuthorizeUser = (event) => {
    event.preventDefault()
    console.log(this.state)

    let info = this.state
    const auth_url = 'http://localhost:3000/api/v1/login'

    // if (token) {
      return fetch(auth_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json',
        },
        body: JSON.stringify(info)
      })
      .then(response => response.json())
      .then(res => {
        console.log("first res", res)
        if (res.error) {
          alert(res.error)
        } else {
          console.log("got token from server", res)
          this.onSetUserToken(res)
        }
      })


    // }
  }

  onSetUserToken = (user) => {
    const token=user.token
    localStorage.setItem('token', user.token)
    this.onSetUser(user)
  }



onSetUser = (user) => {
  const login_url = 'http://localhost:3000/api/v1/current_user'
  const token = localStorage.getItem('token', user.token)
  return fetch(login_url, {
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then(res => res.json())
  .then(data => {
    console.log("got logged in user info? ", data)
    return this.props.setUser(data)
  })
}

render() {
  if (!!this.props.user.authenticated) {
    return  <Redirect to = '/' />
  }

  return (
    <div>
      <form>
        <input onChange= {this.onFormUpdates} type='text' name='username' value={this.state.username} />
        <input onChange= {this.onFormUpdates} type="password" name='password' value={this.state.password} />
        <button onClick={this.onAuthorizeUser}>log in</button>
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
