import './App.css';
import Kysymys from './Kysymys';

const Tentti = (props) => {
    return (
        <div>
            <label for="name">Muuta nimi: </label>
            <input type="text" id="name" onChange={(event) => {
                props.dispatch({
                    type: 'TENTIN_NIMI_MUUTTUI',
                    payload: {
                        nimi: event.target.value,
                        tentinIndex: props.tentinIndex
                    }
                })
            }} value={props.tentti.nimi} />
            <div>
                {props.tentti.kysymykset.map((kysymys, index) => <Kysymys kysymys={kysymys} kysymyksenIndex={index} tentinIndex={props.tentinIndex} dispatch={props.dispatch} />)}
            </div>
        </div>
    );
}

export default Tentti;