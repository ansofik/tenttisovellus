import axios from "axios"
import { useState } from 'react'

const Login = ({ dispatch }) => {

  const [loginData, setLoginData] = useState({ username: '', password: '' })

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', loginData.username, loginData.password)
    try {
      const response = await axios.post('http://localhost:8080/login',
        { username: loginData.username, password: loginData.password })
      console.log('response', response)
      const user = response.data.data
      dispatch({ type: 'STORE_USER', payload: user })
      localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (err) {
      console.log(err);
    }
    setLoginData({ username: '', password: '' })
  }

  return (
    <div>
      <h1>Tenttisovellus</h1>
      <h2>Kirjaudu sisään</h2>
      <form onSubmit={handleLogin}>
        <div>
          Käyttäjätunnus
          <input type='text' value={loginData.username} onChange={
            event => setLoginData({username: event.target.value, password: loginData.password})
            } />
        </div>
        <div>
          Salasana <input type='text' value={loginData.password} onChange={
            event => setLoginData({username: loginData.username, password: event.target.value})
          } />
        </div>
        <button type='submit'>Kirjaudu sisään</button>
      </form>
    </div>

  )
}

export default Login