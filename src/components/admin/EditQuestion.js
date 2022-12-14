import EditOption from './EditOption'
import examService from '../../services/examService'
import './EditExam.css'
const EditQuestion = ({ question, dispatch }) => {

  const handleEdit = async event => {
    const text = event.target.value
    try {
      await examService.updateQuestion(question.questionId, text)
      dispatch({
        type: 'QUESTION_CHANGED',
        payload: {
          questionId: question.questionId,
          text: text
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {
    try {
      await examService.deleteQuestion(question.questionId)
      dispatch({
        type: 'DELETE_QUESTION',
        payload: question.questionId
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleAdd = async () => {
    try {
      const optionId = await examService.addOption(question.questionId)
      dispatch({
        type: 'ADD_OPTION',
        payload: {
          questionId: question.questionId,
          optionId: optionId.toString()
        } 
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div data-cy='question' className='question'>
      <input className='input' type="text" value={question.questionText} onChange={handleEdit}  />
      <button type="button" onClick={handleDelete}>-</button>
      <div>
        {question.options.map(option => <EditOption option={option} dispatch={dispatch} key={option.optionId} questionId={question.questionId} />)}
      </div>
      <button data-cy='addOptionButton' className='addOptionButton' type="button" onClick={handleAdd} >+</button>
    </div>
  );
}

export default EditQuestion;