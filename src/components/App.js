import './App.css';
import Login from './Login';
import Header from './Header';
import Home from './Home';
import Exams from './Exams';
import Exam from './Exam';
import EditExam from './admin/EditExam';
import { useReducer, useEffect } from 'react';
import examService from '../services/examService';
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom'

function reducer(state, action) {
  switch (action.type) {

    case 'ADD_EXAM':
      console.log('adding new exam title');
      return {
        ...state,
        exams: [...state.exams, { id: action.payload, name: 'Uusi tentti', questions: []}],
        selectedExamId: action.payload
      }

    case 'DELETE_EXAM':
      return {
        ...state,
        exams: state.exams.filter(exam => exam.id !== action.payload),
        selectedExamId: null
      };


    case 'EXAM_NAME_CHANGED':
      console.log("changing exam name to", action.payload)
      return {
        ...state,
        exams: state.exams.map(exam => exam.id == state.selectedExamId ? { ...exam, name: action.payload } : exam)
      };

    case 'QUESTION_CHANGED':
      console.log('changing question');

      return {
        ...state,
        exams: state.exams.map(exam => (exam.id == state.selectedExamId ? {
          ...exam, questions: exam.questions.map(question => (question.questionId === action.payload.questionId ? {
            ...question, questionText: action.payload.text
          } : question))
        } : exam))
      };

    case 'OPTION_CHANGED':
      return {
        ...state,
        exams: state.exams.map(exam => (exam.id == state.selectedExamId ? {
          ...exam, questions: exam.questions.map(question => (question.questionId === action.payload.questionId ? {
            ...question, options: question.options.map(option => (option.optionId === action.payload.optionId ? {
              ...option, optionText: action.payload.text, correct: action.payload.correct
            }
              : option))
          } : question))
        } : exam))
      };

    case 'ADD_QUESTION': {
      return {
        ...state,
        exams: state.exams.map(exam => (exam.id == state.selectedExamId ? {
          ...exam, questions: [...exam.questions, { questionId: action.payload, questionText: '', options: [] }]
        } : exam))
      };
    }

    case 'DELETE_QUESTION':
      return {
        ...state,
        exams: state.exams.map(exam => (exam.id == state.selectedExamId ? {
          ...exam, questions: exam.questions.filter(question => question.questionId != action.payload)
        } : exam))
      };

    case 'ADD_OPTION': {
      return {
        ...state,
        exams: state.exams.map(exam => (exam.id == state.selectedExamId ? {
          ...exam, questions: exam.questions.map(question => (question.questionId === action.payload.questionId ? {
            ...question, options: [...question.options, { optionId: action.payload.optionId, optionText: '', correct: false }]
          } : question))
        } : exam))
      };
    }

    case 'DELETE_OPTION':
      return {
        ...state,
        exams: state.exams.map(exam => (exam.id == state.selectedExamId ? {
          ...exam, questions: exam.questions.map(question => (question.questionId === action.payload.questionId ? {
            ...question, options: question.options.filter(option => option.optionId !== action.payload.optionId)
          } : question))
        } : exam))
      };


    case 'INIT_DATA':
      console.log("initialize data")
      console.log(action.payload);

      return { ...state, exams: action.payload, initialized: true, save: false };

    case 'SELECTED_EXAM':
      console.log('select exam');
      console.log(action.payload);
      return {
        ...state,
        exams: state.exams.map(exam => exam.id == action.payload.id ? action.payload : exam),
        selectedExamId: action.payload.id
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
        const exams = await examService.getExams()
        dispatch({ type: 'INIT_DATA', payload: exams });
      } catch (error) {
        console.log("Error", error)
      }
    }
    if (data.user !== null) {
      getExamData()
    }
  }, [data.user]);

  return (
    <Router>
      <Routes>
        {console.log('rendering.....')}

        <Route path='/' element={data.user ? <Navigate replace to='/home' /> : <Login dispatch={dispatch} />} />

        <Route path='/home' element={data.user ?
          <div>
            <Header />
            <Home user={data.user} />
          </div> : <Navigate replace to='/' />} />

        <Route path='/exams' element={data.user ?
          <div>
            <Header />
            <Exams exams={data.exams} dispatch={dispatch} />
            {data.selectedExamId !== null && (data.user.admin ?
              <EditExam exam={data.exams.filter(exam => exam.id === data.selectedExamId)[0]} dispatch={dispatch} />
              : <Exam exam={data.exams.filter(exam => exam.id === data.selectedExamId)[0]} dispatch={dispatch} />)}
          </div> : <Navigate replace to='/' />} />

      </Routes>
    </Router>

  );
}

export default App;







