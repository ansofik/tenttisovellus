import './Login.css'
import { useState } from 'react'
import userService from '../services/userService'
import {
  Link
} from 'react-router-dom'

const Login = ({ dispatch }) => {

  const [loginData, setLoginData] = useState({ username: '', password: '' })

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', loginData.username, loginData.password)
    try {
      const user = await userService.loginUser(loginData)
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch({ type: 'STORE_USER', payload: user })
    } catch (err) {
      console.log(err);
    }
    setLoginData({ username: '', password: '' })
  }

  return (
    <div className='login'>
      <h1 data-test='app-heading'>Tenttisovellus</h1>
      <div className='signInContainer'>
        <label className='formLabel' htmlFor='loginForm'>Kirjaudu sisään</label>
        <form id='loginForm' onSubmit={handleLogin}>
          <div className='inputContainer'>
            <label htmlFor='username'>Käyttäjätunnus</label>
            <input id='username' type='text' value={loginData.username} onChange={
              event => setLoginData({ username: event.target.value, password: loginData.password })
            } />
          </div>
          <div>
            <label htmlFor='password'>Salasana</label>
            <input id='password' type=/* 'text' */'password' value={loginData.password} onChange={
              event => setLoginData({ username: loginData.username, password: event.target.value })
            } />
          </div>
          <button type='submit' id='loginButton'>Kirjaudu sisään</button>
          <div>
            <Link to='/luo-tunnus'>Rekisteröidy</Link>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Login