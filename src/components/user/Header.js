import '../Header.css';
import {
  Link
} from 'react-router-dom'

const Header = ({dispatch}) => {

  const logout = () => {
    console.log('remove token from localStorage');
    localStorage.removeItem('loggedInUser')
    dispatch({type: 'LOGOUT'})
  }


  return (
    <header>
      <nav>
        <ul className="navbar">
          <li><Link to='/etusivu'>etusivu</Link></li>
          <li><Link to='/tentit'>tentit</Link></li>
          {/* <li><a href="">poistu</a></li> */}
          <li><button type='button' onClick={logout}>Kirjaudu ulos</button></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;


        