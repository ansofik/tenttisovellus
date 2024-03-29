import axios from 'axios'
const url = 'https://localhost:8080'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getConfig = () => {
  return {
    headers: {
      'Authorization': token
    }
  }
}

const getExams = async () => {
  console.log('get exam titles from server')
  const response = await axios.get(`${url}/exams`, getConfig())
  console.log('response', response);
  return response.data
}

const getPublishedExams = async () => {
  const response = await axios.get(`${url}/userexams`, getConfig())
  console.log('response', response);
  return response.data
}

const getExam = async (id) => {
  const response = await axios.get(`${url}/exams/${id}`, getConfig())
  console.log('response', response);
  return {exam: response.data, version: response.headers.etag}
}

const getUserExam = async (id) => {
  const response = await axios.get(`${url}/userexams/${id}`, getConfig())
  console.log('response', response);
  return response.data
}

const takeExam = async (examId) => {
  const response = await axios.post(`${url}/takenexams`, { examId: examId }, getConfig())
  console.log('response', response);
  return response.data
}

const saveSelectedOption = async (takenExamId, questionId, optionId) => {
  const response = await axios.post(`${url}/takenexams/${takenExamId}/answers`, { questionId: questionId, optionId: optionId }, getConfig())
  console.log('response', response);
  return response.data
}

const returnExam = async (takenExamId, answers) => {
  console.log('returning exam');
  const response = await axios.put(`${url}/takenexams/${takenExamId}`, { answers: answers }, getConfig())
  return response.data
}

const addExam = async () => {
  const response = await axios.post(`${url}/exams`, { name: 'Uusi tentti' }, getConfig())
  console.log('response', response);
  return response.data
}

const deleteExam = (id) => axios.delete(`${url}/exams/${id}/`, getConfig())

const updateExamName = async (id, name, version) => {
  console.log('updating examname')
  const config = {
    headers: {
      'Authorization': token,
      'If-Match': version
    }
  }
  const response = await axios.put(`${url}/exams/${id}/`, { name: name }, config)
  console.log('response', response);
  return response.headers.etag
}

const addQuestion = async (id) => {
  const response = await axios.post(`${url}/exams/${id}/questions`, { text: '' }, getConfig())
  console.log('response', response);
  return response.data
}

const deleteQuestion = (id) => axios.delete(`${url}/questions/${id}/`, getConfig())

const updateQuestion = (id, text) => axios.put(`${url}/questions/${id}/`, { questionText: text }, getConfig())

const addOption = async (id) => {
  const response = await axios.post(`${url}/questions/${id}/options`, { text: '', correct: false }, getConfig())
  console.log('response', response);
  return response.data
}

const deleteOption = (id) => axios.delete(`${url}/options/${id}/`, getConfig())

const updateOption = (id, text, correct) => {
  console.log('updating option');
  console.log('correct', correct)

  axios.put(`${url}/options/${id}/`, { text: text, correct: correct }, getConfig())
}

const examService = {
  getExams,
  getPublishedExams,
  getExam,
  getUserExam,
  takeExam,
  saveSelectedOption,
  returnExam,
  addExam,
  deleteExam,
  updateExamName,
  addQuestion,
  deleteQuestion,
  updateQuestion,
  addOption,
  deleteOption,
  updateOption,
  setToken
}

export default examService