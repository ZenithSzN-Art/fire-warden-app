import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {
  return (
    <div>
      <div>
        <form>
          <h1>Login</h1>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <br />
          <Link to="/dashboard">
          <button type="submit">Login</button>
          </Link>
        </form>
      </div>
      <div>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

export default Login