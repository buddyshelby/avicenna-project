import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { MaintenanceDisplay } from './views/Status/Gagal/Failed';
import './App.css';
import Login, { action as loginAction, loader as loginLoader } from './controller/controllerLogin'
import AddUser, { action as addUserAction, loader as addUserLoader } from './controller/controllerAddUser'
import Dashboard, { loader as dashboardLoader } from './controller/controllerDashboard'
import Password, { action as passwordAction, loader as passwordLoader } from './controller/controllerPassword'
import RootLayout from './views/pages/RootPage'
import ErrorPage from './views/Error/ErrorPage'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  // eslint-disable-next-line
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <MaintenanceDisplay buttonValue="Back to Home" link="/">We still under maintenance on this page.</MaintenanceDisplay>,
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
        {
          path: '#/dashboard',
          element: <Dashboard />,
          loader: dashboardLoader
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;