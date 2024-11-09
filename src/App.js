// import './App.css';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import ResetPassword from './components/ResetPassword';
// import OTP from './components/OTP';
// import ForgotPassword from './components/ForgotPassword';
// import Login from './components/Login';
// import Main from './components/Main';
// import Dashboard from './components/Dashboard';
// import PrivateRoutes from './components/PrivateRoute '
// import PublicRoutes from './components/PublicRoutes'
// // import { PrivateRoute } from './components/PrivateRoute ';


// function App() {
//   const loginData = JSON.parse(localStorage.getItem('loginData'));
//   console.log('loginDataApp====', loginData);

//   return (
//     <div className="App">

//       {/* <Routes>
//         <Route element={<PrivateRoutes />}>
//           <Route path="/" element={<Main />} />
//           <Route path="otp" element={<OTP />} />
//           <Route path="forgotpassword" element={<ForgotPassword />} />
//           <Route path="resetpassword" element={<ResetPassword />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Route>
//         <Route element={<PublicRoutes />}>
//           <Route element={<Login />} path='/login' />
//         </Route>
//       </Routes> */}

//       <Routes>
//         <Route path="login" element={<Login />} />
//         <Route path="/" element={<Main />} />
//         <Route path="otp" element={<OTP />} />
//         <Route path="forgotpassword" element={<ForgotPassword />} />
//         <Route path="resetpassword" element={<ResetPassword />} />
//         <Route path="/dashboard" element={<Dashboard />} />

//         {/* <Route path="/dashboard" element={loginData?.email ? <Dashboard /> : <Navigate to="/login" />} />
//         <PrivateRoute component={Dashboard} path="/dashboard"/> */}

//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;





import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import ResetPassword from './components/ResetPassword';
import OTP from './components/OTP';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import Main from './components/Main';
import Dashboard from './components/Dashboard';
import PrivateRoutes from './components/PrivateRoute';
import PublicRoutes from './components/PublicRoutes';

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="otp" element={<OTP />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="resetpassword" element={<ResetPassword />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Redirect all other paths to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;





// import './App.css';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import ResetPassword from './components/ResetPassword';
// import OTP from './components/OTP';
// import ForgotPassword from './components/ForgotPassword';
// import Login from './components/Login';
// import Main from './components/Main';
// import Dashboard from './components/Dashboard';
// import PrivateRoutes from './components/PrivateRoute ';
// import PublicRoutes from './components/PublicRoutes';

// function App() {
//   const loginData = JSON.parse(localStorage.getItem('loginData'));
//   console.log('loginDataApp====', loginData);

//   return (
//     <div className="App">
//       <Routes>
//         {/* Public Routes */}
//         <Route element={<PublicRoutes />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/otp" element={<OTP />} />
//           <Route path="/forgotpassword" element={<ForgotPassword />} />
//           <Route path="/resetpassword" element={<ResetPassword />} />
//         </Route>

//         {/* Private Routes */}
//         <Route element={<PrivateRoutes />}>
//           <Route path="/" element={<Main />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Route>

//         {/* Redirect all other paths to login */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;



// import './App.css';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import ResetPassword from './components/ResetPassword';
// import OTP from './components/OTP';
// import ForgotPassword from './components/ForgotPassword';
// import Login from './components/Login';
// import Main from './components/Main';
// import Dashboard from './components/Dashboard';
// import PrivateRoutes from './components/PrivateRoute '; // Fixed import path
// import PublicRoutes from './components/PublicRoutes';

// function App() {
//   const loginData = JSON.parse(localStorage.getItem('loginData'));
//   console.log('loginDataApp====', loginData);

//   return (
//     <div className="App">
//       <Routes>
//         {/* Public Routes */}
//         <Route element={<PublicRoutes />}>
//           <Route path="/login" element={<Login />} />

//         </Route>

//         {/* Private Routes */}
//         <Route element={<PrivateRoutes />}>
//           <Route path="/" element={<Main />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/otp" element={<OTP />} />
//           <Route path="/forgotpassword" element={<ForgotPassword />} />
//           <Route path="/resetpassword" element={<ResetPassword />} />
//         </Route>

//         {/* Redirect all other paths to login */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

