import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login, { action as loginAction, loader as loginLoader } from './controller/controllerLogin'
import AddUser, { action as addUserAction, loader as addUserLoader } from './controller/controllerAddUser'
import Dashboard, { loader as dashboardLoader } from './controller/controllerDashboard'
import ResetPassword from './views/ResetPassword/ResetPassword'
import NewPassword from './views/ResetPassword/NewPassword/NewPassword'
import RootLayout from './views/pages/RootPage'
import ErrorPage from './views/Error/ErrorPage'

function App() {
  // eslint-disable-next-line
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Login />, action: loginAction, loader: loginLoader },
        {
          path: 'login',
          element: <Login />,
          action: loginAction,
          loader: loginLoader
        },
        {
          path: 'addUser',
          element: <AddUser />,
          action: addUserAction,
          loader: addUserLoader,
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
          loader: dashboardLoader
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;