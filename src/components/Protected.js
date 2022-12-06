
import { Navigate } from "react-router-dom"

const Protected = ({user, admin, children}) => {
    if (user === null || (admin && user.admin === false) || (!admin && user.admin === true)) {
        return <Navigate replace to='/'/>
    }
    return children
}

export default Protected