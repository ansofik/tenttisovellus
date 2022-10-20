import './App.css';
import Answer from './Answer';

const Question = (props) => {
  return (
    <div>
      <form>
        <div className="questAns">
          <label className="question">{props.question.question}</label>
          <div>
            <label>Muuta kysymystä: </label>
            <input type="text" onChange={(event) => {
              props.dispatch({
                type: 'QUESTION_CHANGED',
                payload: {
                  question: event.target.value,
                  examIndex: props.examIndex,
                  questionIndex: props.questionIndex
                }
              })
            }} value={props.question.question} />
          </div>
          <div>{props.question.answers.map((answer, index) => <Answer answer={answer} examIndex={props.examIndex} questionIndex={props.questionIndex} answerIndex={index} dispatch={props.dispatch} />)}</div>
        </div>
      </form>
      <button type="button" onClick={(event) => {
        props.dispatch({
          type: 'DELETE_QUESTION',
          payload: {
            examIndex: props.examIndex,
            questionIndex: props.questionIndex
          }
        })
      }}>poista kysymys</button>
    </div>
  );
}

export default Question;