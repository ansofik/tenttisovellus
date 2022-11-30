import EditOption from './EditOption'
import examService from '../../services/examService'

const EditQuestion = ({ question, dispatch }) => {

  const handleEdit = async event => {
    try {
      await examService.updateQuestion(question.questionId, event.target.value)
      dispatch({
        type: 'QUESTION_CHANGED',
        payload: {
          questionId: question.questionId,
          text: event.target.value
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <input type="text" onChange={handleEdit} defaultValue={question.questionText} />
      <div>
        {question.options.map(option => <EditOption option={option} dispatch={dispatch} key={option.optionId} questionId={question.questionId} />)}
      </div>
    </div>
  );
}

export default EditQuestion;