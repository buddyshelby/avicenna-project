import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login, { Action as loginAction } from './views/Login/Login'
import Signup from './views/Signup/Signup'
import ResetPassword from './views/ResetPassword/ResetPassword'
import NewPassword from './views/ResetPassword/NewPassword/NewPassword'
import Dashboard, { action as dashboardAction } from './views/Dashboard/Dashboard'
// import Navbar from './components/navbar/Navbar'
import RootLayout from './pages/RootPage'
import ErrorPage from './views/Error/ErrorPage'

function App() {
  // eslint-disable-next-line
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Login />, action: loginAction },
        {
          path: 'login',
          element: <Login />,
          action: loginAction,
        },
        {
          path: 'signup',
          element: <Signup />,
          // action: loginAction,
        },
        {
          path: 'reset_password',
          element: <ResetPassword />,
          // action: loginAction,
        },
        {
          path: 'new_password',
          element: <NewPassword />,
          // action: loginAction,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
          action: dashboardAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
