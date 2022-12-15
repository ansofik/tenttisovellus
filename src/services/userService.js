import axios from 'axios'

const url = 'http://localhost:8080'

const loginUser = async (loginData) => {
  const response = await axios.post(`${url}/login`, { username: loginData.username, password: loginData.password })
  console.log('response', response)
  return response.data.data
}

const userService = {
  loginUser
}

export default userService