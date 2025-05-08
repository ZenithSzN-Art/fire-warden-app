import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
      This is Register page
      <form>
        <label htmlFor="Username">Username:</label>
        <input type="text" placeholder="Username" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" placeholder="Password" />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="Email" />
        <br />
        <button type="submit">Register</button>
      </form>
      <br />
      <div>
        <Link to="/">
      <button>Login</button>
        </Link>
      </div>
      <br />
      <a href="/">To Login</a>
    </div>
  )
}

export default Register