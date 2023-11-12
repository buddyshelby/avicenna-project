import { store } from '../Function/store'
import { editUser } from '../model/modelEditUser'
import { getAllDataUser } from '../model/modelDataUser'
import { defer, useNavigate, useParams } from 'react-router-dom';
import Layout from '../views/User/EditUser/EditUser'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { reset } from '../Function/authSlice';
import { SuccessDisplay } from '../views/Status/Sukses/Success';
import { FailedDisplay } from '../views/Status/Gagal/Failed';

const ControllerEditUser = () => {

    const { id_user } = useParams()
    const { isLoading, isSuccessEditUser, isErrorEditUser, userGetAllDataUser } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading) {
            if (userGetAllDataUser === null) {
                navigate('/')
            } else if (userGetAllDataUser.filter(item => item.id_user === id_user).length === 0) {
                navigate('/addUser')
            }
            
        }
    }, [id_user, userGetAllDataUser, isLoading, isSuccessEditUser, isErrorEditUser, navigate])

    if (isSuccessEditUser)
        return <SuccessDisplay buttonValue="Back to Add Acoount" link="/editUser" reset={false}>Added Account Successfully</SuccessDisplay>
    else if (isErrorEditUser)
        return <FailedDisplay buttonValue="Back to Home" link="/">Failed to Added Account</FailedDisplay>

    return userGetAllDataUser && (userGetAllDataUser.filter(item => item.id_user === id_user).length !== 0) && <Layout getAllUsers={userGetAllDataUser} id_user={id_user} />
}

export default ControllerEditUser

const editUserLoad = async () => {

    await store.dispatch(getAllDataUser())

}

export const loader = () => {
    return defer({
        events: editUserLoad(),
    });
}

export const action = async ({ request }) => {

    const data = await request.formData();
    const allData = {}
    const postData = {
        id_role: data.get('edit_role'),
        username: data.get('edit_username'),
        password: data.get('edit_password'),
        confPassword: data.get('edit_confirm_password'),
        name: data.get('edit_name'),
        fullname: data.get('edit_full_name'),
        email: data.get('edit_email'),
        alamat: data.get('edit_address'),
        no_hp: data.get('edit_phone'),
        jabatan: data.get('edit_jabatan'),
    }

    for (const pair of data.entries()) {
        const [name, value] = pair;
        allData[name] = value
    }

    console.log(allData);

    // store.dispatch(reset())

    // await store.dispatch(editUser(postData)).then(res => {
    //     return {msg:'Create User Succeeded'}
    // }).catch(err => {
    //     return err
    // })
}