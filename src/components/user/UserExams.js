import examService from '../../services/examService'

const Exams = ({ exams, dispatch }) => {

  const selectExam = async (id) => {
    try {
      const exam = await examService.getUserExam(id)
      const takenExamId = await examService.takeExam(id)
      dispatch({
        type: 'SELECTED_USER_EXAM',
        payload: {
          exam: exam,
          takenExamId: takenExamId
        }
      })
    } catch (err) {
      console.log("could not get exam questions and options", err)
    }
  }

  return (
    <div className='exams'>
      <h1>Tentit</h1>
      <ul className='testMenu'>
        {exams.map(exam =>
          <li key={exam.id}>
            <button type='button' onClick={() => selectExam(exam.id)}>
              {exam.name}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Exams;