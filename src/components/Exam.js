import './App.css';
import Question from './Question';

const Exam = ({ exam, dispatch }) => {
  console.log("viewing exam", exam)
  return (
    <div>
      <h2>{exam.name}</h2>
      <div>
        {exam.questions.map(question=> <Question question={question} dispatch={dispatch} />)}
      </div>
    </div>
  );
}

export default Exam;