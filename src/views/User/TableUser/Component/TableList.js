import './component-table-user-style.css'
import { EachContentList } from './component'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const TableList = () => {

    const { userGetAllDataUser: provideAllUser } = useSelector(state => state.auth)
    const [userGetAllDataUser, setUserGetAllDataUser] = useState(provideAllUser)
    const tempDump = provideAllUser
    const [searchQuery, setSearchQuery] = useState('')
    const [pagination, setPagination] = useState({
        totalPaginationPage: Math.ceil(userGetAllDataUser.length / 5),
        pageNumber: [],
        pageActive: 1
    })

    const navigate = useNavigate()

    const searchHandler = (e) => {
        const string = e.target.value
        setPagination(prevPagination => ({...prevPagination, pageActive: 1}))
        setSearchQuery(string)

        const filteredData = tempDump.filter(item => item.fullname.toLowerCase().includes(string.toLowerCase()));
        setPagination(prevPagination => ({...prevPagination, totalPaginationPage: Math.ceil(filteredData.length / 5)}))

        // const temp = []
        // for (let aPage = 1;aPage <= Math.ceil(totalPaginationPage.length / 5);aPage++) {
        //     temp.push(aPage)
        // }
        // setPagination({...pagination, pageNumber: temp})
        // console.log(pagination.totalPaginationPage);
    }

    const activePaginationHandler = (index) => {
        setPagination({...pagination, pageActive: index})
    }

    useEffect(() => {
        const temp = []
        for (let aPage = 1;aPage <= pagination['totalPaginationPage'];aPage++) {
            temp.push(aPage)
        }
        setPagination(prevPagination => ({...prevPagination, pageNumber: temp}))
    },[pagination.totalPaginationPage])

    return (
        <div className='table-user--table'>
            <div className='table-user--top-table'>
                <div className='table-user--top-table--left'>
                    <div className='table-user--top-table--text'>
                        <span>User</span>
                        <span>Active Users</span>
                    </div>
                </div>
                <div className='table-user--top-table--right'>
                    <div className='table-user--top-table--search-bar'>
                        <div className='table-user--top-table--search-bar-box'>
                            <span className="material-icons">
                                search
                            </span>
                            <input onChange={(e) => searchHandler(e)} type="name" name="search" placeholder='Search' />
                        </div>
                    </div>
                    <div className='table-user--top-table--add-user'>
                        <div onClick={() => navigate('/addUser')}>
                            Add User
                        </div>
                    </div>
                </div>
            </div>
            <div className='table-user--middle-table'>
                <div className='table-user--middle-table--wrapper'>
                    <div className='table-user--middle-table--list'>
                        <div className='content-listed header'>Name</div>
                        <div className='content-listed header'>Email</div>
                        {/* <div className='content-listed header'>Address</div> */}
                        <div className='content-listed header'>Phone Number</div>
                        <div className='content-listed header'>Position</div>
                        <div className='content-listed'>    
                            <div className='content-listed--action hide'>
                                <span className="material-icons">
                                    edit
                                </span>
                            </div>
                            <div className='content-listed--action hide'>
                                <span className="material-icons">
                                    edit
                                </span>
                            </div>
                            <div className='content-listed--action hide'>
                                <span className="material-icons">
                                    edit
                                </span>
                            </div>
                        </div>
                    </div>
                    {(searchQuery === '') ? userGetAllDataUser.map((item, index) => {
                        const totalPage = pagination['totalPaginationPage']
                        const activePage = pagination['pageActive']
                        const first = 5 * (activePage - 1)
                        const limitedPage = 5 * activePage
                        return (index >= first && index < limitedPage) && (
                            <Fragment key={index}>
                                <EachContentList
                                nama={item.fullname}
                                email={item.email}
                                address={item.alamat}
                                id_user={item.id_user}
                                phone={`081289522934`}
                                position={`Office Boy`}
                                key={item.id_user}
                                />
                            </Fragment>
                        )
                    }) : (userGetAllDataUser.filter(item => item.fullname.toLowerCase().includes(searchQuery.toLowerCase()))[0] !== undefined) ? userGetAllDataUser.filter(item => item.fullname.toLowerCase().includes(searchQuery.toLowerCase())).map((item, index) => {
                        const totalPage = pagination['totalPaginationPage']
                        const activePage = pagination['pageActive']
                        const first = 5 * (activePage - 1)
                        const limitedPage = 5 * activePage
                        return (index >= first && index < limitedPage) && (
                            <Fragment key={index}>
                                <EachContentList
                                nama={item.fullname}
                                email={item.email}
                                address={item.alamat}
                                id_user={item.id_user}
                                phone={`081289522934`}
                                position={`Office Boy`}
                                key={item.id_user}
                                />
                            </Fragment>
                        )
                    }) : <div className='table-user--middle-table--list' style={{ border: 'none' }}><div className='content-listed header'>User Not Found</div></div>}
                    
                </div>
            </div>
            <div className='table-user--bottom-table'>
                <div className='table-user--bottom-table--left'>
                    <div className='table-user--bottom-table--text'>
                        Showing data 1 to 8 of  256K entries
                    </div>
                </div>
                <div className='table-user--bottom-table--right'>
                    <div className='table-user--bottom-table--pagination'>
                        <div className='table-user--bottom-table--pagination--left-arrow' onClick={() => activePaginationHandler(pagination['pageActive'] > 1 ? pagination['pageActive'] - 1 : 1)}>
                            <span className="material-icons">
                                chevron_left
                            </span>
                        </div>
                        <div className='table-user--bottom-table--pagination--number-list'>
                            {pagination['pageNumber'].map((item, index) => {
                                const numActive = pagination['pageActive']
                                const totalPagination = pagination['totalPaginationPage']
                                return (item >= (numActive > totalPagination - 3 ? totalPagination - 3 : numActive) && item <= 3 + numActive && item < totalPagination) &&
                                        <div key={index} onClick={() => activePaginationHandler(item)} style={{ backgroundColor: item === numActive &&'#5932EA', color: item === numActive && 'white' }}>{(item > 3 && item === pagination['totalPaginationPage']) ? `... ${item}` : item}</div>
                            })}
                            {pagination['pageNumber'].map((item, index) => {
                                const numActive = pagination['pageActive']
                                const totalPagination = pagination['totalPaginationPage']
                                return (item === 4 + numActive) && <div key={index} className='not'>...</div>
                            })}
                            {pagination['pageNumber'].map((item, index) => {
                                const numActive = pagination['pageActive']
                                const totalPagination = pagination['totalPaginationPage']
                                return (item > 3 && item === totalPagination) &&
                                        <div key={index} onClick={() => activePaginationHandler(item)} style={{ backgroundColor: item === numActive &&'#5932EA', color: item === numActive && 'white' }}>{item}</div>
                            })}
                        </div>
                        <div className='table-user--bottom-table--pagination--right-arrow' onClick={() => activePaginationHandler(pagination['pageActive'] < pagination['totalPaginationPage'] ? pagination['pageActive'] + 1 : pagination['totalPaginationPage'])}>
                            <span className="material-icons">
                                chevron_right
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}