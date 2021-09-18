import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
// import Settings from 'src/pages/Settings';
import Dashboard from 'src/pages/Dashboard';

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Login /> },
      { path: 'app', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ]
  },
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <Account /> },
      { path: '*', element: <NotFound /> },
      { path: 'dashboard', element: <Dashboard /> },
    ]
  },
];

export default routes;
