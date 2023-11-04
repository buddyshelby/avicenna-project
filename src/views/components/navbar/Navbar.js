import navbarJson from '../../../model/JSON/navbar.json'
import dashboardJson from '../../../model/JSON/dashboard.json'
import './navbar.css'
import './mobile-navbar.css'
import { logOutUser } from '../../../model/modelLogout'
import { ResponsiveComponent, useWindowSize } from '../../../Function/SeparateFunction'
import { useEffect, useState, Fragment } from 'react'
import iconStorage from '../../../assets/Dashboard/iconNavbar/imageStorage'
import imageStorage from '../../../assets/Dashboard/imageStorage'
import { ImageLoading } from '../loading/Loading'
import { Img } from 'react-image'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { reset, resetLogout } from '../../../Function/authSlice'
import { MenuListChild } from './Component'

const MenuList = ({ lists, children, setNavbarActiveClick, navbarActiveClick, menuChild }) => {
    return lists.map(item => {
        return (
            <Fragment key={item.id}>
                <MenuListChild item={item} setNavbarActiveClick={setNavbarActiveClick} navbarActiveClick={navbarActiveClick} menuChild={menuChild} />
                {item.children && children}
            </Fragment>
        )
    })
}

const Navbar = () => {

    // eslint-disable-next-line
    const [windowWidth, windowHeight] = useWindowSize()
    const [styles, setStyles] = useState({})
    const [isMobile, setIsMobile] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [navbarActiveClick, setNavbarActiveClick] = useState('')

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
            setNavbarActiveClick(pathname.split('/').slice(-1)[0]);
    },[])

    return (
        <div id='navbar'>
            <div className='navbar--wrapper'>
                <div className='navbar--section--top'>
                    <Img
                    src={iconStorage['dash']}
                    loader={<ImageLoading size="37px, 37px"/>}
                    style={{ width: '37px', height: '37px' }}
                    />
                    <span onClick={() => navigate('/addUser')}>Dashboard</span>
                </div>
                <div className='navbar--section--middle'>
                    <MenuList  navbarActiveClick={navbarActiveClick} setNavbarActiveClick={setNavbarActiveClick} lists={dashboardJson['dash-nav']['menu-list']} menuChild={false}>
                        {dashboardJson['dash-nav']['menu-list'].map(item => {
                            return item.children && (
                                <div key={item.id} style={(navbarActiveClick === item.id || item.children.filter(itemed => itemed.id === navbarActiveClick)[0]) ? styleMenuChildClicked : styleMenuChild}>
                                    <MenuList navbarActiveClick={navbarActiveClick} setNavbarActiveClick={setNavbarActiveClick} lists={item.children} menuChild={item.children? true : false} />
                                </div>
                            )
                        })}
                    </MenuList>
                </div>
                <div className='navbar--section--bottom'>
                    <div className='navbar--profile'>
                        <div className='navbar--profile-photo'>
                            <Img
                            src={imageStorage['photoNav']}
                            loader={<ImageLoading size="42px, 42px"/>}
                            style={{ width: '42px', height: '42px' }}
                            />
                        </div>
                        <div className='navbar--profile-text'>
                            <div className='navbar--profile-text--header'>Evano</div>
                            <div className='navbar--profile-text--desc'>CEO Kumstore</div>
                        </div>
                    </div>
                    <div onClick={logOutHandler} className='navbar--logout'>Log Out</div>
                    <span onClick={logOutHandler} className="material-icons navbar--logout--icon">
                        logout
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar