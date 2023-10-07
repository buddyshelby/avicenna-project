import { store} from '../Function/store'
import { getDataUser as loadDataUser } from '../model/modelDataUser'
import { defer, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../model/modelPassword'
import LayoutNewPassword from '../views/ResetPassword/NewPassword/NewPassword'
import LayoutResetPassword from '../views/ResetPassword/ResetPassword'
import { useEffect } from 'react';
import { reset } from '../Function/authSlice';

const Password = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
const { user, isLoading, isError } = useSelector(state => state.auth)
const { id:paramsId } = useParams()
const params = paramsId.toLocaleLowerCase()


useEffect(() => {

    try {
        if (user.msg === "Password Updated") {
            dispatch(reset())
            navigate('/')
        }
    } catch (error) {
        
    }

    if (user === null && isError) {
        navigate('/')
    }
    
// eslint-disable-next-line
},[params, user, isError, isLoading])

if (!isLoading && params === 'change') {
    return <LayoutNewPassword />
} else if (!isLoading && params === 'reset') {
    return <LayoutResetPassword />
}

}

export default Password

const passLoad = async () => { 
    await store.dispatch(loadDataUser())
}

export const loader = () => {
    return defer({
        events: passLoad(),
    });
}

export const action = async ({ request }) => {

    const data = await request.formData();

    if (request.url === 'http://localhost:3000/password/change') {
        const { user } = store.getState(state => state.auth).auth
        const allData = {id_user: user.id_user}
        for (const pair of data.entries()) {
            const [name, value] = pair;
            allData[name] = value
        }
        await store.dispatch(changePassword(allData))
    }

    return { message: 'Signup successful!' };
}