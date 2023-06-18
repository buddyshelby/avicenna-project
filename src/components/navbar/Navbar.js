import navbarJson from '../../JSON/navbar.json'
import desktopStyles from './navbar.module.css'
import mobileStyles from './mobile-navbar.module.css'
import { ResponsiveComponent, useWindowSize } from '../../Function/SeparateFunction'
import { useEffect, useState } from 'react'

const Navbar = () => {

    // eslint-disable-next-line
    const [windowWidth, windowHeight] = useWindowSize()
    const [styles, setStyles] = useState({})
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (windowWidth > 600 ) {
            setIsMobile(false)
            setStyles(desktopStyles)
        } else {
            setIsMobile(true)
            setStyles(mobileStyles)
        }
    }, [windowWidth])

    return (
        <>
        <nav id={styles.navbar}>
            <div className={styles['navbar--container']}>
                <div className={styles['navbar--wrapper']}>
                    <div className={styles['navbar--content-left']}>
                        <div className={styles['navbar--school-name']}>
                            <h4 style={{ fontSize: isMobile && `${ResponsiveComponent(600, 24, 280, 14, windowWidth)}px` }}>{navbarJson['school-name']}</h4>
                        </div>
                        <div className={styles['navbar--menus-list']}>
                            <ul style={{ fontSize: isMobile && `${ResponsiveComponent(600, 14, 280, 11, windowWidth)}px` }}>
                                {navbarJson['menu-items'].map((item, index) => (
                                    <li key={index}>
                                        <span>
                                            {item.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar