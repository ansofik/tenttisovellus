import axios from 'axios';
import './App.css';
import Question from './Question';

const EditExam = ({ exam, dispatch }) => {
  console.log("editing exam", exam)
  return (
    <div>
      <label htmlFor="name">Tentin nimi: </label>
      <input type="text" id="name" onChange={async event => {
        try {
            await axios.put(`http://localhost:8080/exams/${exam.id}/`, {name: event.target.value},
            {headers : {
                Authorization: `bearer ${localStorage.getItem('loggedInUser').token}`
            }})
        } catch (err) {
            console.log(err)
        }
        dispatch({
          type: 'EXAM_NAME_CHANGED',
          payload: event.target.value
          })
        }} defaultValue={exam.name} />
      <div>
        {exam.questions.map(question=> <Question question={question} dispatch={dispatch} />)}
      </div>
    </div>
  );
}

export default EditExam;