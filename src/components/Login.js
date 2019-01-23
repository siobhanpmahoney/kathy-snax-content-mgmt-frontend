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

  onAuthorizeUser = () => {
    console.log(this.state)

    let info = this.state
    const token=localStorage.getItem('token')
    const login_url = 'http://localhost:3000/api/v1/login'

    // if (token) {
      return fetch(login_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(info)
      })
      .then(response => response.json())
      .then(res => {
        console.log("first res", res)
        if (res.error) {
          alert(res.error)
        } else {
          this.onSetUser(res)
        }
      })

    // }
  }

  onSetUser = (user) => {
    debugger
    localStorage.setItem('token', user.token)
    this.props.setUser(user)
  }



authorize = () => {

}

render() {
  if (!!this.props.user.authenticated) {
    return  <Redirect to = '/' />
  }

  return (
    <div>
      <form onSubmit={this.onAuthorizeUser}>
        <input onChange= {this.onFormUpdates} type='text' name='username' value={this.state.username} />
        <input onChange= {this.onFormUpdates} type="password" name='password' value={this.state.password} />
        <button type="submit">log in</button>
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
