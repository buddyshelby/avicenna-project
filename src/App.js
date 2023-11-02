import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login, { action as loginAction, loader as loginLoader } from './controller/controllerLogin'
import AddUser, { action as addUserAction, loader as addUserLoader } from './controller/controllerAddUser'
import Dashboard, { loader as dashboardLoader } from './controller/controllerDashboard'
import Loading from './views/components/loading/Loading';
import Password, { action as passwordAction, loader as passwordLoader } from './controller/controllerPassword'
import RootLayout from './views/pages/RootPage'
import ErrorPage from './views/Error/ErrorPage'
import { useSelector } from 'react-redux';

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
          path: 'password/:id',
          element: <Password />,
          action: passwordAction,
          loader: passwordLoader,
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
          loader: dashboardLoader
        },
        // {
        //   path: '#/dashboard',
        //   element: <Dashboard />,
        //   loader: dashboardLoader
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;