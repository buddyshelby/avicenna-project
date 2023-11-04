import { store } from '../Function/store'
import { loginUser } from '../model/modelLogin'
import { getDataUser } from '../model/modelDataUser'
import { defer, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../views/Login/Login'
import { useEffect } from 'react';
import { FailedDisplay } from '../views/Status/Gagal/Failed';
import { reset, resetLogout } from '../Function/authSlice';

const ControllerLogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isErrorLoginUser, isSuccessLoginUser, userLoginUser, userGetDataUser, isLoadingLoginUser } = useSelector(state => state.auth);

    if (!isLoadingLoginUser) {
        if (isSuccessLoginUser || userGetDataUser || userLoginUser !== null)
            navigate('/dashboard')
        else if (isErrorLoginUser) {
            return <FailedDisplay buttonValue="Back" link="/">Sorry, something went wrong. You couldn't connect</FailedDisplay>
        }
    }



    return !isLoadingLoginUser && <Layout />
}

export default ControllerLogin

const logLoad = async () => {

    await store.dispatch(getDataUser())

}

export const loader = () => {
    return defer({
        events: logLoad(),
    });
}

export const action = async ({ request }) => {

    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    
    await store.dispatch(loginUser({email,password}))

    return {msg:'Login Succeeded'}
}