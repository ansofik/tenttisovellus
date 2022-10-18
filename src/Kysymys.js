import './App.css';
import Vastaus from './Vastaus';

const Kysymys = (props) => {
    return (
        <div>
            <form>
                <div className="questAns">
                    <label className="question">{props.kysymys.kysymys}</label>
                    <div>
                        <label>Muuta kysymystä: </label>
                        <input type="text" id="kysymys" onChange={(event) => {
                            props.dispatch({
                                type: 'KYSYMYS_MUUTTUI',
                                payload: {
                                    kysymys: event.target.value,
                                    tentinIndex: props.tentinIndex,
                                    kysymyksenIndex: props.kysymyksenIndex
                                }
                            })
                        }} value={props.kysymys.kysymys} />
                    </div>
                    <div>{props.kysymys.vastausVaiht.map((vastaus, index) => <Vastaus vastaus={vastaus} tentinIndex={props.tentinIndex} kysymyksenIndex={props.kysymyksenIndex} vastauksenIndex={index} dispatch={props.dispatch} />)}</div>
                </div>
            </form>
            <button type="button" id={props.kysymyksenIndex} onClick={(event) => {
                props.dispatch({
                    type: 'POISTA_KYSYMYS',
                    payload: {
                        tentinIndex: props.tentinIndex,
                        kysymyksenIndex: props.kysymyksenIndex
                    }
                })
            }}>poista kysymys</button>
        </div>
    );
}

export default Kysymys;