import './App.css';
import Login from './Login';
import Header from './Header';
import Home from './Home';
import Exams from './Exams';
import Exam from './Exam';
import EditExam from './admin/EditExam';
import AdminHeader from './admin/AdminHeader';
import AdminHome from './admin/AdminHome';
import Protected from './Protected';
import { useReducer, useEffect } from 'react';
import examService from '../services/examService';
import reducer from '../reducers/reducer'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom'


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

        <Route path='/' element={data.user ? <Navigate replace to={data.user.admin? '/admin/home' : '/home'} /> : <Login dispatch={dispatch} />} />

        <Route path='/admin/home' element={
          <Protected user={data.user} admin={true}>
            <AdminHeader />
            <AdminHome user={data.user} />
          </Protected>
        } />

        <Route path='/admin/exams' element={
          <Protected user={data.user} admin={true}>
            <AdminHeader />
            <Exams exams={data.exams} dispatch={dispatch} />
            {data.selectedExamId !== null && <EditExam exam={data.exams.filter(exam => exam.id === data.selectedExamId)[0]} dispatch={dispatch} />}
          </Protected>
        } />

        <Route path='/home' element={
          <Protected user={data.user} admin={false}>
            <Header />
            <Home user={data.user} />
          </Protected>
        } />

        <Route path='/exams' element={
          <Protected user={data.user} admin={false}>
            <Header />
            <Exams exams={data.exams} dispatch={dispatch} />
            {data.selectedExamId !== null && <Exam exam={data.exams.filter(exam => exam.id === data.selectedExamId)[0]} dispatch={dispatch} />}
          </Protected>
        } />

      </Routes>
    </Router >

  );
}

export default App;







