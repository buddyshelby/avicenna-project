import { store } from '../Function/store'
import { loginUser } from '../model/modelLogin'
import { getDataUser } from '../model/modelDataUser'
import { defer, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../views/Login/Login'
import { useEffect } from 'react';
import { FailedDisplay } from '../views/Status/Gagal/Failed';

const ControllerLogin = () => {

    const navigate = useNavigate()
    const { isErrorLoginUser, isSuccessLoginUser, userLoginUser, userGetDataUser, isLoading } = useSelector(state => state.auth);

    useEffect(() => {

        try {
            if (!isLoading)
                if (isSuccessLoginUser || userGetDataUser || userLoginUser)
                navigate('/dashboard')
        } catch (error) {
            
        }

    },[isSuccessLoginUser, userGetDataUser, userLoginUser, navigate, isLoading])

    if (!isLoading) {
        if (isErrorLoginUser) {
            return <FailedDisplay buttonValue="Back" link="/">Sorry, something went wrong. You couldn't connect</FailedDisplay>
        }
        else
        return <Layout />
    }

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