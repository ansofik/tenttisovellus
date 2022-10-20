import './App.css';
import Header from './Header';
import Exam from './Exam';
import { useState, useReducer, useEffect } from 'react';

let question1 = {
  question: "Paljonko on 1+2?",
  answers: [1, 3, 4],
  indexOfCorrectAns: 1
};

let question2 = {
  question: "Onko kuu juustoa?",
  answers: ["kyllä", "ei"],
  indexOfCorrectAns: 1
};

let exam1 = {
  name: "haskell perusteet",
  questions: [question1, question2],
};

let exam2 = {
  name: "javascript perusteet",
  questions: [question1],
};

// define initial data, save indicates whether data needs to be resaved to localStorage
const dataInit = {
  exams: [exam1, exam2],
  save: false,
  initialized: false
}

function reducer(state, action) {
  switch (action.type) {

    case 'EXAM_NAME_CHANGED':
      return {
        ...state,
        exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? { ...exam, name: action.payload.name } : exam)),
        save: true
      };

    case 'QUESTION_CHANGED':
      return {
        ...state,
        exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? {
          ...exam, questions: exam.questions.map((question, i) => (i === action.payload.questionIndex ? {
            ...question, question: action.payload.question
          } : question))
        } : exam)),
        save: true
      };

    case 'DELETE_QUESTION':
      return {
        ...state,
        exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? {
          ...exam, questions: exam.questions.filter((question, i) => i != action.payload.questionIndex)
        } : exam)),
        save: true
      };

    case 'ANSWER_CHANGED':
      return {
        ...state,
        exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? {
          ...exam, questions: exam.questions.map((question, i) => (i === action.payload.questionIndex ? {
            ...question, answers: question.answers.map((answer, i) => (i === action.payload.answerIndex ? action.payload.answer : answer))
          } : question))
        } : exam)),
        save: true
      };

    case 'INIT_DATA':
      return { ...action.payload, initialized: true };

    case 'UPDATE_STORAGE':
      return { ...state, save: false };

    default:
      throw new Error();
  }
}

const App = () => {

  const [data, dispatch] = useReducer(reducer, dataInit);

  // save initial data to or load existing data from local storage
  useEffect(() => {
    let examData = localStorage.getItem('examData');
    if (examData == null) {
      localStorage.setItem('examData', JSON.stringify(dataInit))
      dispatch({ type: 'INIT_DATA', payload: dataInit })
    } else {
      dispatch({ type: 'INIT_DATA', payload: (JSON.parse(examData)) })
    }
  }, []);

  // update local storage if data has changed
  useEffect(() => {
    if (data.save == true) {
      localStorage.setItem('examData', JSON.stringify(data))
      dispatch({ type: 'UPDATE_STORAGE', payload: false })
    }
  }, [data.save]);

  return (
    <div>
      <Header />
      <div className="center">
        <nav>
          <ul className="testMenu">
            {data.initialized && data.exams.map(exam => <li><a href="">{exam.name}</a></li>)}
          </ul>
        </nav>
        {data.initialized && <Exam exam={data.exams[0]} examIndex='0' dispatch={dispatch} />}
        <nav>
          <a href="" className="showAns">Näytä vastaukset</a>
        </nav>
      </div>
    </div>
  );
}

export default App;


