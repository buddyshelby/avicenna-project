import { store } from '../Function/store'
import { addUser } from '../model/modelAddUser'
import { getAllDataUser } from '../model/modelDataUser'
import { defer, useNavigate } from 'react-router-dom';
import Layout from '../views/User/AddNewUser/AddNewUser'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { reset } from '../Function/authSlice';
import { SuccessDisplay } from '../views/Status/Sukses/Success';
import { FailedDisplay } from '../views/Status/Gagal/Failed';

const ControllerAddUser = () => {

    const { isLoading, isSuccessAddUser, isErrorAddUser, userGetAllDataUser } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading) {
            if (userGetAllDataUser === null) {
                navigate('/')
            }
            
        }
    }, [userGetAllDataUser, isLoading, isSuccessAddUser, isErrorAddUser, navigate])

    if (isSuccessAddUser)
        return <SuccessDisplay buttonValue="Back to Add Acoount" link="/addUser" reset={false}>Added Account Successfully</SuccessDisplay>
    else if (isErrorAddUser)
        return <FailedDisplay buttonValue="Back to Home" link="/">Failed to Added Account</FailedDisplay>

    return userGetAllDataUser && <Layout getAllUsers={userGetAllDataUser} />
}

export default ControllerAddUser

const addUserLoad = async () => {

    await store.dispatch(getAllDataUser())

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

    store.dispatch(reset())

    await store.dispatch(addUser(postData)).then(res => {
        return {msg:'Create User Succeeded'}
    }).catch(err => {
        return err
    })
}