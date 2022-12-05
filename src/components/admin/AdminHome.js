const AdminHome = ({ user }) => {
    console.log('home',user)
    return (
      <div>
        <h1>Etusivu</h1>
        <div>Kirjautuneena käyttäjänä <i>{user.username}</i></div>
      </div>
    )
  }
  
  export default AdminHome;