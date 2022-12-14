import examService from '../../services/examService';
import './Exam.css'
import Question from './Question';

const Exam = ({ exam, takenExamId, dispatch }) => {

  const handleClick = async () => {
    console.log('handleClick')
    try {
      const selectedOptionIds = exam.questions.reduce((prev, curr) => {
        return prev.concat(curr.options.filter(option => option.selected === true).map(option => option.optionId))
      }, [])
      console.log('selectedOptionIds', selectedOptionIds)
      await examService.returnExam(takenExamId, selectedOptionIds)
    } catch (err) {
      console.log(err)
    }
  }

  console.log("viewing exam", exam)
  return (
    <div className='exam'>
      <h2>{exam.name}</h2>
      <div>
        {exam.questions.map(question => <Question key={question.questionId} question={question} dispatch={dispatch} />)}
      </div>
      <button onClick={handleClick}>Palauta tentti</button>
    </div>
  );
}

export default Exam;