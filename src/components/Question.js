import './App.css';
import Option from './Option';

const Question = ({ question, dispatch }) => {
  return (
    <div>
      <form>
      <div className="questAns">
        <label className="question">{question.questionText}</label>
        {/* <div>
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
          </div> */}
        <div>
          {question.options.map(option => <Option option={option} dispatch={dispatch} key={option.optionId}/>)}
        </div>
      </div>
      </form>
      {/* <div>
        <button type="button" onClick={(event) => {
        props.dispatch({
          type: 'DELETE_QUESTION',
          payload: {
            examIndex: props.examIndex,
            questionIndex: props.questionIndex
          }
        })
      }}>poista kysymys</button>
      <button type="button" onClick={(event) => {
        props.dispatch({
          type: 'ADD_QUESTION',
          payload: {
            examIndex: props.examIndex,
            questionIndex: props.questionIndex
          }
        })
      }}>lisää kysymys</button>
      </div> */}
    </div>

  );
}

export default Question;


