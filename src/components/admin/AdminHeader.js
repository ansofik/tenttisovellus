
import {
  Link
} from 'react-router-dom'

const AdminHeader = () => {
  return (
    <header>
      <nav>
        <ul className="navbar">
          <li><Link to='/'>etusivu</Link></li>
          <li><Link to='/admin/exams'>tentit</Link></li>
          {/* <li><a href="">poistu</a></li> */}
        </ul>
      </nav>
    </header>
  )
}

export default AdminHeader;