import axios from 'axios';
import '../App.css';
import EditQuestion from './EditQuestion';

const EditExam = ({ exam, dispatch }) => {

  const handleEdit = async event => {
    console.log(event.target.value)
    try {
      await axios.put(`http://localhost:8080/exams/${exam.id}/`, { name: event.target.value },
        {
          headers: {
            Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
          }
        })
    } catch (err) {
      console.log(err)
    }
    dispatch({
      type: 'EXAM_NAME_CHANGED',
      payload: event.target.value
    })
  }

  console.log("editing exam", exam)
  return (
    <div>
      <label htmlFor="name">Tentin nimi: </label>
      <input type="text" id="name" onChange={handleEdit} defaultValue={exam.name} />
      <div>
        {exam.questions.map(question => <EditQuestion question={question} dispatch={dispatch} key={question.questionId}/>)}
      </div>
    </div>
  );
}

export default EditExam;