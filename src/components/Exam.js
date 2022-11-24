import './App.css';
import Question from './Question';

const Exam = ({ exam, dispatch }) => {
  console.log("viewing exam", exam)
  return (
    <div>
      <h2>{exam.name}</h2>
      {/* <label for="name">Muuta nimi: </label>
      <input type="text" id="name" onChange={(event) => {
        props.dispatch({
          type: 'EXAM_NAME_CHANGED',
          payload: {
            name: event.target.value,
            examIndex: props.examIndex
          }
        })
      }} value={props.exam.name} /> */}
      {/* <ul>
          {exam.questions.map(question => <li key={question.questionId}>{question.questionText}</li>)}
        </ul> */}
      <div>
        {exam.questions.map(question=> <Question question={question} dispatch={dispatch} />)}
      </div>
    </div>
  );
}

export default Exam;