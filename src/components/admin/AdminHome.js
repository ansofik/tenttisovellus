import '../Home.css';

const AdminHome = ({ user }) => {
    console.log('home', user)
    return (
      <div className='home'>
        <h1 data-test='homeHeading'>Etusivu</h1>
        <div>
          <p>Kirjautuneena käyttäjänä <i>{user.username}</i></p>
          <p>Luo uusi tentti tai muokkaa olemassa olevaa tenttiä Tentit-välilehdellä</p>
          </div>
      </div>
    )
  }
  
  export default AdminHome;