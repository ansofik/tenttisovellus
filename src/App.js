import './App.css';
import Header from './Header';
import Tentti from './Tentti';
import { useState, useReducer, useEffect } from 'react';

let kysymys1 = {
  kysymys: "Paljonko on 1+2?",
  vastausVaiht: [1, 3, 4],
  oikeaIndex: 1
};

let kysymys2 = {
  kysymys: "Onko kuu juustoa?",
  vastausVaiht: ["kyllä", "ei"],
  oikeaIndex: 1
};

let tentti1 = {
  nimi: "haskell perusteet",
  kysymykset: [kysymys1, kysymys2],
};

let tentti2 = {
  nimi: "javascript perusteet",
  kysymykset: [kysymys1],
};

const dataInit = {
  tentit: [tentti1, tentti2],
  tallennetaan: false,
  alustettu: false
}

function reducer(state, action) {
  switch (action.type) {

    case 'TENTIN_NIMI_MUUTTUI':
      return {
        ...state,
        tentit: state.tentit.map((tentti, i) => (i == action.payload.tentinIndex ? { ...tentti, nimi: action.payload.nimi } : tentti)),
        tallennetaan: true
      };

    case 'KYSYMYS_MUUTTUI':
      return {
        ...state,
        tentit: state.tentit.map((tentti, i) => (i == action.payload.tentinIndex ? {
          ...tentti, kysymykset: tentti.kysymykset.map((kysymys, i) => (i === action.payload.kysymyksenIndex ? {
            ...kysymys, kysymys: action.payload.kysymys
          } : kysymys))
        } : tentti)),
        tallennetaan: true
      };

    case 'POISTA_KYSYMYS':
      return {
        ...state,
        tentit: state.tentit.map((tentti, i) => (i == action.payload.tentinIndex ? {
          ...tentti, kysymykset: tentti.kysymykset.filter((kysymys, j) => j != action.payload.kysymyksenIndex)
        } : tentti)),
        tallennetaan: true
      };

    case 'VASTAUS_MUUTTUI':
      return {
        ...state,
        tentit: state.tentit.map((tentti, i) => (i == action.payload.tentinIndex ? {
          ...tentti, kysymykset: tentti.kysymykset.map((kysymys, i) => (i === action.payload.kysymyksenIndex ? {
            ...kysymys, vastausVaiht: kysymys.vastausVaiht.map((vastaus, i) => (i === action.payload.vastauksenIndex ? action.payload.vastaus : vastaus))
          } : kysymys))
        } : tentti)),
        tallennetaan: true
      };

    case 'ALUSTA_DATA':
      return { ...action.payload, alustettu: true };

    case 'PAIVITA_TALLENNUSTILA':
      return { ...state, tallennetaan: false };

    default:
      throw new Error();
  }
}

const App = () => {

  const [data, dispatch] = useReducer(reducer, dataInit);
  const [valittu, setValittu] = useState(0)

  useEffect(() => {
    let tenttidata = localStorage.getItem('tenttidata');
    if (tenttidata == null) {
      console.log("ladataan data local storageen")
      localStorage.setItem('tenttidata', JSON.stringify(dataInit))
      dispatch({ type: 'ALUSTA_DATA', payload: dataInit })

    } else {
      console.log("ladataan data local storagesta")
      dispatch({ type: 'ALUSTA_DATA', payload: (JSON.parse(tenttidata)) })
    }
  }, []);

  useEffect(() => {
    if (data.tallennetaan == true) {
      console.log("talletetaan local storageen muutos")
      localStorage.setItem('tenttidata', JSON.stringify(data))
      dispatch({ type: 'PAIVITA_TALLENNUSTILA', payload: false })
    }
  }, [data.tallennetaan]);

  return (
    <div>
      <Header />
      <div className="center">
        <nav>
          <ul className="testMenu">
            {data.alustettu && data.tentit.map(tentti => <li><a href="">{tentti.nimi}</a></li>)}
          </ul>
        </nav>
        {data.alustettu && <Tentti tentti={data.tentit[0]} tentinIndex='0' dispatch={dispatch} />}
        <nav>
          <a href="" className="showAns">Näytä vastaukset</a>
        </nav>
      </div>
    </div>
  );
}

export default App;
  

