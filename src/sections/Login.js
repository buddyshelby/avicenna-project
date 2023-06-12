import styles from './login.module.css'
import loginJson from '../JSON/login.json'
import imageStorage from '../assets/Login/imageStorage'

const loginFormJson = loginJson.form


const Login = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('yaya');
    }
    
    return (
        <section id={styles.login} style={{ '--loginBG': `url(${imageStorage.loginBG})` }}>
            <div className={styles['login--container']}>
                <div className={styles['login--wrapper']}>
                    <div className={styles['login--content-left']}>
                        <div className={styles['login--greeting']}>
                            <h4>{loginJson.greeting}</h4>
                        </div>
                        <div className={styles['login--header']}>
                            <h1>{loginJson.header}</h1>
                        </div>
                        <div className={styles['login--desc']}>
                            <span>{loginJson.desc}</span>
                        </div>
                        {/* <div className={styles['login--button']}>
                            <div className={styles['login--button-object']}>
                                {loginJson.button}
                            </div>
                        </div> */}
                    </div>
                    <div className={styles['login--content-right']}>
                        <form onSubmit={handleSubmit} className={styles['login--content-form']}>
                            <div className={styles['login--content-form--title']}>
                                <h4>{loginFormJson.title}</h4>
                            </div>
                            <div className={styles['login--content-form--input-email']}>
                                <span><img src={imageStorage.emailIcon} alt="" /></span>
                                <input type="email" placeholder={loginFormJson.input_1} autoComplete="email" />
                            </div>
                            <div className={styles['login--content-form--input-password']}>
                                <span><img src={imageStorage.passIcon} alt="" /></span>
                                <input type="password" placeholder={loginFormJson.input_2} autoComplete="current-password" />
                            </div>
                            <div className={styles['login--content-form--remember-me']}>
                                <div className={styles['login--content-form--remember-me--radio-button']}>
                                    <div></div>
                                </div>
                                <span>{loginFormJson.span_1}</span>
                            </div>
                            <div className={styles['login--content-form--input-button']}>
                                <div>
                                    <div>
                                        <input type="submit" value={loginFormJson.button_1} />
                                        <div>
                                            <span className="material-icons" onClick={handleSubmit}>
                                                arrow_circle_right
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login