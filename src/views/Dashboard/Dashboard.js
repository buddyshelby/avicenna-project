import styles from './dashboard.module.css'
import DashNav from '../components/dashboard/DashNav';
import dashJson from '../../model/JSON/dashboard.json'
<<<<<<< HEAD
import { useEffect, useState } from 'react';
import dataStorage from '../../assets/account/getAccountAsset'
import DashboardBox from './DashboardBox';

const Dashboard = () => {
    const accountJson = dashJson.account
    const [photoProfile, setPhotoProfile] = useState(null)
=======
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
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)

    useEffect(() => {
        dataStorage({username: accountJson.username})
        .then((module) => {
            setPhotoProfile(module)
        })
        .catch(() => {
<<<<<<< HEAD

        })
    },
    // eslint-disable-next-line
    [photoProfile])

    return (
        <main id={styles['dashboard-page']}>
            <section id={styles.dashboard}>
                <div className={styles['dashboard--container']}>
                    <div className={styles['dashboard--wrapper']}>
                        <div className={styles['dashboard--wrapper--left']}>
                            <DashNav />
                        </div>
                        <div className={styles['dashboard--wrapper--right']}>
                            <div className={styles['dashboard--wrapper--right--wrapper']}>
                                <div className={styles['dashboard--profile-box']}>
                                    <div className={styles['dashboard--profile-box--account']}>
                                        <div className={styles['dashboard--profile-box--account--wrapper']}>
                                            <div className={styles['dashboard--profile-box--account--left']}>
                                                <div>
                                                    <span>{accountJson.name}</span>
                                                    <span>{accountJson.status}</span>
                                                </div>
                                            </div>
                                            <div className={styles['dashboard--profile-box--account--right']}>
                                                <img src={photoProfile} alt="" />
=======

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
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)
                                            </div>
                                        </div>
                                    </div>
                                </div>
<<<<<<< HEAD
                                <div className={styles['dashboard--header-box']}>
                                    
                                </div>
                                <DashboardBox />
                                {/* <div className={styles['dashboard--box-content']}>
                                    <div className={styles['dashboard--box-content--header']}>
                                        <div className={styles['dashboard--box-content--header--wrapper']}>
                                            <div style={{ fontSize: `${ResponsiveComponent(1080, 16, 600, 9, width)}px` }}>Nama</div>
                                            <div style={{ fontSize: `${ResponsiveComponent(1080, 16, 600, 9, width)}px` }}>Jurusan</div>
                                            <div style={{ fontSize: `${ResponsiveComponent(1080, 16, 600, 9, width)}px` }}>Email</div>
                                            <div style={{ fontSize: `${ResponsiveComponent(1080, 16, 600, 9, width)}px` }}>Tanggal</div>
                                            <div style={{ fontSize: `${ResponsiveComponent(1080, 16, 600, 9, width)}px` }}>Status</div>
                                            <div style={{ fontSize: `${ResponsiveComponent(1080, 16, 600, 9, width)}px` }}>Aksi</div>
                                        </div>
                                    </div>
                                    <div className={styles['dashboard--box-content--data']} ref={contentBoxSizeRef} style={{ height: (paginationRef.current && lastContentBoxRef.current && contentBoxSizeRef.current && (paginationRef.current.offsetTop > lastContentBoxRef.current.offsetTop + lastContentBoxRef.current.clientHeight)) && `calc(${(height - paginationRef.current.clientHeight) - contentBoxSizeRef.current.offsetTop}px - 5px)` }}>
                                        {// eslint-disable-next-line
                                        boxContent.map((data, index) => {
                                            if ((index < boxContent.length && index < totalBoxContent) && index > paginationActive - 1) {
                                                // console.log(paginationActive);
                                                return (
                                                        <div className={styles['dashboard--box-content--data--wrapper']} key={index} ref={lastContentBoxRef}>
                                                            <div style={{ fontSize: `${ResponsiveComponent(1080, 14, 600, 7, width)}px` }}>
                                                                <img src={photoProfile} alt="" style={{ width: `${ResponsiveComponent(1080, 32, 600, 12, width)}px` }} />
                                                                {data.nama}
                                                            </div>
                                                            <div style={{ fontSize: `${ResponsiveComponent(1080, 14, 600, 7, width)}px` }}>{data.jurusan}</div>
                                                            <div style={{ fontSize: `${ResponsiveComponent(1080, 14, 600, 7, width)}px` }}>{data.email}</div>
                                                            <div style={{ fontSize: `${ResponsiveComponent(1080, 14, 600, 7, width)}px` }}>{data.tanggal}</div>
                                                            <div>
                                                                <span style={statusStyle(data.status)}>
                                                                    {data.status}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span style={statusStyle(data.action)}>
                                                                    {data.action}
                                                                </span>
                                                            </div>
                                                        </div>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div className={styles['dashboard--box-content--data--pagination']} ref={paginationRef}>
                                        <div className={styles['dashboard--box-content--data--pagination--wrapper']}>
                                            <div className={styles['dashboard--box-content--data--pagination--wrapper--next']}>
                                                <span className="material-icons">
                                                    keyboard_double_arrow_left
                                                </span>
                                            </div>
                                            {paginationNumber.map((item, index) => {
                                                
                                                const paginationHandler = (number) => {
                                                    console.log(number);
                                                    setPaginationActive(number)
                                                }

                                                return (
                                                <div onClick={e => paginationHandler(index)} style={{ backgroundColor: index === paginationActive && `#2BA7E2`, color: index === paginationActive && `#FFF` }} className={styles['dashboard--box-content--data--pagination--wrapper--number']} key={index}>
                                                    <div>{item}</div>
                                                </div>
                                            )})}
                                            <div className={styles['dashboard--box-content--data--pagination--wrapper--previous']}>
                                                <span className="material-icons">
                                                    keyboard_double_arrow_right
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
=======
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
>>>>>>> parent of 18d0d8b8 (Rebuild Update 0.9.1)
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Dashboard;