import navbarJson from '../../../model/JSON/navbar.json'
<<<<<<< HEAD
import desktopStyles from './navbar.module.css'
import mobileStyles from './mobile-navbar.module.css'
import { ResponsiveComponent, useWindowSize } from '../../../Function/SeparateFunction'
import { useEffect, useState } from 'react'
=======
import dashboardJson from '../../../model/JSON/dashboard.json'
import './navbar.css'
import mobileStyles from './mobile-navbar.module.css'
import { ResponsiveComponent, useWindowSize } from '../../../Function/SeparateFunction'
import { useEffect, useState } from 'react'
import imageStorage from '../../../assets/Dashboard/iconNavbar/imageStorage'
import { ImageLoading } from '../loading/Loading'
import { Img } from 'react-image'
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)

const Navbar = () => {

    // eslint-disable-next-line
    const [windowWidth, windowHeight] = useWindowSize()
    const [styles, setStyles] = useState({})
    const [isMobile, setIsMobile] = useState(false)
<<<<<<< HEAD

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
=======
    
    const [navbarActive, setNavbarActive] = useState({})
    
    useEffect(() => {
        console.log(dashboardJson);
    }, [windowWidth])

    return (
        <div id='navbar'>
            <div className='navbar--wrapper'>
                <div className='navbar--section--top'>
                    <Img
                    src={imageStorage['dash']}
                    loader={<ImageLoading size="37px, 37px"/>}
                    style={{ width: '37px', height: '37px' }}
                    />
                    <span>Dashboard</span>
                </div>
                <div className='navbar--section--middle'>
                    {dashboardJson['dash-nav']['menu-list'].map((item, index) => {
                        const navbarClickHandler = () => {
                            setNavbarActive({click: index, [`nav${index}`]: true})
                            console.log(navbarActive);
                        }
                        const navbarActiveHandler = () => {
                            if (String(navbarActive.click) === 'false')
                            setNavbarActive({[`nav${index}`]: true})
                            else
                            setNavbarActive({[`nav${navbarActive.click}`]: true, [`nav${index}`]: true})
                        }
                        const navbarNonActiveHandler = () => {
                            if (String(navbarActive.click) === 'false')
                            setNavbarActive({[`nav${index}`]: false})
                            else
                            setNavbarActive({[`nav${navbarActive.click}`]: true, [`nav${index}`]: navbarActive.click === index && true})
                        }
                        return (
                            <div className='navbar--menu-list' key={index} onClick={navbarClickHandler} onMouseEnter={navbarActiveHandler} onMouseLeave={navbarNonActiveHandler}>
                            <Img
                            src={imageStorage[item.icon]}
                            loader={<ImageLoading size="24px, 24px"/>}
                            style={{ width: '24px', height: '24px', filter: navbarActive[`nav${index}`] && 'brightness(100)' }}
                            />
                            <span style={{ filter: navbarActive[`nav${index}`] && 'brightness(100)' }}>{ item.label }</span>
                            {item.children && <Img
                            src={imageStorage['right-arrow']}
                            loader={<ImageLoading size="4px, 8px"/>}
                            style={{ width: '4px', height: '8px', filter: navbarActive[`nav${index}`] && 'brightness(100)' }}
                            />}
                            </div>
                                )
                    })}
                </div>
                <div className='navbar--section--bottom'>
                    
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)
                </div>
            </div>
        </nav>
        </>
    )

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