import styles from './dashboard.module.css'
import DashNav from '../components/dashboard/DashNav';
import dashJson from '../../model/JSON/dashboard.json'
import imageStorage from '../../assets/Dashboard/imageStorage';
import { useEffect, useRef, useState } from 'react';
import dataStorage from '../../assets/account/getAccountAsset'
// eslint-disable-next-line
import DashboardBox from './DashboardBox';
import { useWindowSize } from '../../Function/SeparateFunction'
import { useSelector } from 'react-redux';

const Dashboard = () => {
    // eslint-disable-next-line
    const [width, height] = useWindowSize()
    const accountJson = dashJson.account
    const [photoProfile, setPhotoProfile] = useState(null)
    const refNavbar = useRef(null)
    const { userGetDataUser } = useSelector(state => state.auth )

    useEffect(() => {
        dataStorage({username: accountJson.username})
        .then((module) => {
            setPhotoProfile(module)
        })
        .catch(() => {

        })
    },
    // eslint-disable-next-line
    [photoProfile])
    
    useEffect(() => {
        // eslint-disable-next-line
        refNavbar.current = refNavbar.current
        // eslint-disable-next-line
    }, [width])

    return ;
    return userGetDataUser && (
        <main id={styles['dashboard-page']} style={{ visibility: refNavbar.current ? '' : 'hidden' }}>
            <section id={styles.dashboard}>
                <div className={styles['dashboard--container']}>
                    <div className={styles['dashboard--wrapper']}>
                        <div className={styles['dashboard--wrapper--left']} ref={refNavbar} style={{ minWidth: '204px' }}>
                            {refNavbar.current && <DashNav active={0} refNavbar={refNavbar} />}
                        </div>
                        <div className={styles['dashboard--wrapper--right']}>
                            <div className={styles['dashboard--greeting']}>
                                Hello {userGetDataUser && userGetDataUser.username} 👉👈,
                            </div>
                            <div className={styles['dashboard--monitor']}>
                                <div className={styles['dashboard--monitor--total-user']}>
                                    <div className={styles['dashboard--monitor--wrapper']}>
                                        <div className={styles['dashboard--monitor--photo']}>
                                            <img src={imageStorage.totalUser} alt="" />
                                        </div>
                                        <div className={styles['dashboard--monitor--detail']}>
                                            <div className={styles['dashboard--monitor--detail-name']}>
                                                Total User
                                            </div>
                                            <div className={styles['dashboard--monitor--detail-status']}>
                                                5,423
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['dashboard--monitor--total-role']}>
                                    <div className={styles['dashboard--monitor--wrapper']}>
                                        <div className={styles['dashboard--monitor--photo']}>
                                            <img src={imageStorage.totalRole} alt="" />
                                        </div>
                                        <div className={styles['dashboard--monitor--detail']}>
                                            <div className={styles['dashboard--monitor--detail-name']}>
                                                {userGetDataUser.username}
                                            </div>
                                            <div className={styles['dashboard--monitor--detail-status']}>
                                                1,893
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['dashboard--monitor--total-active']}>
                                    <div className={styles['dashboard--monitor--wrapper']}>
                                        <div className={styles['dashboard--monitor--photo']}>
                                            <img src={imageStorage.totalActive} alt="" />
                                        </div>
                                        <div className={styles['dashboard--monitor--detail']}>
                                            <div className={styles['dashboard--monitor--detail-name']}>
                                                Active Now
                                            </div>
                                            <div className={styles['dashboard--monitor--detail-status']}>
                                                189
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Dashboard;