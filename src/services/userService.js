import axios from 'axios'

const url = 'http://localhost:8080'

const loginUser = async (loginData) => {
  const response = await axios.post(`${url}/login`, { username: loginData.username, password: loginData.password })
  console.log('response', response)
  return response.data.data
}

const createUser = async (registerData) => {
  const response = await axios.post(`${url}/users`, { username: registerData.username, password: registerData.password })
  console.log('response', response)
  return response.data.data
}

const userService = {
  loginUser,
  createUser
}

export default userService