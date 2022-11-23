
const Exams = ({ exams, dispatch }) => {

  return (
    <div>
      <h1>Tentit</h1>
      <ul className="testMenu">
        {exams.map(exam =>
          <li key={exam.id}>
            <button className='examButton' type='button' onClick={e =>
              dispatch({
                type: 'SELECT_EXAM',
                payload: exam.id
              })}>
              {exam.name}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Exams;