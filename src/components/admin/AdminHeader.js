import '../Header.css';
import {
  Link
} from 'react-router-dom'

const AdminHeader = ({ dispatch }) => {

  const logout = () => {
    console.log('remove token from localStorage');
    localStorage.removeItem('loggedInUser')
    dispatch({type: 'LOGOUT'})
  }

  return (
    <header>
      <nav>
        <ul className="navbar">
          <li><Link to='/opettaja/etusivu'>etusivu</Link></li>
          <li><Link to='/opettaja/tentit'>tentit</Link></li>
          {/* <li><Link to='/opettaja/suoritukset'>Suoritukset</Link></li> */}
          <li><button type='button' onClick={logout}>Kirjaudu ulos</button></li>
        </ul>
      </nav>
    </header>
  )
}

export default AdminHeader;