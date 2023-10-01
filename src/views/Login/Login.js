import desktopStyles from './login.module.css'
import mobileStyles from './mobile-login.module.css'
import loginJson from '../../JSON/login.json'
import Navbar from '../../components/navbar/Navbar'
import imageStorage from '../../assets/Login/imageStorage'
import ShadowBackground from '../../components/background/ShadowBackground'
import SeparateFunction, { ResponsiveComponent, useWindowSize, convertDate } from '../../Function/SeparateFunction'
// eslint-disable-next-line
import { requestAPI as handlePostRequest, reset } from '../../Function/authSlice'
// eslint-disable-next-line
import { redirect, useFetcher, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line
import { store } from '../../Function/store'
import { useDispatch, useSelector } from 'react-redux';

export const Action = async ({ request }) => {

    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    // const dataUser = store.getState().auth.user
    
    // eslint-disable-next-line
    const postData = {
        'email': email,
        'password': password,
        'apiUrl': 'http://localhost:5000/login',
        'method': 'post'
    }
    
    store.dispatch(handlePostRequest(postData))
    
    // eslint-disable-next-line
    // const { user, isError, isSuccess, isLoading, message } = usesSelector(
	// 	(state) => state.auth
	// );

	// useEffect(() => {
	// 	if (user || isSuccess) {
	// 		navigate('/dashboard');
	// 	}
	// 	dispatch(reset());
	// }, [user, isSuccess, dispatch, navigate]);

    return {msg:'ok'}
    // return redirect('/dashboard')
}

const Login = () => {

    const fetcher = useFetcher();
    const subButton = useRef('')
    // eslint-disable-next-line
    const [windowWidth, windowHeight] = useWindowSize()
    const [styles, setStyles] = useState({})
    const [isMobile, setIsMobile] =  useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isRemember, setIsRemember] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // eslint-disable-next-line
    const { user, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
        
        const expiresDate = localStorage.getItem('dataAccount') && new Date(JSON.parse(localStorage.getItem('dataAccount')).expiresDate)
        
        // if (expiresDate !== null) {
        //     const currentDate = new Date(convertDate(new Date()))
        //     console.log(expiresDate)
        //     if ((JSON.parse(localStorage.getItem('dataAccount')).id_user && currentDate < expiresDate)) {
        //         navigate('/dashboard');
        //     } else {
        //         localStorage.clear();
        //     }
        // }

        if (user || isSuccess) {
            navigate('/dashboard');
        }

	}, [user, isSuccess, navigate, dispatch]);

    const loginFormJson = loginJson.form
    const handleSubmit = (e) => {
        e.preventDefault();
        subButton.current.click()
    }

    const handlePrevent = (e) => {
        e.preventDefault();
        console.log(e);
    }

    const closeModal = (e) => {
        if (e.target.className === styles['login--content-right']) {
            setShowModal(false);
          }
    }

    useEffect(() => {
        // console.log(windowWidth < 600);
        if (windowWidth > 600) {
            setStyles(desktopStyles)
            setIsMobile(false)
        } else {
            setStyles(mobileStyles)
            setIsMobile(true)
        }
    }, [windowWidth])

    return (
        <main id={styles['login--page']}>
            <SeparateFunction />
            {isMobile &&
            <ShadowBackground showModal={showModal}>
                <div className={styles['login--content-right']} onClick={closeModal}>
                    <fetcher.Form method='post' action='/login' className={styles['login--content-form']} style={{ width: `${ResponsiveComponent(600, 300, 280, 150, windowWidth)}px` }}>
                        <div className={styles['login--content-form--title']}>
                            <h4 style={{ fontSize: `${ResponsiveComponent(600, 32, 280, 22, windowWidth)}px` }}>{loginFormJson.title}</h4>
                        </div>
                        <div className={styles['login--content-form--input-email']}>
                            <span><img src={imageStorage.emailIcon} alt="" /></span>
                            <input type="email" name="email" placeholder={loginFormJson.input_1} autoComplete="email" style={{ fontSize: `${ResponsiveComponent(600, 14, 280, 7, windowWidth)}px` }} />
                        </div>
                        <div className={styles['login--content-form--input-password']}>
                            <span><img src={imageStorage.passIcon} alt="" /></span>
                            <input type="password" name="password" placeholder={loginFormJson.input_2} autoComplete="current-password" style={{ fontSize: `${ResponsiveComponent(600, 14, 280, 7, windowWidth)}px` }} />
                        </div>
                        <div className={styles['login--content-form--forget--sign-up']}>
                            <div className={styles['login--content-form--forget-password']}>
                                <span style={{ fontSize: `${ResponsiveComponent(600, 12, 280, 5, windowWidth)}px` }}>{loginFormJson.span_1}</span>
                            </div>
                            <div className={styles['login--content-form--sign-up']}>
                                <span style={{ fontSize: `${ResponsiveComponent(600, 12, 280, 5, windowWidth)}px` }}>{loginFormJson.span_2}</span>
                            </div>
                        </div>
                        <div className={styles['login--content-form--remember-me']}>
                            <div className={styles['login--content-form--remember-me--radio-button']} onClick={() => setIsRemember(!isRemember)} style={{ backgroundColor: isRemember ? `#5669FF` : `transparent`, border: `1px solid ${isRemember ? '#5669FF' : '#fff'}` }}>
                                <div style={{ height: `${ResponsiveComponent(600, 15, 280, 7.5, windowWidth)}px`, transform: isRemember ? `translateX(100%)` : `translateX(0)` }}></div>
                            </div>
                            <span style={{ fontSize: `${ResponsiveComponent(600, 12, 280, 5, windowWidth)}px` }}>{loginFormJson.span_1}</span>
                        </div>
                        <div className={styles['login--content-form--input-button']}>
                            <div>
                                <div>
                                    <input type="submit" value={loginFormJson.button_1} ref={subButton} style={{ fontSize: `${ResponsiveComponent(1080, 13, 600, 10, windowWidth)}px` }} />
                                    <div style={{ left: `${ResponsiveComponent(600, 85, 280, 80, windowWidth)}%` }}>
                                        <span className="material-icons" onClick={handleSubmit}>
                                            arrow_circle_right
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fetcher.Form>
                </div>
            </ShadowBackground>}
            <Navbar />
            <section id={styles.login} style={{ '--loginBG': `url(${imageStorage.loginBG})` }}>
                <div className={styles['login--container']}>
                    <div className={styles['login--wrapper']}>
                        <div className={styles['login--content-left']}>
                            <div className={styles['login--greeting']}>
                                <h4>{loginJson.greeting}</h4>
                            </div>
                            <div className={styles['login--header']} style={{ fontSize: !isMobile ? `${ResponsiveComponent(1080, 28, 600, 15, windowWidth)}px` : `${ResponsiveComponent(600, 28, 280, 15, windowWidth)}px` }}>
                                <h1>{loginJson.header}</h1>
                            </div>
                            <div className={styles['login--desc']} style={{ fontSize: !isMobile ? `${ResponsiveComponent(1080, 18, 600, 10, windowWidth)}px` : `${ResponsiveComponent(600, 14, 280, 7, windowWidth)}px` }}>
                                <span>{loginJson.desc}</span>
                            </div>
                            {isMobile &&
                            <div className={styles['login--button']} onClick={() => setShowModal(!showModal)}>
                                <div className={styles['login--button-object']}>
                                    {loginJson.button}
                                </div>
                            </div>}
                        </div>
                        {!isMobile && <div className={styles['login--content-right']}>
                            <fetcher.Form method='post' action='/login' onSubmit={e => handlePrevent} className={styles['login--content-form']} style={{ width: !isMobile && `${ResponsiveComponent(1080, 300, 600, 150, windowWidth)}px` }}>
                                <div className={styles['login--content-form--title']}>
                                    <h4 style={{ fontSize: !isMobile && `${ResponsiveComponent(1080, 32, 600, 22, windowWidth)}px` }}>{loginFormJson.title}</h4>
                                </div>
                                <div className={styles['login--content-form--input-email']}>
                                    <span><img src={imageStorage.emailIcon} alt="" /></span>
                                    <input type="username" name="email" placeholder={loginFormJson.input_1} autoComplete="username" style={{ fontSize: !isMobile && `${ResponsiveComponent(1080, 14, 600, 7, windowWidth)}px` }} />
                                </div>
                                <div className={styles['login--content-form--input-password']}>
                                    <span><img src={imageStorage.passIcon} alt="" /></span>
                                    <input type="password" name="password" placeholder={loginFormJson.input_2} autoComplete="current-password" style={{ fontSize: !isMobile && `${ResponsiveComponent(1080, 14, 600, 7, windowWidth)}px` }} />
                                </div>
                                <div className={styles['login--content-form--forget--sign-up']}>
                                    <div className={styles['login--content-form--forget-password']}>
                                        <span style={{ fontSize: !isMobile && `${ResponsiveComponent(1080, 12, 600, 5, windowWidth)}px` }}>{loginFormJson.span_1}</span>
                                    </div>
                                    <div className={styles['login--content-form--sign-up']}>
                                        <span style={{ fontSize: !isMobile && `${ResponsiveComponent(1080, 12, 600, 5, windowWidth)}px` }}>{loginFormJson.span_2}</span>
                                    </div>
                                </div>
                                <div className={styles['login--content-form--remember-me']}>
                                    <div className={styles['login--content-form--remember-me--radio-button']} onClick={() => setIsRemember(!isRemember)} style={{ backgroundColor: isRemember ? `#5669FF` : `transparent`, border: `1px solid ${isRemember ? '#5669FF' : '#fff'}` }}>
                                        <div style={{ height: !isMobile && `${ResponsiveComponent(1080, 15, 600, 7.5, windowWidth)}px`, transform: isRemember ? `translateX(100%)` : `translateX(0)` }}></div>
                                    </div>
                                    <span style={{ fontSize: !isMobile && `${ResponsiveComponent(1080, 12, 600, 5, windowWidth)}px` }}>{loginFormJson.span_3}</span>
                                </div>
                                <div className={styles['login--content-form--input-button']}>
                                    <div>
                                        <div>
                                            <input type="submit" value={loginFormJson.button_1} ref={subButton} style={{ fontSize: !isMobile && `${ResponsiveComponent(1080, 13, 600, 10, windowWidth)}px` }} />
                                            <div style={{ left: !isMobile && `${ResponsiveComponent(1080, 85, 600, 80, windowWidth)}%` }}>
                                                <span className="material-icons" onClick={handleSubmit}>
                                                    arrow_circle_right
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fetcher.Form>
                        </div>}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Login