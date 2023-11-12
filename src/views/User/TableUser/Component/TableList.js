import './component-table-user-style.css'
import { EachContentList } from './component'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const TableList = () => {

    const { userGetAllDataUser } = useSelector(state => state.auth)
    const [searchQuery, setSearchQuery] = useState('')

    const searchHandler = (e) => {
        const string = e.target.value
        setSearchQuery(string)
    }

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
                        <div onClick={() => {}}>
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
                        return (
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
                        return (
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
                        <div className='table-user--bottom-table--pagination--left-arrow' tabIndex={0}>
                            <span className="material-icons">
                                chevron_left
                            </span>
                        </div>
                        <div className='table-user--bottom-table--pagination--number-list'>
                            <div tabIndex={1}>1</div>
                            <div tabIndex={2}>2</div>
                            <div tabIndex={3}>3</div>
                        </div>
                        <div className='table-user--bottom-table--pagination--right-arrow' tabIndex={4}>
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