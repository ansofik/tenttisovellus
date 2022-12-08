import '../Header.css';
import {
  Link
} from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="navbar">
          <li><Link to='/'>etusivu</Link></li>
          <li><Link to='/exams'>tentit</Link></li>
          {/* <li><a href="">poistu</a></li> */}
        </ul>
      </nav>
    </header>
  )
}

export default Header;


        