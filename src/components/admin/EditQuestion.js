import axios from "axios"
import EditOption from './EditOption'

const EditQuestion = ({ question, dispatch }) => {

    const handleEdit = async event => {
      console.log(event.target.value)
      try {
        await axios.put(`http://localhost:8080/questions/${question.questionId}/`, { questionText: event.target.value },
          {
            headers: {
              Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
            }
          })
      } catch (err) {
        console.log(err)
      }
      dispatch({
        type: 'QUESTION_CHANGED',
        payload: {
            questionId: question.questionId,
            text: event.target.value
        } 
      })
    }
  
    console.log("editing question", question)
    return (
      <div>
        <input type="text" onChange={handleEdit} defaultValue={question.questionText} />
        <div>
          {question.options.map(option => <EditOption option={option} dispatch={dispatch} key={option.optionId} questionId={question.questionId}/>)}
        </div>
      </div>
    );
  }
  
  export default EditQuestion;