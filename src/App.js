import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login, { action as loginAction } from './views/Login/Login'
import Signup from './views/Signup/Signup'
import Dashboard, { action as dashboardAction } from './views/Dashboard/Dashboard'
// import Navbar from './components/navbar/Navbar'
import RootLayout from './pages/RootPage'
import ErrorPage from './views/Error/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login />, action: loginAction, },
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
        path: 'dashboard',
        element: <Dashboard />,
        action: dashboardAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
