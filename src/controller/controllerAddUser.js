import { store } from '../Function/store'
import { addUser } from '../model/modelAddUser'
import { getAllDataUser } from '../model/modelDataUser'
import { defer, useNavigate } from 'react-router-dom';
import Layout from '../views/AddNewUser/AddNewUser'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { reset } from '../Function/authSlice';

const ControllerAddUser = () => {

    const { isLoading, isSuccess, user: users } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading) {
            if (isSuccess.addUser === true || users === null) {
                navigate('/')
            }
            
        }
    }, [users, isLoading, isSuccess, navigate])

    return (isSuccess.getAll) && <Layout getAllUsers={users.getAllUser} />
}

export default ControllerAddUser

const addUserLoad = async () => {

    store.dispatch(reset())
    await store.dispatch(getAllDataUser()).then(res => res).catch(err => err)

}

export const loader = () => {
    return defer({
        events: addUserLoad(),
    });
}

export const action = async ({ request }) => {

    const data = await request.formData();

    const postData = {
        id_role: data.get('add_role'),
        username: data.get('username'),
        password: data.get('password'),
        confPassword: data.get('confirm_password'),
        name: data.get('name'),
        fullname: data.get('full_name'),
        email: data.get('email'),
        alamat: data.get('address'),
        no_hp: data.get('phone'),
        jabatan: data.get('jabatan'),
    }

    console.log(postData);

    store.dispatch(reset())

    await store.dispatch(addUser(postData)).then(res => {
        return {msg:'Create User Succeeded'}
    }).catch(err => {
        return err
    })
}