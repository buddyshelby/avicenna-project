import styles from './add-user.module.css'
import componentStyles from './component-style.module.css'
import { useRef, useEffect, useReducer } from 'react'
import { useFetcher } from 'react-router-dom'
import { useWindowSize } from '../../../Function/SeparateFunction'

const initialState = {
	validPass: true,
	currentPass: '',
	validConfirmPass: 'INIT',
	enableSubmit: false,
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'validPass':
			return { ...state, validPass: action.valid, currentPass: action.currentPass }
		case 'validConfirmPass':
			return { ...state, validConfirmPass: action.valid }
		case 'enableSubmit':
			return { ...state, enableSubmit: action.valid }
		default:
			return state;
	}
}

const inputList = [
    {
        name: 'Current Password',
        type: 'password',
        value: 'xxxxxxxxxx',
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
        name: 'submit',
        type: 'button',
        value: 'Submit',
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

    const validationChecker = (e, type) => {
        const string = String(e.target.value)

        if (type === 'PASSWORD') {
            const lengthName = string.length
            if (string.match(/[a-z]/) && string.match(/[A-Z]/) && string.match(/[0-9]/) && lengthName > 14) {
                // console.log(string.match(/[a-z]/).input);
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
    }

    useEffect(() => {
        if (
        state.validPass === true &&
        state.validConfirmPass === true
        ) {
            dispatch({type: 'enableSubmit', valid: true})
        } else {
            dispatch({type: 'enableSubmit', valid: false})
        }
    },[state.validPass, state.validConfirmPass])

    return (
        <div className={styles['add--user--section']}>
            <h2>Users</h2>
            <span>Add New User</span>
            <div>
                <fetcher.Form method='post' action='/password/change'>
                    {inputList.map((data, index) => {
                        return (
                            <div key={index}>
                                <InputElement
                                name={data.name}
                                type={data.type}
                                value={data.value}
                                input={data.input}
                                onChange={(data.name === 'submit') ? {
                                    cursor: state.enableSubmit ? 'pointer' : 'no-drop',
                                    filter: state.enableSubmit ? 'grayscale(0)' : 'grayscale(1)',
                                    pointerEvents: state.enableSubmit ? 'auto' : 'none'
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