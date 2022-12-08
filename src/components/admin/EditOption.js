import examService from '../../services/examService'

const EditOption = ({ option, dispatch, questionId }) => {

  const handleEdit = async event => {
    const text = event.target.value
    try {
      examService.updateOption(option.optionId, text, option.correct)
      dispatch({
        type: 'OPTION_CHANGED',
        payload: {
          questionId: questionId,
          optionId: option.optionId,
          text: text,
          correct: option.correct
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {
    try {
      await examService.deleteOption(option.optionId)
      dispatch({
        type: 'DELETE_OPTION',
        payload: {
          questionId: questionId,
          optionId: option.optionId
        } 
      })
    } catch (err) {
      console.log(err);
    }
  }

  const toggleCorrect = async () => {
    try {
      examService.updateOption(option.optionId, option.optionText, !option.correct)
      dispatch({
        type: 'OPTION_CHANGED',
        payload: {
          questionId: questionId,
          optionId: option.optionId,
          text: option.optionText,
          correct: !option.correct
        }
      })
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div>
      <input className='checkbox' type="checkbox" checked={option.correct} onChange={toggleCorrect} />
      <input className='input' type="text" value={option.optionText} onChange={handleEdit} />
      <button type="button" onClick={handleDelete}>-</button>
    </div>
  );
}

export default EditOption;