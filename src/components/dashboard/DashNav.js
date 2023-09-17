import styles from './dash-nav.module.css'
import imageStorage from '../../assets/Dashboard/imageStorage';
import dashboardJson from '../../JSON/dashboard.json'
import { useState } from 'react';

const DashNav = () => {

    const navJson = dashboardJson['dash-nav']
    const [activeNav, setActiveNav] = useState(0)
    const [hoverActiveNav, setHoverActiveNav] = useState(null)

    return (
        <div id={styles.dashnav}>
            <div className={styles['dashnav--wrapper']}>
                <div className={styles['dashnav--school-title']}>
                    <div className={styles['dashnav--school-title--image']}>
                        <img src={imageStorage.logo} alt="" />
                    </div>
                    <div className={styles['dashnav--school-title--text']}>
                        {navJson['school-name']}
                    </div>
                </div>
                <div className={styles['dashnav--header']}>
                    <div className={styles['dashnav--header--image']}>
                        <span className="material-icons">
                            {navJson['dashboard-icon']}
                        </span>
                    </div>
                    <div className={styles['dashnav--header--text']}>
                        {navJson.title}
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
                            console.log();
                        }

                        return (
                            <div onMouseLeave={mouseOutHandler} onMouseEnter={e => hoverHandler(e, index)} onClick={e => clickHandler(e, index)} className={styles['dashnav--menu-list--wrapper']} key={item.id} style={{ backgroundColor: (index === activeNav) && `#5669FF`, margin: (index === activeNav) && `0 0 15% 0`, padding: (index === activeNav) && `6% 3%` }}>
                                <div className={styles['dashnav--menu-list--image']}>
                                    <span className="material-icons" style={{ color: (index === activeNav) && `#FFF`, fontSize: `${(index === hoverActiveNav) ? 24 : 22 }px` }}>
                                        {item.icon}
                                    </span>
                                </div>
                                <div className={styles['dashnav--menu-list--text']} style={{ color: (index === activeNav) && `#FFF`, fontSize: `${(index === hoverActiveNav) ? 14 : 12 }px` }}>
                                    {item.label}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles['dashnav--log-out']}>
                    <div className={styles['dashnav--log-out--wrapper']}>
                        <div>
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