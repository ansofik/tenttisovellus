import '../App.css';
import EditQuestion from './EditQuestion';
import examService from '../../services/examService'

const EditExam = ({ exam, dispatch }) => {

  const handleEdit = async event => {
    try {
      await examService.updateName(exam.id, event.target.value)
      dispatch({
        type: 'EXAM_NAME_CHANGED',
        payload: event.target.value
      })
    } catch (err) {
      console.log(err)
    }
  }

  console.log('editing exam', exam)

  return (
    <div>
      <label htmlFor="name">Tentin nimi: </label>
      <input type="text" id="name" onChange={handleEdit} defaultValue={exam.name} />
      <div>
        {exam.questions.map(question => <EditQuestion question={question} dispatch={dispatch} key={question.questionId} />)}
      </div>
    </div>
  );
}

export default EditExam;