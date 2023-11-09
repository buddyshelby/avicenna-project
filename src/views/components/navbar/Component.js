import { useState } from 'react'
import imageStorage from '../../../assets/Dashboard/iconNavbar/imageStorage'
import { ImageLoading } from '../loading/Loading'
// eslint-disable-next-line
import { Img } from 'react-image'
import { useNavigate } from 'react-router-dom'

export const MenuListChild = ({ item, setNavbarActiveClick, navbarActiveClick, menuChild }) => {

    const [navbarActive, setNavbarActive] = useState({})
    const navigate = useNavigate()

    const navbarActiveHandler = () => {
        if (String(navbarActive.click) === 'false')
        setNavbarActive({[`nav${item.id}`]: true})
        else
        setNavbarActive({[`nav${item.id}`]: true})
    }
    const navbarNonActiveHandler = () => {
        if (String(navbarActive.click) === 'false')
        setNavbarActive({[`nav${item.id}`]: false})
        else
        setNavbarActive({[`nav${item.id}`]: false})
    }
    const navbarClickHandler = (index) => {
        setNavbarActiveClick(index)

        if (item.link)
        navigate(`/${item.link}`)

    }
    return (
        <div className={`navbar--menu-list${menuChild ? '--child animate' : ''}`} key={item.id} onClick={() => navbarClickHandler(menuChild ? item.link : item.id)} onMouseEnter={navbarActiveHandler} onMouseLeave={navbarNonActiveHandler} style={{ background: navbarActiveClick === item.link && '#5932ea' }}>
            <Img
            src={imageStorage[item.icon]}
            loader={<ImageLoading size="24px, 24px"/>}
            style={{ width: '24px', height: '24px', filter: (navbarActive[`nav${item.id}`] || navbarActiveClick === item.link) && 'brightness(100)' }}
            />
            <span style={{ filter: (navbarActive[`nav${item.id}`] || navbarActiveClick === item.link) && 'brightness(100)' }}>{ item.label }</span>
            {item.children && <Img
            src={imageStorage['right-arrow']}
            loader={<ImageLoading size="4px, 8px"/>}
            style={{ width: '4px', height: '8px', filter: (navbarActive[`nav${item.id}`] || navbarActiveClick === item.link) && 'brightness(100)' }}
            />}
        </div>
    )
}