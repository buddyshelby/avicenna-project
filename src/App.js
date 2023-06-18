import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login, { action as loginAction } from './views/Login/Login'
import Navbar from './components/navbar/Navbar'
import RootLayout from './pages/RootPage'
import ErrorPage from './views/Error/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login />,action: loginAction, },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
