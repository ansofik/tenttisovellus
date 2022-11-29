import axios from 'axios'

const url = 'http://localhost:8080'
const config = {
  headers: {
    Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
  }
}

const updateName = async (id, name) => {
  console.log('updating exam name');
  try {
    await axios.put(`${url}/exams/${id}/`, { name: name }, config)
  } catch (err) {
    console.log(err)
  }
}

const updateQuestion = async (id, text) => {
  try {
    await axios.put(`${url}/questions/${id}/`, { questionText: text }, config)
  } catch (err) {
    console.log(err)
  }
}

const updateOption = async (id, text, correct) => {
  try {
    await axios.put(`${url}/options/${id}/`, { optionText: text, correct: correct }, config)
  } catch (err) {
    console.log(err)
  }
}

export default {
  updateName,
  updateQuestion,
  updateOption
}