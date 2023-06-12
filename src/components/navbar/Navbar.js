import navbarJson from '../../JSON/navbar.json'
import styles from './navbar.module.css'

const Navbar = () => {
    return (
        <nav id={styles.navbar}>
            <div className={styles['navbar--container']}>
                <div className={styles['navbar--wrapper']}>
                    <div className={styles['navbar--content-left']}>
                        <div className={styles['navbar--school-name']}>
                            <h4>{navbarJson['school-name']}</h4>
                        </div>
                        <div className={styles['navbar--menus-list']}>
                            <ul>
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
                    {/* <div className={styles['navbar--content-right']}>
                        <div className={styles['navbar--button']}>
                            <div className={styles['navbar--button-object']}>
                                Login
                                <span className="material-icons">
                                    east
                                </span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </nav>
    )
}

export default Navbar