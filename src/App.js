import './App.css';
import Header from './Header';
import Tentti from './Tentti';
import { useState, useReducer } from 'react';

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
  kysymykset: [kysymys1, kysymys2]
};

let tentti2 = {
  nimi: "javascript perusteet",
  kysymykset: [kysymys1]
};

const tenttiLista = [tentti1, tentti2];

function reducer(state, action) {

  /* const tentinIndex = action.payload.tentinIndex;
  const tentitKopio = [...state]; */

  switch (action.type) {
    case 'TENTIN_NIMI_MUUTTUI': {
      /* tentitKopio[tentinIndex].nimi = action.payload.nimi;
      return tentitKopio; */

      // muuttamatta tilaa suoraan:
      /* const tenttiKopio = {...tentitKopio[tentinIndex]};
      tenttiKopio.nimi = action.payload.nimi;
      tentitKopio[tentinIndex] = tenttiKopio;
      return tentitKopio; */

      // lyhyemmin:
      return state.map((tentti, i) => (i == action.payload.tentinIndex ? { ...tentti, nimi: action.payload.nimi } : tentti));

    }

    case 'KYSYMYS_MUUTTUI': {
      /* tentitKopio[tentinIndex].kysymykset[action.payload.kysymyksenIndex].kysymys = action.payload.kysymys;
      return tentitKopio; */

      /* const kysymyksenIndex = action.payload.kysymyksenIndex;
      const tenttiKopio = { ...tentitKopio[tentinIndex] };
      const kysymyksetKopio = [...tenttiKopio.kysymykset];
      const kysymysKopio = { ...kysymyksetKopio[kysymyksenIndex] };
      kysymysKopio.kysymys = action.payload.kysymys;

      kysymyksetKopio[kysymyksenIndex] = kysymysKopio;
      tenttiKopio.kysymykset = kysymyksetKopio;
      tentitKopio[tentinIndex] = tenttiKopio;
      return tentitKopio; */

      return state.map((tentti, i) => (
        i == action.payload.tentinIndex ? {
          ...tentti, kysymykset: tentti.kysymykset.map((kysymys, i) => (
            i === action.payload.kysymyksenIndex ? { ...kysymys, kysymys: action.payload.kysymys } : kysymys))
        } : tentti));
    }

    case 'POISTA_KYSYMYS': {
      /* const tenttiKopio = { ...tentitKopio[action.payload.tentinIndex] };
      const kysymyksetKopio = [...tenttiKopio.kysymykset];
      kysymyksetKopio.splice(action.payload.kysymyksenIndex, 1);
      tenttiKopio.kysymykset = kysymyksetKopio;
      tentitKopio[tentinIndex] = tenttiKopio;
      return tentitKopio; */

      return state.map((tentti, i) => (
        i == action.payload.tentinIndex ? {
          ...tentti, kysymykset: tentti.kysymykset.filter((kysymys, j) => j != action.payload.kysymyksenIndex)
        } : tentti));
    }

    case 'VASTAUS_MUUTTUI': {
      /* tentitKopio[tentinIndex].kysymykset[action.payload.kysymyksenIndex].vastausVaiht[action.payload.vastauksenIndex] = action.payload.vastaus;
      return tentitKopio; */
      const tentitKopio = [...state];
      const tentinIndex = action.payload.tentinIndex;
      const kysymyksenIndex = action.payload.kysymyksenIndex;
      const vastauksenIndex = action.payload.vastauksenIndex;
      const tenttiKopio = { ...tentitKopio[tentinIndex] };
      const kysymyksetKopio = [...tenttiKopio.kysymykset];
      const kysymysKopio = { ...kysymyksetKopio[kysymyksenIndex] };
      const vastausVaihtKopio = [...kysymysKopio.vastausVaiht];
      vastausVaihtKopio[vastauksenIndex] = action.payload.vastaus;

      kysymysKopio.vastausVaiht = vastausVaihtKopio;
      kysymyksetKopio[kysymyksenIndex] = kysymysKopio;
      tenttiKopio.kysymykset = kysymyksetKopio;
      tentitKopio[tentinIndex] = tenttiKopio;

      return tentitKopio;
    }

    default:
      throw new Error();
  }
}

const App = () => {

  const [tentit, dispatch] = useReducer(reducer, tenttiLista);

  return (
    <div>
      <Header />
      <div className="center">
        <nav>
          <ul className="testMenu">
            {tentit.map(tentti => <li><a href="">{tentti.nimi}</a></li>)}
          </ul>
        </nav>
        <Tentti tentti={tentit[0]} tentinIndex='0' dispatch={dispatch} />
        <nav>
          <a href="" className="showAns">Näytä vastaukset</a>
        </nav>
      </div>
    </div>
  );
}

export default App;

