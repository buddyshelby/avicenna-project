import { store} from '../Function/store'
import { getDataUser as loadDataUser } from '../model/modelDataUser'
import { defer, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../views/Dashboard/Dashboard'
import { useEffect } from 'react';

const Dashboard = () => {

const navigate = useNavigate();
const dispatch = useDispatch();
const { isError, isSuccess, user, isLoading } = useSelector(state => state.auth)
const { isLogin } = useSelector(state => state.storage)

useEffect(() => {

    if (user === null) {
        navigate('/')
    }

},[isError, isSuccess, user, isLogin, dispatch, navigate])


return !isLoading &&  <Layout />

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