import React, { Component } from 'react'
import api from './api'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    };
  }
  onSubmit = () => {
    api.post('user/login', {
        username: this.state.username.toLowerCase(),
        password: this.state.password
    })
    // api.post('user/register', {
    //   username: this.state.username.toLowerCase(),
    //   password: this.state.password,
    //   image: ""
    // })
    .then(res => {
    window.location.href = "/"
    })
    .catch(err => {
    console.log(err)
    alert(err.response.data)
    })
  };

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="modal">
        <div className="container">
          <label>Username</label>
          <input
          name="username"
          placeholder="Enter Username"
          value={this.state.username}
          onChange={this.handleInputChange}
          required
          />
          <label>Password</label>
          <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
          />
          <button className="system" onClick={this.onSubmit}>Login</button>
        </div>
        <div className="container">
            <button className='forgotpass' onClick={()=> this.props.history.push('/forgot-password')}>Forgot Password?</button>
            <span className="register">Don't have account? <button className="registerbtn" onClick={()=>this.props.history.push('/register')}>Register</button></span>
        </div>
      </div>
    )
  }
}

export default Login