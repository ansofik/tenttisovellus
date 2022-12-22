import './EditExam.css';
import EditQuestion from './EditQuestion';
import examService from '../../services/examService'

const EditExam = ({ exam, dispatch }) => {

  const handleEdit = async event => {
    const name = event.target.value
    console.log('handleEdit', name)
    try {
      const version = await examService.updateExamName(exam.id, name, exam.version)
      console.log('version',version)
      dispatch({
        type: 'EXAM_NAME_CHANGED',
        payload: {
          name: name,
          version: version
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async () => {
    try {
      const questionId = await examService.addQuestion(exam.id)
      dispatch({
        type: 'ADD_QUESTION',
        payload: questionId.toString()
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

  console.log('editing exam', exam)

  return (
    <div className='editExam'>

      <div className='nameContainer'>
        <label htmlFor="name">Tentin nimi: </label>
        <input className='nameInput' type="text" id="name" value={exam.name} onChange={handleEdit} />
      </div>
      <div>
        {exam.questions.map(question => <EditQuestion question={question} dispatch={dispatch} key={question.questionId} />)}
      </div>
      <button data-cy='addQuestionButton' className='addQuestionButton' type="button" onClick={handleClick}>Lisää kysymys</button>
      <button data-cy='deleteExamButton' id='deleteExamButton' type='button' onClick={() => deleteExam(exam.id)}>Poista tentti</button>
    </div>
  );
}

export default EditExam;