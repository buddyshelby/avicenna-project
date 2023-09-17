import styles from './dashboard.module.css'
import DashNav from '../../components/dashboard/DashNav';
import dashJson from '../../JSON/dashboard.json'
import { useEffect, useRef, useState } from 'react';
import dataStorage from '../../assets/account/getAccountAsset'
import { useWindowSize, ResponsiveComponent } from '../../Function/SeparateFunction'

const Dashboard = () => {

    const accountJson = dashJson.account
    const boxContent = dashJson['box-content']
    const totalBoxContent = Math.ceil(boxContent.length / 2)
    const [photoProfile, setPhotoProfile] = useState(null)
    const [paginationNumber, setPaginationNumber] = useState([])
    const [paginationActive, setPaginationActive] = useState(0)
    const contentBoxSizeRef = useRef('')
    const lastContentBoxRef = useRef('')
    const paginationRef = useRef('')
    // eslint-disable-next-line
    const [width, height] = useWindowSize()

    useEffect(() => {
        let paginationTemp = []
        for (let i=1;i <= totalBoxContent;i++) {
            (paginationTemp.length < totalBoxContent ) && paginationTemp.push(i)
        }
        
        setPaginationNumber(paginationTemp);
    },
    // eslint-disable-next-line
    [])

    useEffect(() => {
        dataStorage({username: accountJson.username})
        .then((module) => {
            // console.log(module);
            setPhotoProfile(module)
        })
        .catch(() => {

        })
    },
    // eslint-disable-next-line
    [photoProfile])

    const statusStyle = (status) => {
        if (status.toUpperCase() === "MASUK") {
            return {
                color: `#6EE7B7`,
                backgroundColor: `#065F46`,
                fontSize: `${ResponsiveComponent(1080, 14, 600, 7, width)}px`
            }
        } else if (status.toUpperCase() === "ABSEN") {
            return {
                color: `#FCA5A5`,
                backgroundColor: `#991B1B`,
                fontSize: `${ResponsiveComponent(1080, 14, 600, 7, width)}px`
            }
        }
    }

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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['dashboard--header-box']}>
                                    
                                </div>
                                <div className={styles['dashboard--box-content']}>
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
                                    {}
                                    <div className={styles['dashboard--box-content--data']} ref={contentBoxSizeRef} style={{ height: (paginationRef.current && lastContentBoxRef.current && contentBoxSizeRef.current && (paginationRef.current.offsetTop > lastContentBoxRef.current.offsetTop + lastContentBoxRef.current.clientHeight)) && `calc(${(height - paginationRef.current.clientHeight) - contentBoxSizeRef.current.offsetTop}px - 5px)` }}>
                                        {// eslint-disable-next-line
                                        boxContent.map((data, index) => {
                                            console.log(paginationRef.current.offsetTop);
                                            if (index < boxContent.length && index < totalBoxContent && index > paginationActive - 1) {
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

export const action = async ({ request }) => {
    const data = await request.formData();
    const email = data.get('password');
    
    // send to backend newsletter server ...
    console.log(email)
    return { message: 'Signup successful!' };
}