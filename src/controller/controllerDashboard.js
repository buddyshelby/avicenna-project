import { store } from '../Function/store'
import { getDataUser as loadDataUser } from '../model/modelDataUser'
import { defer, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../views/Dashboard/Dashboard'
import { useEffect } from 'react';
import { FailedDisplay } from '../views/Status/Gagal/Failed';

const Dashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isErrorGetDataUser, isSuccessGetDataUser, userGetDataUser, isLoadingGetDataUser, userLoginUser } = useSelector(state => state.auth)
    
    useEffect(() => {

        try {
            if (!isLoadingGetDataUser)
            if (isErrorGetDataUser || !userGetDataUser && !userLoginUser) {
                navigate('/')
            }
        } catch (error) {
            
        }

    },[isLoadingGetDataUser, isErrorGetDataUser, userLoginUser, isSuccessGetDataUser, userGetDataUser, dispatch, navigate])

    return !isLoadingGetDataUser &&  <Layout />

}

export default Dashboard

const dashLoad = async () => { 
    await store.dispatch(loadDataUser())
}

export const loader = () => {
    return defer({
        events: dashLoad(),
    });
}

export const action = async () => {
    return { message: 'Signup successful!' };
}