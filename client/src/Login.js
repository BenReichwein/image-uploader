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
      <div className="md:container md:mx-auto">
        <div className="h-48 flex flex-wrap content-center">
          <label className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1">
            Username
          </label>
          <input
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
          name="username"
          placeholder="Enter Username"
          value={this.state.username}
          onChange={this.handleInputChange}
          required
          />
          <label className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1">
            Password
          </label>
          <input
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
          />
          <button 
          className="self-auto bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
          onClick={this.onSubmit}>
            Login
          </button>
        </div>
        <div className="container">
            <span 
            className="text-gray-600">
              Don't have account? <button 
            className="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
            onClick={()=>window.location.href = "/reigster"}>
              Register
            </button></span>
        </div>
      </div>
    )
  }
}

export default Login