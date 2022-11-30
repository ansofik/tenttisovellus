import axios from 'axios';
import examService from '../services/examService'

const Exams = ({ exams, dispatch }) => {

  const selectExam = async (id) => {
      try {
        const exam = await examService.getExam(id)
        dispatch({ type: 'SELECTED_EXAM', payload: exam })
      } catch (err) {
        console.log("could not get exam questions and options", err)
      }
  }

  return (
    <div>
      <h1>Tentit</h1>
      <ul className="testMenu">
        {exams.map(exam =>
          <li key={exam.id}>
            <button className='examButton' type='button' onClick={() => selectExam(exam.id)}>
              {exam.name}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Exams;