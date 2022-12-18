import { useState } from 'react'
import userService from '../services/userService'

const Register = ({ dispatch }) => {

  const handleRegister = async (event) => {
    event.preventDefault()
    console.log('creating new user', registerData.username, registerData.password)
    try {
      const user = await userService.createUser(registerData)
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch({ type: 'STORE_USER', payload: user })
    } catch (err) {
      console.log(err);
    }
    setRegisterData({ username: '', password: '', passwordRepeat: '' })
  }

  const [registerData, setRegisterData] = useState({ username: '', password: '', passwordRepeat: '' })

  return (
    <div>
      <h1>Tenttisovellus</h1>
      <div className='registerContainer'>
        <label className='formLabel' htmlFor='registerForm'>Rekisteröidy</label>
        <form id='registerForm' onSubmit={handleRegister}>
          <div className='inputContainer'>
            <label htmlFor='username'>Käyttäjätunnus</label>
            <input id='username' type='text' value={registerData.username} onChange={
              event => setRegisterData({ username: event.target.value, password: registerData.password, passwordRepeat: registerData.passwordRepeat })
            } />
          </div>
          <div>
            <label htmlFor='password'>Salasana</label>
            <input id='password' type='password' value={registerData.password} onChange={
              event => setRegisterData({ username: registerData.username, password: event.target.value, passwordRepeat: registerData.passwordRepeat })
            } />
          </div>
          <div>
            <label htmlFor='passwordRepeat'>Salasana uudelleen</label>
            <input id='passwordRepeat' type='password' value={registerData.passwordRepeat} onChange={
              event => setRegisterData({ username: registerData.username, password: registerData.password, passwordRepeat: event.target.value })
            } />
          </div>
          <button type='submit' id='signUpButton'>Luo tunnus</button>
        </form>
      </div>
    </div>
  )
}

export default Register