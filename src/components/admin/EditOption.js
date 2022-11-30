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
          text: text
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="ans">
      <input type="checkbox" />
      <input type="text" value={option.optionText} onChange={handleEdit} />
    </div>
  );
}

export default EditOption;