
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
    console.log(typeof id)
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
    <div>
      <h1>Tentit</h1>
      <ul className="testMenu">
        {exams.map(exam =>
          <li key={exam.id}>
            <button className='examButton' type='button' onClick={() => selectExam(exam.id)}>
              {exam.name}
            </button>
            <button type='button' onClick={() => deleteExam(exam.id)}>-</button>
          </li>
        )}
        <button type='button' onClick={addExam}>+</button>
      </ul>
    </div>
  )
}

export default Exams;