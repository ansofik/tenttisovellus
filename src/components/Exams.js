import axios from 'axios';

const Exams = ({ exams, dispatch }) => {

  const selectExam = async (selectedExamId) => {
    console.log("loading questions")
      try {
        const response = await axios(`http://localhost:8080/exams/${selectedExamId}/`,
         {headers : {
          Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
      }})
        console.log("response for get questions", response)
        dispatch({ type: 'SELECTED_EXAM', payload: response.data })
      } catch (err) {
        console.log("could not get exam questions and options", err)
      }
  }

  return (
    <div>
      <h1>Tentit</h1>
      <ul className="testMenu">
        {exams.map(exam =>
          <li key={exam.id}>
            <button className='examButton' type='button' onClick={() => selectExam(exam.id)}>
              {exam.name}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Exams;