import './App.css';

const Option = ({option, dispatch}) => {
  return (
    <div>
      <div className="ans">
        <input type="checkbox" />
        <label>{option.optionText}</label>
      </div>
      {/* <div>
        <label>Muuta: </label>
        <input type="text" onChange={(event) => {
          props.dispatch({
            type: 'ANSWER_CHANGED',
            payload: {
              answer: event.target.value,
              examIndex: props.examIndex,
              questionIndex: props.questionIndex,
              answerIndex: props.answerIndex
            }
          })
        }} />
      </div> */}
    </div>
  );
}

export default Option;