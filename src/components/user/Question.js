import './Exam.css'
import Option from './Option';

const Question = ({ question, dispatch }) => {
  return (
    <div>
        <div className='userQuestion'>
          <div>{question.questionText}</div>
          <div>
            {question.options.map(option => <Option questionId={question.questionId} option={option} dispatch={dispatch} key={option.optionId} />)}
          </div>
        </div>
    </div>
  );
}

export default Question;


