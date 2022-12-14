import './Exams.css'
import examService from '../../services/examService'

const Exams = ({ exams, dispatch }) => {

  const selectExam = async (id) => {
    try {
      const exam = await examService.getExam(id)
      dispatch({ type: 'SELECTED_EXAM', payload: exam })
    } catch (err) {
      console.log("could not get exam questions and options", err)
    }
  }

  const addExam = async () => {
    console.log('adding exam');
    try {
      const examId = await examService.addExam()
      dispatch({
        type: 'ADD_EXAM',
        payload: examId.toString()
      })
    } catch (err) {
      console.log(err);
    }
  }

  const deleteExam = async (id) => {
    console.log('deleting exam with id', id)
    try {
      await examService.deleteExam(id)
      dispatch({
        type: 'DELETE_EXAM',
        payload: id
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='exams'>
      <h1>Tentit</h1>
      <ul data-cy='testMenu' className='testMenu'>
        {exams.map(exam =>
          <li key={exam.id}>
            <button data-cy='examButton' className='examButton' type='button' onClick={() => selectExam(exam.id)}>
              {exam.name}
            </button>
            <button data-cy='deleteExamButton' className='deleteButton' type='button' onClick={() => deleteExam(exam.id)}>-</button>
          </li>
        )}
        <button data-cy='addExamButton' className='addExamButton' type='button' onClick={addExam}>Lisää tentti</button>
      </ul>
    </div>
  )
}

export default Exams;