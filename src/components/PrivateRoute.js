
// import { Outlet, Navigate } from 'react-router-dom'
// import { useAuth } from '../subComponents/Auth'

// function PrivateRoutes() {
//     const token = useAuth()
//     return token ? <Outlet /> : <Navigate to='/login' />
// }

// export default PrivateRoutes




import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../subComponents/Auth';

function PrivateRoutes() {
  const isAuthenticated = useAuth(); // Check if the user is authenticated

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;




// import { Outlet, Navigate } from 'react-router-dom';
// import { useAuth } from '../subComponents/Auth';

// function PrivateRoutes() {
//   const token = useAuth(); // Assuming this hook returns the auth token or a boolean indicating if the user is authenticated

//   return token ? <Outlet /> : <Navigate to="/login" />;
// }

// export default PrivateRoutes;


// import { Outlet, Navigate } from 'react-router-dom';
// import { useAuth } from '../subComponents/Auth';

// function PrivateRoutes() {
//   const isAuthenticated = useAuth(); // Returns true if the user is authenticated

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// }

// export default PrivateRoutes;
