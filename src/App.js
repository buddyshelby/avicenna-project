import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MaintenanceDisplay } from './views/Status/Gagal/Failed';
import './App.css';
import Login, { action as loginAction, loader as loginLoader } from './controller/controllerLogin'
import AddUser, { action as addUserAction, loader as addUserLoader } from './controller/controllerAddUser'
import EditUser, { action as editUserAction, loader as editUserLoader } from './controller/controllerEditUser'
import DeleteUser, { loader as deleteUserLoader } from './controller/controllerDeleteUser'
import TableUser, { action as tableUserAction, loader as tableUserLoader } from './controller/controllerTableUser'
import Dashboard, { loader as dashboardLoader } from './controller/controllerDashboard'
import Password, { action as passwordAction, loader as passwordLoader } from './controller/controllerPassword'
import RootLayout from './views/pages/RootPage'

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
          path: 'editUser/:id_user',
          element: <EditUser />,
          action: editUserAction,
          loader: editUserLoader,
        },
        {
          path: 'deleteUser/:id_user',
          element: <DeleteUser />,
          loader: deleteUserLoader,
        },
        {
          path: 'tableUser',
          element: <TableUser />,
          action: tableUserAction,
          loader: tableUserLoader,
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

  return (
    <RouterProvider router={router}/>
  );
}

export default App;