import dashboardJson from '../../../model/JSON/dashboard.json'
import './navbar.css'
import './mobile-navbar.css'
import { logOutUser } from '../../../model/modelLogout'
import { useEffect, useState, Fragment } from 'react'
import iconStorage from '../../../assets/Dashboard/iconNavbar/imageStorage'
import imageStorage from '../../../assets/Dashboard/imageStorage'
import { ImageLoading } from '../loading/Loading'
// eslint-disable-next-line
import { Img } from 'react-image'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetLogout } from '../../../Function/authSlice'
import { MenuListChild } from './Component'
import { useWindowSize } from '../../../Function/SeparateFunction'

const MenuList = ({ lists, children, setNavbarActiveClick, navbarActiveClick, menuChild, navbarHide }) => {
    return lists.map(item => {
        return (
            <Fragment key={item.id}>
                <MenuListChild item={item} navbarHide={navbarHide} setNavbarActiveClick={setNavbarActiveClick} navbarActiveClick={navbarActiveClick} menuChild={menuChild} />
                {item.children && children}
            </Fragment>
        )
    })
}

const Navbar = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [navbarActiveClick, setNavbarActiveClick] = useState('')
    const [navbarHide, setNavbarHide] = useState('hide')

    const logOutHandler = async (e) => {

        // dispatch(logOutUser()).then(res => {
        //     dispatch(resetLogout())
        //     return navigate('/')
        // }).catch(err => {
        //     return err
        // })

        await dispatch(logOutUser())
        dispatch(resetLogout())
        return navigate('/')
        
    }

    const styleMenuChild = {
        display: 'none',
    }
    const styleMenuChildClicked = {
        display: 'block',
    }

    useEffect(() => {
        if(pathname === '/')
            setNavbarActiveClick('dashboard');
        else
            setNavbarActiveClick(pathname.split(/^\//).slice(-1)[0]);
    },[pathname])

    const handleNavbarHide = async () => {
        if (navbarHide !== 'hide')
            setNavbarHide('hide')
        else
            setNavbarHide('')
    }

    return (
        <div id='navbar' className={`${navbarHide}`}>
            <div className={`navbar--wrapper ${navbarHide}`}>
                <div className={`navbar--section--top ${navbarHide}`} onClick={handleNavbarHide}>
                    <Img
                    src={iconStorage['dash']}
                    loader={<ImageLoading size="37px, 37px"/>}
                    style={{ width: '37px', height: '37px' }}
                    />
                    <span>Dashboard</span>
                </div>
                <div className={`navbar--section--middle ${navbarHide}`}>
                    <MenuList  navbarActiveClick={navbarActiveClick} setNavbarActiveClick={setNavbarActiveClick} lists={dashboardJson['dash-nav']['menu-list']} menuChild={false} navbarHide={navbarHide}>
                        {dashboardJson['dash-nav']['menu-list'].map(item => {
                            return item.children && (
                                <div key={item.id} style={(navbarActiveClick === item.id || item.children.filter(itemed => (itemed.link === navbarActiveClick))[0]) ? styleMenuChildClicked : styleMenuChild}>
                                    <MenuList navbarActiveClick={navbarActiveClick} setNavbarActiveClick={setNavbarActiveClick} lists={item.children} menuChild={item.children? true : false} navbarHide={navbarHide} />
                                </div>
                            )
                        })}
                    </MenuList>
                </div>
                <div className={`navbar--section--bottom ${navbarHide}`}>
                    <div className={`navbar--profile ${navbarHide}`}>
                        <div className={`navbar--profile-photo ${navbarHide}`}>
                            <Img
                            src={imageStorage['photoNav']}
                            loader={<ImageLoading size="42px, 42px"/>}
                            style={{ width: '42px', height: '42px' }}
                            />
                        </div>
                        <div className={`navbar--profile-text ${navbarHide}`}>
                            <div className={`navbar--profile-text--header ${navbarHide}`}>Evano</div>
                            <div className={`navbar--profile-text--desc ${navbarHide}`}>CEO Kumstore</div>
                        </div>
                    </div>
                    <div onClick={logOutHandler} className={`navbar--logout ${navbarHide}`}>Log Out</div>
                    <span onClick={logOutHandler} className={`material-icons navbar--logout--icon ${navbarHide}`}>
                        logout
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar