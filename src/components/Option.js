import './App.css';

const Option = ({option, dispatch}) => {
  return (
      <div className="ans">
        <input type="checkbox" />
        <label>{option.optionText}</label>
      </div>
  );
}

export default Option;