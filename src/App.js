import './App.css';
import Header from './Header';
import Exam from './Exam';
import { useState, useReducer, useEffect } from 'react';
import axios from 'axios'

function reducer(state, action) {
  switch (action.type) {

    case 'EXAM_NAME_CHANGED':
      console.log("changing exam name")
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
      console.log("initializing data")
      return { ...action.payload, initialized: true, save: false };

    case 'UPDATED_STORAGE':
      return { ...state, save: false };

    default:
      throw new Error();
  }
}

const App = () => {

  const [examData, dispatch] = useReducer(reducer, { initialized: false });
  // user login info hardcoded for testing of authorization to make post requests
  const [loggedInUser, setLoggedInUser] = useState({ username: "user_admin", password: "password_admin" })
  /* const [loggedInUser, setLoggedInUser] = useState({ username: "user0", password: "password0" }) */
 
  const [selectedExam, setSelectedExam] = useState({ index: 0, save: false });

  // get initial data from the server
  useEffect(() => {
    const getExamData = async () => {
      try {
        const response = await axios('http://localhost:8080');
        console.log("response", response);
        dispatch({ type: 'INIT_DATA', payload: response.data });
      } catch (error) {
        console.log("Error", error)
      }
    }
    getExamData()
  }, []);

  // save updated exam data to the server
  useEffect(() => {
    const saveExamData = async () => {
      try {
        const response = await axios.post('http://localhost:8080', {
          data: examData,
          userdata: loggedInUser
        })
        console.log("response", response)
        dispatch({ type: 'UPDATED_STORAGE' })
      } catch (error) {
        console.log("Error", error)
      }
    }
    if (examData.save === true) {
      saveExamData()
    }
  }, [examData.save, selectedExam.save]);


  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (examData.save == true) {
      if (timer !== null) {
        console.log("before", timer)
        clearTimeout(timer)
        console.log("after", timer)
      }
      setTimer(setTimeout(() => alert("Muista tallentaa"), 600000))
    }
  }, [examData.save]);


  return (
    <div>
      <Header />
      <div className="center">
        <nav>
          <ul className="testMenu">
            {examData.initialized && examData.exams.map((exam, i) => <li><button onClick={() => setSelectedExam({ index: i, save: true })}>{exam.name}</button></li>)}
          </ul>
        </nav>
        {examData.initialized && <Exam exam={examData.exams[selectedExam.index]} examIndex={selectedExam.index} dispatch={dispatch} />}
        <nav>
          <a href="" className="showAns">Näytä vastaukset</a>
        </nav>
      </div>
    </div>
  );
}

export default App;
