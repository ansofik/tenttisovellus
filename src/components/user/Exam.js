import examService from '../../services/examService';
import './Exam.css'
import Question from './Question';

const Exam = ({ exam, takenExamId, dispatch }) => {

  const handleClick = async () => {
    console.log('handleClick')
    try {
      // save users answers to object where keys are question ids and values are
      // objects where keys are option ids and values are selected values (true/false)
      const userOptions = exam.questions.reduce((prev, curr) => {
        console.log(prev)
        prev[curr.questionId] = curr.options.reduce((prev, curr) => {
          prev[curr.optionId] = curr.selected
          return prev}, {})
        return prev}, {})
      console.log('userOptions', userOptions)
      const {points, maxpoints} = await examService.returnExam(takenExamId, userOptions)
      console.log('points', points)
      dispatch({
        type: 'RETURNED_EXAM',
        payload: {
          points: points,
          maxpoints: maxpoints
        }})
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
      {exam.returned === true ?
       <div className='pointsContainer'>Palautettu, vastasit oikein {exam.points}/{exam.maxpoints} kysymykseen</div> : <button onClick={handleClick}>Palauta tentti</button>}
    </div>
  );
}

export default Exam;