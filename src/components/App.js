import './App.css';
import Login from './Login';
import Header from './Header';
import Home from './Home';
import Exams from './Exams';
import Exam from './Exam';
import EditExam from './EditExam';
import { useReducer, useEffect } from 'react';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom'

function reducer(state, action) {
  switch (action.type) {

    case 'EXAM_NAME_CHANGED':
      console.log("changing exam name")
      return {
        ...state,
        exams: state.exams.map(exam => exam.id == state.selectedExamId ? { ...exam, name: action.payload } : exam),
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

    case 'DELETE_QUESTION':
      return {
        ...state,
        exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? {
          ...exam, questions: exam.questions.filter((question, i) => i != action.payload.questionIndex)
        } : exam)),
        save: true
      };

    case 'ADD_QUESTION': {
      const newQuestion = { question: "q", answers: ["a", "a"], indexOfCorrectAns: 0 };
      return {
        ...state,
        exams: state.exams.map((exam, i) => (i == action.payload.examIndex ? {
          ...exam, questions: [...exam.questions.slice(0, action.payload.questionIndex + 1), newQuestion, ...exam.questions.slice(action.payload.questionIndex + 1)]
        } : exam)),
        save: true
      };
    }

    case 'INIT_DATA':
      console.log("initialize data")
      console.log(action.payload);

      return { ...state, exams: action.payload, initialized: true, save: false };

    case 'SELECT_EXAM':
      console.log('select exam');
      console.log(action.payload);
      return { ...state, selectedExamId: action.payload, selectedExamSaved: false }

    case 'STORE_EXAM':
      console.log('store exam loaded from server');
      console.log(action.payload);
      return {
        ...state,
        exams: state.exams.map(exam => exam.id == action.payload.id ? action.payload : exam),
        selectedExamSaved: true
      }

    case 'STORE_USER':
      console.log(action.payload)
      return { ...state, user: action.payload }

    case 'UPDATED_STORAGE':
      return { ...state, save: false };

    default:
      throw new Error();
  }
}

const App = () => {

  const [data, dispatch] = useReducer(reducer, { user: null, initialized: false, selectedExamId: null });

  // get exam titles from the server
  useEffect(() => {
    const getExamData = async () => {
      try {
        const response = await axios('http://localhost:8080/exams')
        console.log("response", response);
        dispatch({ type: 'INIT_DATA', payload: response.data });
      } catch (error) {
        console.log("Error", error)
      }
    }
    if (data.user !== null) {
      getExamData()
    }
  }, [data.user]);

  // get questions and answer options from selected exam from the server
  useEffect(() => {
    const getQuestions = async () => {
      console.log("loading questions")
      try {
        console.log(typeof data.selectedExamId)
        const response = await axios(`http://localhost:8080/exams/${data.selectedExamId}/`)
        console.log("response for get questions", response)
        dispatch({ type: 'STORE_EXAM', payload: response.data })
      } catch (err) {
        console.log("could not get exam questions and options", err)
      }
    }
    if (data.selectedExamId !== null) {
      getQuestions()
    }
  }, [data.selectedExamId])

  return (
    <Router>
      <Routes>

        <Route path='/' element={data.user ? <Navigate replace to='/home' /> : <Login /* loginData={data.loginData} */ dispatch={dispatch} />} />

        <Route path='/home' element={data.user ?
          <div>
            <Header />
            <Home user={data.user} />
          </div> : <Navigate replace to='/' />} />

        <Route path='/exams' element={data.user ?
          <div>
            <Header />
            <Exams exams={data.exams} dispatch={dispatch} />
            {data.selectedExamSaved === true && (data.user.admin ?
              <EditExam exam={data.exams.filter(exam => exam.id === data.selectedExamId)[0]} dispatch={dispatch} />
               : <Exam exam={data.exams.filter(exam => exam.id === data.selectedExamId)[0]} dispatch={dispatch} />)}
          </div> : <Navigate replace to='/' />} />

      </Routes>
    </Router>

  );
}

export default App;







