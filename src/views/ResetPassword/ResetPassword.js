import desktopStyles from './resetPassword.module.css'
import mobileStyles from './mobile-resetPassword.module.css'
// import resetPassword from '../../JSON/resetPassword.json'
// import Navbar from '../../components/navbar/Navbar'
import imageStorage from '../../assets/ResetPassword/imageStorage'
// import ShadowBackground from '../../components/background/ShadowBackground'
// eslint-disable-next-line
import SeparateFunction, { ResponsiveComponent, useWindowSize } from '../../Function/SeparateFunction'
import { useFetcher } from 'react-router-dom';
// eslint-disable-next-line
import { useEffect, useReducer, useRef, useState } from 'react';

const ResetPassword = () => {

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
        validEmail: 'INIT',
        validPhone: 'INIT',
        enableSubmit: false,
    }
    
    const reducer = (state, action) => {
        switch (action.type) {
            case 'validEmail':
                return { ...state, validEmail: action.valid }
            case 'validPhone':
                return { ...state, validPhone: action.valid }
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

        if (type === 'EMAIL') {            
            if (string.includes('@gmail.com')) {
                dispatch({type: 'validEmail', valid: true})
            } else if (string === '') {
                dispatch({type: 'validEmail', valid: 'INIT'})
            } else if (!string.includes('@gmail.com')) {
                dispatch({type: 'validEmail', valid: false})
            }
        }

        else if (type === 'PHONE') {
            if (string[0] !== undefined && string[1] !== undefined) {
                console.log(string[0] + string[1]);
                (string[0] + string[1] === '08') ? dispatch({type: 'validPhone', valid: true}) : dispatch({type: 'validPhone', valid: false})
            } else if (string[0] === undefined || string[1] === undefined) {
                dispatch({type: 'validPhone', valid: 'INIT'})
            }
        }
    }

    useEffect(() => {
        if (
        state.validPhone === true &&
        state.validEmail === true
        ) {
            dispatch({type: 'enableSubmit', valid: true})
        } else {
            dispatch({type: 'enableSubmit', valid: false})
        }
    },[state.validEmail, state.validPhone])

    useEffect(() => {

        setResponsive ({
            mobile: {
                form: {
                    outForm: {padding: !isMobile && `${ResponsiveComponent(1080, 80, 600, 40, windowWidth)}px`},
                    insideForm: {padding: !isMobile && `${ResponsiveComponent(1080, 40, 600, 20, windowWidth)}px ${ResponsiveComponent(1080, 14, 600, 7, windowWidth)}px`},
                    header: {fontSize: !isMobile && `${ResponsiveComponent(1080, 26, 600, 16, windowWidth)}px`},
                    desc: {fontSize: !isMobile && `${ResponsiveComponent(1080, 14, 600, 8, windowWidth)}px`},
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
        <main id={styles['resetPassword--page']}>
            <section id={styles.resetPassword}>
                <div className={styles['resetPassword--container']}>
                    <div className={styles['resetPassword--wrapper']}>
                        <div className={styles['resetPassword--content--left']} style={{ '--resetPasswordBG': `url(${imageStorage.resetPasswordBG})` }}>
                            <div className={styles['school-logo']}>
                                <img src={imageStorage.schoolLogo} alt="" />
                            </div>
                        </div>
                        {/* {String(ResponsiveComponent(1080, 80, 600, 40, windowWidth))} */}
                        <div className={styles['resetPassword--content--right']} style={responsive.mobile.form.outForm}>
                            <fetcher.Form className={styles['resetPassword--form']} style={responsive.mobile.form.insideForm}>
                                <div className={styles['resetPassword--form--header']}>
                                    <span style={responsive.mobile.form.header}>Reset Your Password</span>
                                </div>
                                <div className={styles['resetPassword--form--desc']}>
                                    <span style={responsive.mobile.form.desc}>
                                        
                                    Please submit your email address.<br/>We will send you a link to resend your Password.

                                    </span>
                                </div>
                                <div className={styles['resetPassword--form--email']} style={responsive.mobile.form.label}>
                                    <span>Email</span>
                                    <input onChange={(e) => {validationChecker(e,'EMAIL')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: !state.validEmail && '#EE5757' }} type="email" name="email" placeholder="Input Email" autoComplete="email" />
                                    {!state.validEmail && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Please use valid Email.</span>}
                                </div>
                                <div className={styles['resetPassword--form--no-hp']} style={responsive.mobile.form.label}>
                                    <span>No Handphone</span>
                                    <input onChange={(e) => {validationChecker(e,'PHONE')}} style={{ padding: !isMobile && `${ResponsiveComponent(1080, 10, 600, 5, windowWidth)}px`, fontSize: !isMobile && `${ResponsiveComponent(1080, 16, 600, 10, windowWidth)}px`, borderColor: !state.validPhone && '#EE5757' }} type="phone" name="phone" placeholder="Input Phone Number" autoComplete="phone" />
                                    {!state.validPhone && <span style={{ color: '#FF0C3E', fontSize: `${ResponsiveComponent(1080, 12, 600, 8, windowWidth)}px` }}>Please use valid Phone Number <br/>(Ex: 08xxxxxxxx).</span>}
                                </div>
                                <div className={styles['resetPassword--form--submit']}>
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

export default ResetPassword;