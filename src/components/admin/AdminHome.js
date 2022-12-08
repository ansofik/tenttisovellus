import '../Home.css';

const AdminHome = ({ user }) => {
    console.log('home', user)
    return (
      <div className='home'>
        <h1>Etusivu</h1>
        <div>Kirjautuneena käyttäjänä <i>{user.username}</i></div>
      </div>
    )
  }
  
  export default AdminHome;