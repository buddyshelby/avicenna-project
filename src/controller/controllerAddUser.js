import { store } from '../Function/store'
import { addUser } from '../model/modelAddUser'
import { defer, useNavigate } from 'react-router-dom';
import Layout from '../views/AddUser/AddUser'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { reset } from '../Function/authSlice';

const ControllerAddUser = () => {

    const { isSuccess } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess, navigate])

    return <Layout />
}

export default ControllerAddUser

const addUserLoad = async () => { 

    return {msg : 'loaded'}

}

export const loader = () => {
    return defer({
        events: addUserLoad(),
    });
}

export const action = async ({ request }) => {

    const data = await request.formData();

    const postData = {
        id_role: 1,
        username: data.get('username'),
        password: data.get('password'),
        confPassword: data.get('confPassword'),
        name: data.get('name'),
        fullname: data.get('fullName'),
        email: data.get('email'),
        alamat: data.get('alamat'),
        no_hp: data.get('phone'),
        jabatan: data.get('jabatan'),
    }

    store.dispatch(reset())

    await store.dispatch(addUser(postData)).then(res => {
        return {msg:'Create User Succeeded'}
    }).catch(err => {
        return err
    })
}