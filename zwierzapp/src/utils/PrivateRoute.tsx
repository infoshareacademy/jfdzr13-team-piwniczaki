import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from '../context/AuthContext';

function PrivateRoute() {

  const { currentUser } = useAuth()
  const location = useLocation();
  console.log(currentUser)
  return (
    <>
    {currentUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}
    </>
  );
}

export default PrivateRoute;