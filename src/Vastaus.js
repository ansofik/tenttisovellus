import './App.css';

const Vastaus = (props) => {
    return (
        <div>
            <div className="ans">
                <input type="checkbox" />
                <label>{props.vastaus}</label>
            </div>
            <div>
                <label>Muuta: </label>
                <input type="text" onChange={(event) => {
                    props.dispatch({
                        type: 'VASTAUS_MUUTTUI',
                        payload: {
                            vastaus: event.target.value,
                            tentinIndex: props.tentinIndex,
                            kysymyksenIndex: props.kysymyksenIndex,
                            vastauksenIndex: props.vastauksenIndex
                        }
                    })
                }} />
            </div>
        </div>
    );
}

export default Vastaus;