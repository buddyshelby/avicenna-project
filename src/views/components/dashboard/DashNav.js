import styles from './dash-nav.module.css'
import imageStorage from '../../../assets/Dashboard/imageStorage';
import iconStorage from '../../../assets/Dashboard/iconNavbar/imageStorage';
import dashboardJson from '../../../model/JSON/dashboard.json'
import { logOutUser } from '../../../model/modelLogout'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../../../Function/authSlice'
import { useNavigate } from 'react-router-dom';

const DashNav = (props) => {

    const navJson = dashboardJson['dash-nav']
    const [activeNav, setActiveNav] = useState(props.active)
    const [hoverActiveNav, setHoverActiveNav] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const refNavbar = props.refNavbar

    const goToHandler = (link) => {
        setTimeout(() => {
            
            return navigate(`/${link}`)
        }, 1000);
    }

    const logOutHandler = (e) => {

        dispatch(logOutUser()).then(res => {
            dispatch(reset())
            return goToHandler('')
        }).catch(err => {
            return err
        })
        
    }

    return (
        <div id={styles.dashnav} style={{ width: `${refNavbar.current.clientWidth}px` }}>
            <div className={styles['dashnav--wrapper']}>
                <div className={styles['dashnav--school-title']}>
                    <div className={styles['dashnav--school-title--image']}>
                        <img src={imageStorage.logo} alt="" />
                    </div>
                    <div className={styles['dashnav--school-title--text']}>
                        {navJson['school-name']}
                    </div>
                </div>
                <div className={styles['dashnav--menu-list']}>
                    {navJson['menu-list'].map((item, index) => {

                        const mouseOutHandler = () => {
                            setHoverActiveNav(null)
                        }

                        const hoverHandler = (e, indexes) => {
                            setHoverActiveNav(indexes)
                        }

                        const clickHandler = (e, indexes) => {
                            setActiveNav(indexes)
                            goToHandler(item.link)
                        }

                        return (
                            <div className={styles['dashnav--menu-list--wrapper']} onMouseLeave={mouseOutHandler} onMouseEnter={e => hoverHandler(e, index)} onClick={e => clickHandler(e, index)} key={item.id} style={{ backgroundColor: (index === activeNav) && `#5669FF`, margin: (index === activeNav) && `0 0 10% 0`, padding: (index === activeNav) && `6% 3%` }}>
                                <div className={styles['dashnav--menu-list--image']}>
                                    <img src={iconStorage[item.icon]} style={{ filter: (index === activeNav) && `brightness(100)` }} alt="" />
                                </div>
                                <div className={styles['dashnav--menu-list--text']} style={{ color: (index === activeNav) && `#FFF`, fontSize: `${(index === hoverActiveNav) ? 14 : 12 }px` }}>
                                    {item.label}
                                </div>
                                <div className={styles['dashnav--menu-list--arrow']}>
                                    <span className="material-icons" style={{ color: (index === activeNav) && '#fff' }}>chevron_right</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles['dashnav--separate']}></div>
                <div className={styles['dashnav--profile']}>
                    <div className={styles['dashnav--profile--photo']}>
                        <img src={imageStorage.photoNav} alt="" />
                    </div>
                    <div className={styles['dashnav--profile--detail']}>
                        <div className={styles['dashnav--profile--detail-name']}>
                            Evano
                        </div>
                        <div className={styles['dashnav--profile--detail-status']}>
                            CEO Kumstore
                        </div>
                    </div>
                </div>
                <div className={styles['dashnav--log-out']}>
                    <div className={styles['dashnav--log-out--wrapper']}>
                        <div onClick={logOutHandler}>
                            <div className={styles['dashnav--log-out--image']}>
                                <span className="material-icons">
                                    {navJson.logout.icon}
                                </span>
                            </div>
                            <div className={styles['dashnav--log-out--text']}>
                                {navJson.logout.label}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashNav;