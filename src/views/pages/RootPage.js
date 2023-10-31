import { Outlet, useLocation } from 'react-router-dom';
import Loading from '../components/loading/Loading';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import './root-page.css'

const RootLayout = (props) => {

  const { isLoadingLoginUser } = useSelector(state => state.auth)
  const { pathname } = useLocation()

  return (
    <>
    <div id='layout'>
      <div className='wrapper'>
        <div className='left--layout'>
          <Navbar />
        </div>
        <div className='right--layout'>
          aaa
        </div>
      </div>
    </div>
    {/* {isLoadingLoginUser ? <Loading /> : <Outlet />} */}
    </>
  );
}

export default RootLayout;