import DashNav from '../components/dashboard/DashNav'
import styles from './add-user.module.css'
import componentStyles from './component-style.module.css'
import { useRef, useEffect, useReducer } from 'react'
import { useFetcher } from 'react-router-dom'
import { useWindowSize } from '../../Function/SeparateFunction'
// name
// type
// value

const initialState = {
    validName: 'INIT',
    validUname: 'INIT',
    validPhone: 'INIT',
    validEmail: 'INIT',
    validPass: 'INIT',
    currentPass: '',
    validConfirmPass: 'INIT',
    validRole: 'INIT',
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

const inputList = [
    {
        name: 'Jabatan',
        type: 'name',
        value: 'Enter a Jabatan',
        input: 'name'
    },
    {
        name: 'Address',
        type: 'name',
        value: 'Enter a Address',
        input: 'name'
    },
    {
        name: 'Name',
        type: 'name',
        value: 'Enter a Name',
        input: 'name'
    },
    {
        name: 'Full Name',
        type: 'name',
        value: 'Enter a Full Name',
        input: 'name'
    },
    {
        name: 'Username',
        type: 'name',
        value: 'Enter a Username',
        input: 'name'
    },
    {
        name: 'Email',
        type: 'email',
        value: 'info@xyz.com',
        input: 'name'
    },
    {
        name: 'Phone',
        type: 'phone',
        value: '08xxxxxxxx',
        input: 'name'
    },
    {
        name: 'Password',
        type: 'password',
        value: 'xxxxxxxxxx',
        input: 'name'
    },
    {
        name: 'Confirm Password',
        type: 'password',
        value: 'xxxxxxxxxx',
        input: 'name'
    },
    {
        name: 'Add Role',
        type: 'name',
        value: '-',
        input: 'select'
    },
    {
        name: 'submit',
        type: 'button',
        value: 'Save',
        input: 'button'
    },
]

const listRole = [
    {id: 1, name: 'Admin'},
    {id: 2, name: 'Staff'},
    {id: 3, name: 'Pengajar'},
]

const InputElement = ({ name, type, value, input, onChange }) => {
    if (input === 'name')
    return (
        <div className={componentStyles['input--element']}>
            <label htmlFor={name.replace(' ', '_').toLowerCase()}>{ name }</label>
            <input onChange={(e) => {onChange(e, `${name.toUpperCase()}`)}} type={type} name={name.replace(' ', '_').toLowerCase()} placeholder={value} autoComplete={type} />
        </div>
    )
    else if (input === 'select')
    return (
        <div className={`${componentStyles['input--element']} ${componentStyles['select']}`}>
            <label htmlFor={name.replace(' ', '_').toLowerCase()}>{ name }</label>
            <div>
                <select id="dropdown" onChange={(e) => {onChange(e, `${name.toUpperCase()}`)}} name={name.replace(' ', '_').toLowerCase()} title={name.replace(' ', '_').toLowerCase()}>
                    <option value={value}>{ value }</option>
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

const AddNewUser = ({ getAllUsers }) => {

    // eslint-disable-next-line
    const [width, height] = useWindowSize()
    const refNavbar = useRef(null)
    const fetcher = useFetcher();
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        // eslint-disable-next-line
        refNavbar.current = refNavbar.current
        // eslint-disable-next-line
    }, [width])

    useEffect(() => {
        if (
        // state.validName === true &&
        state.validUname === true &&
        state.validPhone === true &&
        state.validEmail === true &&
        state.validPass === true &&
        state.validConfirmPass === true &&
        state.validRole === true
        ) {
            dispatch({type: 'enableRegister', valid: true})
        } else {
            dispatch({type: 'enableRegister', valid: false})
        }
    },[state.validUname, state.validPhone, state.validEmail, state.validPass, state.validConfirmPass, state.validRole])

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
                dispatch({type: 'validPhone', valid: 'INIT'})
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
                    dispatch({type: 'validUname', valid: 'INIT'})
                }
                
                trigger['triggered'] = (index === getAllUsers.length - 1 )
                                        ? false
                                        : trigger['triggered']

                return 'ok'
                
            })
        }

        else if (type === 'EMAIL') {   
            
            getAllUsers.map(item => {
                if (string.includes('@') && String(string) === String(item.email)) {
                    dispatch({type: 'validEmail', valid: 'not true'})
                    initialState['validCheckDB'] = 'false'
                } else if (string.includes('@')) {
                    dispatch({type: 'validEmail', valid: true})
                }
                
                if (String(string) !== String(item.email)) {
                    initialState['validCheckDB'] = ''
                }
                    return 'ok'
                
            })

            if (string === '') {
                dispatch({type: 'validEmail', valid: 'INIT'})
            } else if (!string.includes('@')) {
                dispatch({type: 'validEmail', valid: false})
            }
        }

        else if (type === 'PASSWORD') {
            const lengthName = string.length
            if (string.match(/[a-z]/) && string.match(/[A-Z]/) && string.match(/[0-9]/) && lengthName > 14) {
                dispatch({type: 'validPass', valid: true, currentPass: string})
            } else if (string === '') {
                dispatch({type: 'validPass', valid: 'INIT', currentPass: string})
            } else if (!string.match(/[a-z]/) || !string.match(/[A-Z]/) || !string.match(/[0-9]/) || lengthName < 15) {
                dispatch({type: 'validPass', valid: false, currentPass: string})
            }
        }

        else if (type === 'CONFIRM PASSWORD') {
            if (string === state.currentPass) {
                dispatch({type: 'validConfirmPass', valid: true})
            } else if (string === '') {
                dispatch({type: 'validConfirmPass', valid: 'INIT'})
            } else if (string !== state.currentPass) {
                dispatch({type: 'validConfirmPass', valid: false})
            }
        }

        else if (type === 'ADD ROLE') {
            if (string !== '-') {
                dispatch({type: 'validRole', valid: true})
            } else {
                dispatch({type: 'validRole', valid: 'INIT'})
            }
        }
    }

    return (
        <div className={styles['add--user--section']}>
            <h2>Users</h2>
            <span>Add New User</span>
            <div>
                <fetcher.Form method='post' action='/addUser'>
                    {inputList.map((data, index) => {
                        return (
                            <div key={index}>
                                <InputElement
                                name={data.name}
                                type={data.type}
                                value={data.value}
                                input={data.input}
                                onChange={(data.name === 'submit') ? {
                                    cursor: state.enableRegister ? 'pointer' : 'no-drop',
                                    filter: state.enableRegister ? 'grayscale(0)' : 'grayscale(1)',
                                    pointerEvents: state.enableRegister ? 'auto' : 'none'
                                } :
                                validationChecker}
                                />
                                {!state.validEmail && (data.name.toLowerCase() === 'email') && <span style={{ color: '#FF0C3E' }}>Please use valid Email.</span>}
                                {initialState['validCheckDB'] === 'false' && (data.name.toLowerCase() === 'email') && <span style={{ color: '#FF0C3E' }}>Email Already Used</span>}
                                {!state.validUname && (data.name.toLowerCase() === 'username') && <span style={{ color: '#FF0C3E' }}>Username Already Used</span>}
                                {!state.validPhone && (data.name.toLowerCase() === 'phone') && <span style={{ color: '#FF0C3E' }}>Please use valid Phone Number <br/>(Ex: 08xxxxxxxx).</span>}
                                {!state.validPass && (data.name.toLowerCase() === 'password') && <span style={{ color: '#FF0C3E' }}>Please at least use 1 Number.<br/>Minimum's 15 character.</span>}
                                {(!state.validConfirmPass || !state.validConfirmPass === 'INIT') && (data.name.toLowerCase() === 'confirm password') && <span style={{ color: '#FF0C3E' }}>Your current password doesn't matches.</span>}
                                {(state.validRole === 'INIT' && (data.name.toLowerCase() === 'add role')) && <span style={{ color: '#FF0C3E' }}>Please Choose a Role</span>}
                            </div>
                        )
                    })}
                </fetcher.Form>
            </div>
        </div>
    )
}

export default AddNewUser;