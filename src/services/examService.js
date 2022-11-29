import axios from 'axios'

const url = 'http://localhost:8080'
const config = {
  headers: {
    Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
  }
}

const updateName = (id, name) => axios.put(`${url}/exams/${id}/`, { name: name }, config)

const updateQuestion = (id, text) => axios.put(`${url}/questions/${id}/`, { questionText: text }, config)

const updateOption = (id, text, correct) => axios.put(`${url}/options/${id}/`, { optionText: text, correct: correct }, config)
  
export default {
  updateName,
  updateQuestion,
  updateOption
}