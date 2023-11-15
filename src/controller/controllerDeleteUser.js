import { store } from '../Function/store'
import { deleteUser } from '../model/modelDeleteUser'
import { getAllDataUser } from '../model/modelDataUser'
import { defer, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { reset } from '../Function/authSlice';
import { SuccessDisplay } from '../views/Status/Sukses/Success';
import { FailedDisplay } from '../views/Status/Gagal/Failed';

const ControllerDeleteUser = () => {

    const { id_user } = useParams()
    const { isLoading, isSuccessDeleteUser, isErrorDeleteUser, userGetAllDataUser } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoading) {
            if (userGetAllDataUser === null) {
                navigate('/')
            } else if (userGetAllDataUser.filter(item => item.id_user === id_user).length === 0) {
                navigate('/tableUser')
            } else if (!isSuccessDeleteUser && !isErrorDeleteUser) {
                dispatch(deleteUser(id_user))
            }
            
        }
    }, [id_user, userGetAllDataUser, isLoading, isSuccessDeleteUser, isErrorDeleteUser, navigate])

    if (isSuccessDeleteUser)
        {
            return <SuccessDisplay buttonValue="Back to Table User" link="/tableUser" reset={false}>Deleted Account Successfully</SuccessDisplay>
        }
    else if (isErrorDeleteUser)
        {
            return <FailedDisplay buttonValue="Back to Home" link="/">Failed to Delete Account</FailedDisplay>
        }
}

export default ControllerDeleteUser

const deleteUserLoad = async () => {

    await store.dispatch(getAllDataUser())

}

export const loader = () => {
    return defer({
        events: deleteUserLoad(),
    });
}