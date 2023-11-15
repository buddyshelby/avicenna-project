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
                navigate('/tableUser')
            }
            
        }
    }, [id_user, userGetAllDataUser, isLoading, isSuccessEditUser, isErrorEditUser, navigate])

    if (isSuccessEditUser)
        return <SuccessDisplay buttonValue="Back to Table User" link="/tableUser" reset={false}>Edited Account Successfully</SuccessDisplay>
    else if (isErrorEditUser)
        return <FailedDisplay buttonValue="Back to Home" link="/">Failed to Edited Account</FailedDisplay>

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
    const url = request.url
    const id_user = url.split(/.*\//)[1]

    const allData = {id_user: id_user, update: {}}

    for (const pair of data.entries()) {
        const [name, value] = pair;
        if (value !== '') {
            allData['update'][name] = value
        }
    }

    store.dispatch(reset())
    await store.dispatch(editUser(allData)).then(res => {
        return {msg:'Edit User Succeeded'}
    }).catch(err => {
        return err
    })
}