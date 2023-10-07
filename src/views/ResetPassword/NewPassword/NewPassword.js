import desktopStyles from './newPassword.module.css'
import mobileStyles from './mobile-newPassword.module.css'
// import newPassword from '../../JSON/newPassword.json'
// import Navbar from '../../components/navbar/Navbar'
import imageStorage from '../../../assets/ResetPassword/NewPassword/imageStorage'
// import ShadowBackground from '../../components/background/ShadowBackground'
// eslint-disable-next-line
import SeparateFunction, { ResponsiveComponent, useWindowSize } from '../../../Function/SeparateFunction'
import { useFetcher } from 'react-router-dom';
// eslint-disable-next-line
import { useEffect, useReducer, useRef, useState } from 'react';

const NewPassword = () => {

    // eslint-disable-next-line
    const [windowWidth, windowHeight] = useWindowSize()
    const fetcher = useFetcher();
    const [styles, setStyles] = useState({})
    // eslint-disable-next-line
    const [isMobile, setIsMobile] =  useState(false)
    const [responsive, setResponsive] = useState({
        mobile: {
            form: {}
        }
    })

    const initialState = {
        validPass: 'INIT',
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

    const [state, dispatch] = useReducer(reducer, initialState)

    // Validation Name

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

    useEffect(() => {

        setResponsive ({
            mobile: {
                form: {
                    outForm: {padding: !isMobile && `${ResponsiveComponent(1080, 80, 600, 40, windowWidth)}px`},
                    insideForm: {padding: !isMobile && `${ResponsiveComponent(1080, 40, 600, 20, windowWidth)}px ${ResponsiveComponent(1080, 14, 600, 7, windowWidth)}px`},
                    header: {fontSize: !isMobile && `${ResponsiveComponent(1080, 26, 600, 16, windowWidth)}px`},
                    label: {marginTop: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`}
                }
            }
        })

        // console.log(windowWidth < 600);
        if (windowWidth > 600) {
            setStyles(desktopStyles)
            setIsMobile(false)
        } else {
            setStyles(mobileStyles)
            setIsMobile(true)
        }
    }, [windowWidth,isMobile])

    return (
        <main id={styles['newPassword--page']}>
            <section id={styles.newPassword}>
                <div className={styles['newPassword--container']}>
                    <div className={styles['newPassword--wrapper']}>
                        <div className={styles['newPassword--content--left']} style={{ '--resetPasswordBG': `url(${imageStorage.resetPasswordBG})` }}>
                            <div className={styles['school-logo']}>
                                <img src={imageStorage.schoolLogo} alt="" />
                            </div>
                        </div>
                        {/* {String(ResponsiveComponent(1080, 80, 600, 40, windowWidth))} */}
                        <div className={styles['newPassword--content--right']} style={responsive.mobile.form.outForm}>
                            <fetcher.Form method='post' action='/password/change' className={styles['newPassword--form']} style={responsive.mobile.form.insideForm}>
                                <div className={styles['newPassword--form--header']}>
                                    <span style={responsive.mobile.form.header}>Enter Your New Password</span>
                                </div>
                                <div className={styles['newPassword--form--password']} style={responsive.mobile.form.label}>
                                    <span>Current Password</span>
                                    <input style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px` }} type="password" name="currentPassword" placeholder="Input Current Password" autoComplete="password" />
                                </div>
                                <div className={styles['newPassword--form--password']} style={responsive.mobile.form.label}>
                                    <span>New Password</span>
                                    <input onChange={(e) => {validationChecker(e,'PASSWORD')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: !state.validPass && '#EE5757' }} type="password" name="password" placeholder="Input New Password" autoComplete="password" />
                                    {!state.validPass && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Please at least use 1 Number.<br/>Minimum's 15 character.</span>}
                                </div>
                                <div className={styles['newPassword--form--confirm-password']} style={responsive.mobile.form.label}>
                                    <span>Confirm New Password</span>
                                    <input onChange={(e) => {validationChecker(e,'CONFIRM PASSWORD')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: (!state.validConfirmPass || !state.validConfirmPass === 'INIT') && '#EE5757' }} type="password" name="confPassword" placeholder="Input Confirm New Password" autoComplete="password" />
                                    {(!state.validConfirmPass || !state.validConfirmPass === 'INIT') && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Your current password doesn't matches.</span>}
                                </div>
                                <div className={styles['newPassword--form--submit']}>
                                    <input style={{ marginTop: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 12, windowWidth)}px`, filter: state.enableSubmit && 'grayscale(0)', cursor: state.enableSubmit && 'pointer' }} type="submit" value="Submit" />
                                </div>
                            </fetcher.Form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )

}

export default NewPassword;