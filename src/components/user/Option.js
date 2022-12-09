import '../App.css';

const Option = ({ questionId, option, dispatch }) => {

  const handleChange = () => {
    console.log('toggle option')
    dispatch({
      type: 'TOGGLE_OPTION',
      payload: {
        questionId: questionId,
        optionId: option.optionId
      }
    })
  }

  return (
    <div className="ans">
      <input id={option.optionId}
        type="checkbox"
        checked={option.selected}
        onChange={handleChange} />
      <label htmlFor={option.optionId}>{option.optionText}</label>
    </div>
  );
}

export default Option;