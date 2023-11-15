import { store } from '../Function/store'
import { getAllDataUser as loadDataUser } from '../model/modelDataUser'
import { defer, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../views/User/TableUser/TableUser'
import { useEffect } from 'react';

const ControllerTableUser = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, userGetAllDataUser } = useSelector(state => state.auth)
    
    useEffect(() => {

        try {
            if (!isLoading)
                if (!userGetAllDataUser)
                    navigate('/')
        } catch (error) {
            
        }

    },[isLoading, userGetAllDataUser, dispatch, navigate])

    return !isLoading &&  <Layout getAllUsers={userGetAllDataUser} />

}

export default ControllerTableUser

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