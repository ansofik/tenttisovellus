import axios from "axios"
import examService from '../../services/examService'

const EditOption = ({ option, dispatch, questionId }) => {

  const handleEdit = async event => {
    examService.updateOption(option.optionId, event.target.value, option.correct)
    dispatch({
      type: 'OPTION_CHANGED',
      payload: {
        questionId: questionId,
        optionId: option.optionId,
        text: event.target.value
      }
    })
  }
  
  return (
    <div className="ans">
      <input type="checkbox"/>
      <input type="text" onChange={handleEdit} defaultValue={option.optionText} />
    </div>
  );
}

export default EditOption;