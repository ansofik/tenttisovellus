import axios from "axios"

const Login = ({ loginData, dispatch }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', loginData.username, loginData.password)
    try {
      const response = await axios.post('http://localhost:8080/login',
        { username: loginData.username, password: loginData.password })
      console.log('response', response)
      const user = response.data
      dispatch({ type: 'STORE_USER', payload: user })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Tenttisovellus</h1>
      <h2>Kirjaudu sisään</h2>
      <form onSubmit={handleLogin}>
        <div>
          Käyttäjätunnus
          <input type='text' value={loginData.username} onChange={
            event => {
              dispatch({
                type: 'USERNAME_CHANGED',
                payload: event.target.value
              })
            }} />
        </div>
        <div>
          Salasana <input type='text' value={loginData.password} onChange={
            event => {
              dispatch({
                type: 'PASSWORD_CHANGED',
                payload: event.target.value
              })
            }} />
        </div>
        <button type='submit'>Kirjaudu sisään</button>
      </form>
    </div>

  )
}

export default Login