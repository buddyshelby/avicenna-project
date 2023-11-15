import styles from './add-user.module.css'
import componentStyles from './component-style.module.css'
import { useRef, useEffect, useReducer } from 'react'
import { useFetcher } from 'react-router-dom'
import { useWindowSize } from '../../../Function/SeparateFunction'

const initialState = {
    validName: true,
    validUname: true,
    validPhone: true,
    validEmail: true,
    validCheckDB: '',
    enableRegister: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'validName':

            if (action.lenName < 1) {
                return { ...state, validName: 'INIT' }
            } else if (action.lenName > 11) {
                return { ...state, validName: true }
            } else {
                return { ...state, validName: false }
            }

        case 'validUname':
            return { ...state, validUname: action.valid }
        case 'validPhone':
            return { ...state, validPhone: action.valid }
        case 'validEmail':
            return { ...state, validEmail: action.valid }
        case 'validPass':
            return { ...state, validPass: action.valid, currentPass: action.currentPass }
        case 'validConfirmPass':
            return { ...state, validConfirmPass: action.valid }
        case 'validRole':
            return { ...state, validRole: action.valid }
        case 'enableRegister':
            return { ...state, enableRegister: action.valid }
        default:
            return state;
    }
}

const listRole = [
    {id: 1, name: 'Admin'},
    {id: 2, name: 'Staff'},
    {id: 3, name: 'Pengajar'},
]

const InputElement = ({ name, type, column, value, currentData, input, onChange }) => {
    if (input === 'name')
    return (
        <div className={componentStyles['input--element']}>
            <label htmlFor={name.replace(' ', '_').toLowerCase()}>{ name }</label>
            <input onChange={(e) => {onChange(e, `${name.toUpperCase().split(' ')[1]}`)}} type={type} name={column} placeholder={currentData ? currentData : value} autoComplete={type} />
        </div>
    )
    else if (input === 'select')
    return (
        <div className={`${componentStyles['input--element']} ${componentStyles['select']}`}>
            <label htmlFor={name.replace(' ', '_').toLowerCase()}>{ name }</label>
            <div>
                <select id="dropdown" onChange={(e) => {onChange(e, `${name.toUpperCase()}`)}} name={column} title={name.replace(' ', '_').toLowerCase()}>
                    <option value='' style={{ display: 'none' }}>{ value }</option>
                    {listRole.map((data, index) => {
                        return <option key={index} value={data.id}>{ data.name }</option>
                    })}
                </select>
            </div>
        </div>
    )
    else if (input === 'button')
    return (
        <input className={componentStyles['button']} style={onChange} type={name} value={value} />
    )
}

