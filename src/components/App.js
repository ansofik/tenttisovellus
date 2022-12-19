import './App.css';
import Login from './Login';
import Register from './Register';
import Header from './user/Header';
import Home from './user/Home';
import Exams from './admin/Exams';
import Exam from './user/Exam';
import EditExam from './admin/EditExam';
import AdminHeader from './admin/AdminHeader';
import AdminHome from './admin/AdminHome';
import UserExams from './user/UserExams';
import Protected from './Protected';
import { useReducer, useEffect } from 'react';
import examService from '../services/examService';
import reducer from '../reducers/reducer'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from 'react-router-dom'


const App = () => {

  const [data, dispatch] = useReducer(reducer, { user: null, initialized: false, selectedExam: null });

  // get exam titles from the server
  useEffect(() => {
    console.log('useeffect');
    const getExamData = async () => {
      try {
        let exams;
        if (data.user.admin) {
          exams = await examService.getExams()
        } else {
          exams = await examService.getPublishedExams()
        }
        dispatch({ type: 'INIT_DATA', payload: exams });
      } catch (error) {
        console.log("Error", error)
      }
    }
    if (data.user !== null) {
      getExamData()
    }
  }, [data.user]);
  
  useEffect(() => {
    const loggedInUser= localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      dispatch({ type: 'STORE_USER', payload: JSON.parse(loggedInUser) })
    }
  }, [])

  return (
    <Router>
      <Routes>
        {console.log('rendering....., user:', data.user)}

        <Route path='/' element={data.user ?
         <Navigate replace to={data.user.admin ?'/opettaja/etusivu' : '/etusivu'} /> : <Login dispatch={dispatch} />} />

        <Route path='/luo-tunnus' element = {data.user ?
         <Navigate replace to={data.user.admin ? '/opettaja/etusivu' : '/etusivu'}/> : <Register dispatch={dispatch} /> }/>

        <Route path='/opettaja/etusivu' element={
          <Protected user={data.user} admin={true}>
            <AdminHeader dispatch={dispatch} />
            <AdminHome user={data.user} />
          </Protected>
        } />

        <Route path='/opettaja/tentit' element={
          <Protected user={data.user} admin={true}>
            <AdminHeader dispatch={dispatch}/>
            {data.initialized && <Exams exams={data.exams} dispatch={dispatch} />}
            {data.selectedExam !== null && <EditExam exam={data.selectedExam} dispatch={dispatch} />}
          </Protected>
        } />

        <Route path='/etusivu' element={
          <Protected user={data.user} admin={false}>
            <Header dispatch={dispatch}/>
            <Home user={data.user} />
          </Protected>
        } />

        <Route path='/tentit' element={
          <Protected user={data.user} admin={false}>
            <Header dispatch={dispatch}/>
            <UserExams exams={data.exams} dispatch={dispatch} />
            {data.selectedExam !== null && <Exam exam={data.selectedExam} takenExamId={data.takenExamId} dispatch={dispatch } />}
          </Protected>
        } />

      </Routes>
    </Router >

  );
}

export default App;







