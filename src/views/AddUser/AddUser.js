import desktopStyles from './addUser.module.css'
import mobileStyles from './mobile-addUser.module.css'
import imageStorage from '../../assets/AddUser/imageStorage'
import { ResponsiveComponent, useWindowSize } from '../../Function/SeparateFunction'
import { useFetcher } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';

const Signup = () => {

    // eslint-disable-next-line
    const [windowWidth, windowHeight] = useWindowSize()
    const fetcher = useFetcher();
    const [styles, setStyles] = useState({})
    const [isMobile, setIsMobile] =  useState(false)
    const [responsive, setResponsive] = useState({
        mobile: {
            form: {}
        }
    })

    const initialState = {
        validName: 'INIT',
        validPhone: 'INIT',
        validEmail: 'INIT',
        validPass: 'INIT',
        currentPass: '',
        validConfirmPass: 'INIT',
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
    
            case 'validPhone':
                return { ...state, validPhone: action.valid }
            case 'validEmail':
                return { ...state, validEmail: action.valid }
            case 'validPass':
                return { ...state, validPass: action.valid, currentPass: action.currentPass }
            case 'validConfirmPass':
                return { ...state, validConfirmPass: action.valid }
            case 'enableRegister':
                return { ...state, enableRegister: action.valid }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    // Validation Name

    const validationChecker = (e, type) => {
        const string = String(e.target.value)

        if (type === 'NAME') {
            const lengthName = string.length
            dispatch({type: 'validName', lenName: lengthName})
        }
        
        else if (type === 'PHONE') {
            if (string[0] !== undefined && string[1] !== undefined) {
                (string[0] + string[1] === '08') ? dispatch({type: 'validPhone', valid: true}) : dispatch({type: 'validPhone', valid: false})
            } else if (string[0] === undefined || string[1] === undefined) {
                dispatch({type: 'validPhone', valid: 'INIT'})
            }
        }

        else if (type === 'EMAIL') {            
            if (string.includes('@')) {
                dispatch({type: 'validEmail', valid: true})
            } else if (string === '') {
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
    }

    useEffect(() => {
        if (
        state.validName === true &&
        state.validPhone === true &&
        state.validEmail === true &&
        state.validPass === true &&
        state.validConfirmPass === true
        ) {
            dispatch({type: 'enableRegister', valid: true})
        } else {
            dispatch({type: 'enableRegister', valid: false})
        }
    },[state.validName, state.validPhone, state.validEmail, state.validPass, state.validConfirmPass])

    useEffect(() => {

        setResponsive ({
            mobile: {
                form: {
                    outForm: {padding: !isMobile && `${ResponsiveComponent(1080, 80, 600, 40, windowWidth)}px`},
                    insideForm: {padding: !isMobile && `${ResponsiveComponent(1080, 40, 600, 20, windowWidth)}px ${ResponsiveComponent(1080, 14, 600, 7, windowWidth)}px`},
                    header: {fontSize: !isMobile && `${ResponsiveComponent(1080, 26, 600, 16, windowWidth)}px`},
                    haveAccount: {fontSize: !isMobile && `${ResponsiveComponent(1080, 11, 600, 8, windowWidth)}px`},
                    label: {marginTop: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`}
                }
            }
        })

        if (windowWidth > 600) {
            setStyles(desktopStyles)
            setIsMobile(false)
        } else {
            setStyles(mobileStyles)
            setIsMobile(true)
        }
    }, [windowWidth,isMobile])

    return (
        <main id={styles['signup--page']}>
            <section id={styles.signup}>
                <div className={styles['signup--container']}>
                    <div className={styles['signup--wrapper']}>
                        <div className={styles['signup--content--left']} style={{ '--signupBG': `url(${imageStorage.signupBG})` }}>
                            <div className={styles['school-logo']}>
                                <img src={imageStorage.schoolLogo} alt="" />
                            </div>
                        </div>
                        {/* {String(ResponsiveComponent(1080, 80, 600, 40, windowWidth))} */}
                        <div className={styles['signup--content--right']} style={responsive.mobile.form.outForm}>
                            <fetcher.Form method='post' action='/addUser' className={styles['signup--form']} style={responsive.mobile.form.insideForm}>
                                <div className={styles['signup--form--header']}>
                                    <span style={responsive.mobile.form.header}>Add User Account</span>
                                </div>
                                {/* <div className={styles['signup--form--have-account']}>
                                    <span style={responsive.mobile.form.haveAccount}>Already have an account?</span>
                                    <span style={responsive.mobile.form.haveAccount}> Login</span>
                                </div> */}
                                <div className={styles['signup--form--name']} style={responsive.mobile.form.label}>
                                    <span>Jabatan</span>
                                    <input onChange={(e) => {validationChecker(e,'NAME')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: !state.validName && '#EE5757' }} type="name" name="jabatan" placeholder="Input Jabatan" autoComplete="name" />
                                    {!state.validName && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Name at least 12 Character.</span>}
                                </div>
                                <div className={styles['signup--form--name']} style={responsive.mobile.form.label}>
                                    <span>Address</span>
                                    <input onChange={(e) => {validationChecker(e,'NAME')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: !state.validName && '#EE5757' }} type="name" name="alamat" placeholder="Input Address" autoComplete="name" />
                                    {!state.validName && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Name at least 12 Character.</span>}
                                </div>
                                <div className={styles['signup--form--name']} style={responsive.mobile.form.label}>
                                    <span>Name</span>
                                    <input onChange={(e) => {validationChecker(e,'NAME')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: !state.validName && '#EE5757' }} type="name" name="name" placeholder="Input Name" autoComplete="name" />
                                    {!state.validName && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Name at least 12 Character.</span>}
                                </div>
                                <div className={styles['signup--form--name']} style={responsive.mobile.form.label}>
                                    <span>Full Name</span>
                                    <input onChange={(e) => {validationChecker(e,'NAME')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: !state.validName && '#EE5757' }} type="name" name="fullName" placeholder="Input Name" autoComplete="name" />
                                    {!state.validName && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Name at least 12 Character.</span>}
                                </div>
                                <div className={styles['signup--form--name']} style={responsive.mobile.form.label}>
                                    <span>Username</span>
                                    <input onChange={(e) => {validationChecker(e,'NAME')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: !state.validName && '#EE5757' }} type="name" name="username" placeholder="Input Username" autoComplete="name" />
                                    {!state.validName && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Name at least 12 Character.</span>}
                                </div>
                                <div className={styles['signup--form--no-hp']} style={responsive.mobile.form.label}>
                                    <span>No Handphone</span>
                                    <input onChange={(e) => {validationChecker(e,'PHONE')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: !state.validPhone && '#EE5757' }} type="phone" name="phone" placeholder="Input Phone Number" autoComplete="phone" />
                                    {!state.validPhone && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Please use valid Phone Number <br/>(Ex: 08xxxxxxxx).</span>}
                                </div>
                                <div className={styles['signup--form--email']} style={responsive.mobile.form.label}>
                                    <span>Email</span>
                                    <input onChange={(e) => {validationChecker(e,'EMAIL')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: !state.validEmail && '#EE5757' }} type="email" name="email" placeholder="Input Email" autoComplete="email" />
                                    {!state.validEmail && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Please use valid Email.</span>}
                                </div>
                                <div className={styles['signup--form--password']} style={responsive.mobile.form.label}>
                                    <span>Password</span>
                                    <input onChange={(e) => {validationChecker(e,'PASSWORD')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: !state.validPass && '#EE5757' }} type="password" name="password" placeholder="Input Password" autoComplete="password" />
                                    {!state.validPass && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Please at least use 1 Number.<br/>Minimum's 15 character.</span>}
                                </div>
                                <div className={styles['signup--form--confirm-password']} style={responsive.mobile.form.label}>
                                    <span>Confirm Password</span>
                                    <input onChange={(e) => {validationChecker(e,'CONFIRM PASSWORD')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: (!state.validConfirmPass || !state.validConfirmPass === 'INIT') && '#EE5757' }} type="password" name="confPassword" placeholder="Input Confirm Password" autoComplete="password" />
                                    {(!state.validConfirmPass || !state.validConfirmPass === 'INIT') && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Your current password doesn't matches.</span>}
                                </div>
                                <div className={styles['signup--form--register']}>
                                    <input style={{ marginTop: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 12, windowWidth)}px`, filter: state.enableRegister && 'grayscale(0)', cursor: state.enableRegister && 'pointer' }} type="submit" value="ADD" />
                                </div>
                            </fetcher.Form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Signup