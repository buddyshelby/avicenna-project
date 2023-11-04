import { store } from '../Function/store'
import { getDataUser as loadDataUser } from '../model/modelDataUser'
import { defer, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, resetPassword, resetedPassword } from '../model/modelPassword'
import LayoutNewPassword from '../views/ResetPassword/NewPassword/NewPassword'
import LayoutResetPassword from '../views/ResetPassword/ResetPassword'
import { FailedDisplay } from '../views/Status/Gagal/Failed'
import { SuccessDisplay } from '../views/Status/Sukses/Success';
import { reset, resetLogout } from '../Function/authSlice';

const Password = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
const allState = useSelector(state => state.auth)
const { isLoading, isSuccessResetedPassword, isErrorResetedPassword, isSuccessChangePassword, isErrorChangePassword, isSuccessResetPassword, isErrorResetPassword, userGetDataUser } = useSelector(state => state.auth)
const { id:paramsId } = useParams()
const params = paramsId.toLowerCase()

if (!isLoading) {
    if ((!userGetDataUser && params === 'change') || (userGetDataUser && params === 'reset')){
        dispatch(reset())
        navigate('/')
    }

    if (isSuccessChangePassword)
    {
        return <SuccessDisplay buttonValue="Back to Home" link="/" reset={true}>Added Account Successfully</SuccessDisplay>
    }
    else if (isErrorChangePassword) {
        dispatch(reset())
        return <FailedDisplay buttonValue="Back" link="/">Your Password Failed to Change</FailedDisplay>
    }

    if (isSuccessResetPassword)
        return <SuccessDisplay buttonValue="Verified" link="https://www.gmail.com">Please Check Your Email :)</SuccessDisplay>
    else if (isErrorResetPassword)
    return <FailedDisplay buttonValue="Back" link="/">Sorry, we cant generate link reset password to you :(</FailedDisplay>
    }

    if (isSuccessResetedPassword)
        return <SuccessDisplay buttonValue="Check Email" link="https://www.gmail.com">Your Password Successfully to Reset<br/>Please Check Your Email Once Again :)</SuccessDisplay>
    else if (isErrorResetedPassword)
        return <FailedDisplay buttonValue="Back" link="/">Your Password Failed to Reset</FailedDisplay>

    if (params === 'change') {
        return <LayoutNewPassword />
    } else if (params === 'reset') {
        return <LayoutResetPassword />
    }

}

export default Password

const passLoad = async ({ params }) => {
    const allState = store.getState(state => state.auth).auth
    const {isLoading} = store.getState(state => state.auth).auth
    if (!isLoading)
    if (params.id.length === 500) {
        await store.dispatch(resetedPassword({uniq_id : params.id}))
        .then( async (res) => {
            store.dispatch(res)
        })
        
    } else {
        await store.dispatch(loadDataUser())
    }
}

export const loader = (e) => {
    return defer({
        events: passLoad(e),
    });
}

export const action = async ({ request }) => {

    const data = await request.formData();

    if (request.url === 'http://localhost:3000/password/change') {
        const { userGetDataUser } = store.getState(state => state.auth).auth
        const allData = {id_user: userGetDataUser.id_user}
        for (const pair of data.entries()) {
            const [name, value] = pair;
            allData[name] = value
        }
        await store.dispatch(changePassword(allData))
    } else {
        const email = data.get('email')
        await store.dispatch(resetPassword({email}))
    }

    return { message: 'Signup successful!' };
}