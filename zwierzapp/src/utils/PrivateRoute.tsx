import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from '../context/AuthContext';

function PrivateRoute() {
  const { currentUser } = useAuth() || {};
  console.log('PrivateRoute currentUser:', currentUser); // Debug log
  const location = useLocation();
  return (
    <>
    {currentUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}
    </>
  );
}

export default PrivateRoute;