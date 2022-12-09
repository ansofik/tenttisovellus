import examService from '../../services/examService';
import './Exam.css'
import Question from './Question';

const Exam = ({ exam, takenExamId, dispatch }) => {

  const handleClick = async () => {
    try {
      let selected = []
      exam.questions.forEach(question => {selected = selected.concat(question.options.filter(option => option.selected === true))})
      console.log('selected', selected)
      Promise.all(selected.map(option => examService.saveSelectedOption(takenExamId, option.optionId)))
      await examService.returnExam(takenExamId)
    } catch (err) {
      console.log(err)
    }
  }
  
  console.log("viewing exam", exam)
  return (
    <div className='exam'>
      <h2>{exam.name}</h2>
      <div>
        {exam.questions.map(question=> <Question key={question.questionId} question={question} dispatch={dispatch} />)}
      </div>
      <button onClick={handleClick}>Palauta tentti</button>
    </div>
  );
}

export default Exam;