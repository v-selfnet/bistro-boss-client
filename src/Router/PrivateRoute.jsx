import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    if(user) return children;
    if(loading) return <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{"--value":70}}>70%</div>
    
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;