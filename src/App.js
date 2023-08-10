import axios from 'axios';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { SetupPage } from './pages/setupPage';
import { login } from './redux/userSlice';
import { Dashboard } from './pages/dashboard';
import { RecordPage } from './pages/recordPage';
import { LoginPage } from './pages/loginPage';
import { UserListPage } from './pages/userListPage';
import { SettingsPage } from './pages/settingsPage';
import { PayrollPage } from './pages/payrollPage';
import { ForgotPasswordPage } from './pages/forgotPasswordPage';
import { ResetPasswordPage } from './pages/resetPasswordPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SetupPage/>,
    children: [
      { path: '/', element: <Dashboard/> },
      { path: '/users', element: <UserListPage/> },
      { path: '/payroll', element: <PayrollPage/> },
      { path: '/settings', element: <SettingsPage/> },
      { path: '/record/:id', element: <RecordPage/> }
    ]
  },
  { path: '/login', element: <LoginPage/> },
  { path: '/forgot-password', element: <ForgotPasswordPage/> },
  { path: '/reset-password/:token', element: <ResetPasswordPage/> }
])

function App() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const [ isAdmin, setIsAdmin ] = useState(false)

  const newPayroll = async() => {
    try {
      await axios.post('http://localhost:8000/api/payrolls', {}, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      console.log('new payroll')
    } catch (err) {
      console.log(err);
    }
  };

  const keepLogin = async() => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/auth', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const { id, name, email, imgProfile, isAdmin, Shift, salary, Role, birthdate } = data.result;
      setIsAdmin(isAdmin)
      dispatch( login( { id, name, email, imgProfile, isAdmin, Shift, salary, Role, birthdate } ) );

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    token ? keepLogin() : console.log('Sign in first');
    isAdmin ? console.log('No New Payroll') : newPayroll();
  }, []);

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
