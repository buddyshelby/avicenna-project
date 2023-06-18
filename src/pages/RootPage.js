import { Outlet } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar'

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
    <Navbar />
    <Outlet />
    </>
  );
}

export default RootLayout;