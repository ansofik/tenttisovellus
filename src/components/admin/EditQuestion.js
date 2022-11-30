import EditOption from './EditOption'
import examService from '../../services/examService'

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

  return (
    <div>
      <input type="text" value={question.questionText} onChange={handleEdit}  />
      <div>
        {question.options.map(option => <EditOption option={option} dispatch={dispatch} key={option.optionId} questionId={question.questionId} />)}
      </div>
    </div>
  );
}

export default EditQuestion;