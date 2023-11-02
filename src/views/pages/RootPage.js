import { store } from '../../Function/store'
import { defer, Outlet, useLocation } from 'react-router-dom';
import { getDataUser as loadDataUser } from '../../model/modelDataUser'
import Loading from '../components/loading/Loading';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import './root-page.css'

const RootLayout = (props) => {

  const { isLoading, userGetDataUser, userGetAllDataUser } = useSelector(state => state.auth)
  const { pathname } = useLocation()

  return (
    <>
    {(userGetDataUser || userGetAllDataUser) ? <div id='layout'>
      <div className='wrapper'>
        <div className='left--layout'>
          <Navbar />
        </div>
        <div className='right--layout'>
          {isLoading ? <Loading/> : <Outlet />}
        </div>
      </div>
    </div> :
      <>
        {isLoading ? <Loading/> : <Outlet/>}
      </>}
    </>
  );
}

export default RootLayout;

const dashLoad = async () => { 
  await store.dispatch(loadDataUser())
}

export const loader = () => {
  return defer({
      events: dashLoad(),
  });
}