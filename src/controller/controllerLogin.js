import { store } from '../Function/store'
import { loginUser } from '../model/modelLogin'
import { getDataUser } from '../model/modelDataUser'
import { defer, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../views/Login/Login'
import { useEffect } from 'react';

window.onerror = function (message, source, lineno, colno, error) {
  // Handle XHR errors here without logging to the console
  console.error("An XHR error occurred:", error);
  // Optionally, return true to suppress default browser error handling
  return true;
};

const ControllerLogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError, isSuccess, user, isLoading } = useSelector(state => state.auth);
    const { isLogin } = useSelector(state => state.storage);

    useEffect(() => {

<<<<<<< HEAD
        if (user) {
            navigate('/dashboard')
        }
=======
        if (isSuccessLoginUser || userGetDataUser || userLoginUser !== null)
        navigate('/dashboard')
        else if (isErrorLoginUser || userLoginUser === null )
        navigate('/')
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)

    },[isLogin, isError, isSuccess, user, dispatch, navigate])

    return !isLoading && <Layout />
}

export default ControllerLogin

const logLoad = async () => {

    await store.dispatch(getDataUser())
    // console.clear()

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