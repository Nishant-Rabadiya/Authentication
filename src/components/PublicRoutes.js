
// import { Outlet, Navigate } from 'react-router-dom'
// import { useAuth } from '../subComponents/Auth'

// function PublicRoutes() {
//     const token = useAuth()
//     return token ? <Navigate to='/dashboard' /> : <Outlet />
// }

// export default PublicRoutes



import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../subComponents/Auth';

function PublicRoutes() {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default PublicRoutes;



// import { Outlet, Navigate } from 'react-router-dom';
// import { useAuth } from '../subComponents/Auth';

// function PublicRoutes() {
//   const token = useAuth();

//   return token ? <Navigate to="/" /> : <Outlet />;
// }

// export default PublicRoutes;




// import { Outlet, Navigate } from 'react-router-dom';
// import { useAuth } from '../subComponents/Auth';

// function PublicRoutes() {
//   const isAuthenticated = useAuth();

//   return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
// }

// export default PublicRoutes;
