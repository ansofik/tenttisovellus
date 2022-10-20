import './App.css';
import Question from './Question';

const Exam = (props) => {
  return (
    <div>
      <label for="name">Muuta nimi: </label>
      <input type="text" id="name" onChange={(event) => {
        props.dispatch({
          type: 'EXAM_NAME_CHANGED',
          payload: {
            name: event.target.value,
            examIndex: props.examIndex
          }
        })
      }} value={props.exam.name} />
      <div>
        {props.exam.questions.map((question, index) => <Question question={question} questionIndex={index} examIndex={props.examIndex} dispatch={props.dispatch} />)}
      </div>
    </div>
  );
}

export default Exam;