const EditUser = ({ getAllUsers, id_user }) => {

    // eslint-disable-next-line
    const [width, height] = useWindowSize()
    const refNavbar = useRef(null)
    const fetcher = useFetcher();
    const [state, dispatch] = useReducer(reducer, initialState)
    const { jabatan, alamat, name, fullname, username, email, phone, role } = getAllUsers.filter(item => item.id_user === id_user)[0]
    const { role_name } = role

    const inputList = [
        {
            name: 'Edit Jabatan',
            type: 'name',
            column: 'jabatan',
            value: 'Enter a Jabatan',
            currentData: jabatan,
            input: 'name'
        },
        {
            name: 'Edit Address',
            type: 'name',
            column: 'alamat',
            value: 'Enter a Address',
            currentData: alamat,
            input: 'name'
        },
        {
            name: 'Edit Name',
            type: 'name',
            column: 'name',
            value: 'Enter a Name',
            currentData: name,
            input: 'name'
        },
        {
            name: 'Edit Full Name',
            type: 'name',
            column: 'fullname',
            value: 'Enter a Full Name',
            currentData: fullname,
            input: 'name'
        },
        // {
            //     name: 'Edit Username',
            //     type: 'name',
            //     value: 'Enter a Username',
            //     currentData: username,
            //     input: 'name'
            // },
        {
            name: 'Edit Email',
            type: 'email',
            column: 'email',
            value: 'info@xyz.com',
            currentData: email,
            input: 'name'
        },
        {
            name: 'Edit Phone',
            type: 'phone',
            column: 'no_hp',
            value: '08xxxxxxxx',
            currentData: phone,
            input: 'name'
        },
        {
            name: 'Edit Role',
            type: 'name',
            column: 'id_role',
            value: [role_name.toUpperCase()[0], role_name.toLowerCase().substr(1)].join(''),
            input: 'select'
        },
        {
            name: 'submit',
            type: 'button',
            value: 'Save',
            input: 'button'
        },
    ]

    useEffect(() => {
        // eslint-disable-next-line
        refNavbar.current = refNavbar.current
        // eslint-disable-next-line
    }, [width])

    useEffect(() => {
        if (
        // state.validName === true &&
        // state.validUname === true &&
        state.validPhone === true &&
        state.validEmail === true
        ) {
            dispatch({type: 'enableRegister', valid: true})
        } else {
            dispatch({type: 'enableRegister', valid: false})
        }
    },[state.validUname, state.validPhone, state.validEmail, state.validCheckDB])

    const validationChecker = (e, type) => {
        const string = String(e.target.value)

        // if (type === 'NAME') {
        //     const lengthName = string.length
        //     dispatch({type: 'validName', lenName: lengthName})
        // }
        
        // else
        if (type === 'PHONE') {
            if (string[0] !== undefined && string[1] !== undefined) {
                (string[0] + string[1] === '08') ? dispatch({type: 'validPhone', valid: true}) : dispatch({type: 'validPhone', valid: false})
            } else if (string[0] === undefined || string[1] === undefined) {
                dispatch({type: 'validPhone', valid: true})
            }
        }

        else if (type === 'USERNAME') {
            const trigger = {triggered: false}
            getAllUsers.map((item, index) => {
                if (String(string.toLowerCase()) === String(item.username)) {
                    dispatch({type: 'validUname', valid: false})
                    trigger['triggered'] = true
                } else if (String(string) !== String(item.username)) {
                    trigger['triggered'] === false && dispatch({type: 'validUname', valid: true})
                }
                if (string === '') {
                    dispatch({type: 'validUname', valid: true})
                }
                
                trigger['triggered'] = (index === getAllUsers.length - 1 )
                                        ? false
                                        : trigger['triggered']

                return 'ok'
                
            })
        }

        else if (type === 'EMAIL') {   
            initialState['validCheckDB'] = ''
            getAllUsers.map(item => {
                if (string.includes('@') && String(string) === String(item.email)) {
                    dispatch({type: 'validEmail', valid: false})
                    initialState['validCheckDB'] = 'false'
                } else if (string.includes('@')) {
                    dispatch({type: 'validEmail', valid: true})
                }
                    return 'ok'
                
            })

            if (string === '') {
                dispatch({type: 'validEmail', valid: true})
            } else if (!string.includes('@')) {
                console.log(state.validEmail);
                dispatch({type: 'validEmail', valid: false})
            }
        }
    }

    return (
        <div className={styles['edit--user--section']}>
            <h2>Users</h2>
            <span>Edit User</span>
            <div>
                <fetcher.Form method='post' action={`/editUser/${id_user}`}>
                    {inputList.map((data, index) => {
                        return (
                            <div key={index}>
                                <InputElement
                                name={data.name}
                                type={data.type}
                                column={data.column}
                                value={data.value}
                                currentData={data.currentData}
                                input={data.input}
                                onChange={(data.name === 'submit') ? {
                                    cursor: state.enableRegister && initialState['validCheckDB'] === '' ? 'pointer' : 'no-drop',
                                    filter: state.enableRegister && initialState['validCheckDB'] === '' ? 'grayscale(0)' : 'grayscale(1)',
                                    pointerEvents: state.enableRegister && initialState['validCheckDB'] === '' ? 'auto' : 'none'
                                } :
                                validationChecker}
                                />
                                {!state.validEmail && (data.name.toLowerCase().split(' ')[1] === 'email') && <span style={{ color: '#FF0C3E' }}>Please use valid Email.</span>}
                                {initialState['validCheckDB'] === 'false' && (data.name.toLowerCase().split(' ')[1] === 'email') && <span style={{ color: '#FF0C3E' }}>Email Already Used</span>}
                                {/* {!state.validUname && (data.name.toLowerCase().split(' ')[1] === 'username') && <span style={{ color: '#FF0C3E' }}>Username Already Used</span>} */}
                                {!state.validPhone && (data.name.toLowerCase().split(' ')[1] === 'phone') && <span style={{ color: '#FF0C3E' }}>Please use valid Phone Number <br/>(Ex: 08xxxxxxxx).</span>}
                            </div>
                        )
                    })}
                </fetcher.Form>
            </div>
        </div>
    )
}

export default EditUser;