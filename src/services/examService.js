import axios from 'axios'

const url = 'http://localhost:8080'
const config = {
  headers: {
    Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
  }
}

const getExams = async () => {
  console.log('get exam titles from server')
  const response = await axios.get(`${url}/exams`, config)
  console.log('response', response);
  return response.data
}

const getPublishedExams = async () => {
  const response = await axios.get(`${url}/userexams`, config)
  console.log('response', response);
  return response.data
}

const getExam = async (id) => {
  const response = await axios.get(`${url}/exams/${id}`, config)
  console.log('response', response);
  return response.data
}

const getUserExam = async (id) => {
  const response = await axios.get(`${url}/userexams/${id}`, config)
  console.log('response', response);
  return response.data
}

const takeExam = async (examId) => {
  const response = await axios.post(`${url}/takenexams`, { examId: examId}, config)
  console.log('response', response);
  return response.data
}

const saveSelectedOption = async (takenExamId, optionId) => {
  const response = await axios.post(`${url}/takenexams/${takenExamId}/answers`, {answerOptionId: optionId}, config)
  console.log('response', response);
  return response.data
}

const returnExam = async (takenExamId) => {
  console.log('returning exam');
  const response = await axios.put(`${url}/takenexams/${takenExamId}`, {}, config)
}

const addExam = async () => {
  const response = await axios.post(`${url}/exams`, { name: 'Uusi tentti'}, config)
  console.log('response', response);
  return response.data
}

const deleteExam = (id) => axios.delete(`${url}/exams/${id}/`, config)

const updateExamName = (id, name) => axios.put(`${url}/exams/${id}/`, { name: name }, config)

const addQuestion = async (id) => {
  const response = await axios.post(`${url}/exams/${id}/questions`, { text: '' }, config)
  console.log('response', response);
  return response.data
}

const deleteQuestion = (id) => axios.delete(`${url}/questions/${id}/`, config)

const updateQuestion = (id, text) => axios.put(`${url}/questions/${id}/`, { questionText: text }, config)

const addOption = async (id) => {
  const response = await axios.post(`${url}/questions/${id}/options`, { text: '', correct: false }, config)
  console.log('response', response);
  return response.data
}

const deleteOption = (id) => axios.delete(`${url}/options/${id}/`, config)

const updateOption = (id, text, correct) => {
  console.log('updating option');
  console.log('correct', correct)
  
  axios.put(`${url}/options/${id}/`, { text: text, correct: correct }, config)
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
  updateOption
}

export default examService