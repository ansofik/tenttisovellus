import axios from 'axios'

const url = 'http://localhost:8080'
const config = {
  headers: {
    Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
  }
}

const getExams = async () => {
  const response = await axios(`${url}/exams`, config)
  console.log('response', response);
  return response.data
}

const getExam = async (id) => {
  const response = await axios(`${url}/exams/${id}`, config)
  console.log('response', response);
  return response.data
}

const addExam = async () => {
  const response = await axios.post(`${url}/exams`, config)
  console.log('response', response);
  return response.data
}

const updateName = (id, name) => axios.put(`${url}/exams/${id}/`, { name: name }, config)

const addQuestion = () => async () => {
  const response = await axios.post(`${url}/exams/questions`, config)
  console.log('response', response);
  return response.data
}

const updateQuestion = (id, text) => axios.put(`${url}/questions/${id}/`, { questionText: text }, config)

const addOption = async () => {
  const response = await axios.post(`${url}/questions/options`, config)
  console.log('response', response);
  return response.data
}

const updateOption = (id, text, correct) => axios.put(`${url}/options/${id}/`, { optionText: text, correct: correct }, config)


export default {
  getExams,
  getExam,
  addExam,
  updateName,
  updateQuestion,
  addQuestion,
  updateOption,
  addOption
}