import axios from "axios"

const EditOption = ({ option, dispatch, questionId }) => {

  const handleEdit = async event => {
    console.log(event.target.value)
    try {
      await axios.put(`http://localhost:8080/options/${option.optionId}/`, { optionText: event.target.value, correct: option.correct },
        {
          headers: {
            Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
          }
        })
    } catch (err) {
      console.log(err)
    }
    dispatch({
      type: 'OPTION_CHANGED',
      payload: {
        questionId: questionId,
        optionId: option.optionId,
        text: event.target.value
      }
    })
  }

  console.log("editing option", option)
  return (
    <div className="ans">
      <input type="checkbox"/>
      <input type="text" onChange={handleEdit} defaultValue={option.optionText} />
    </div>
  );
}

export default EditOption;