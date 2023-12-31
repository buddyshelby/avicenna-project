import './table-user.css'
import { useWindowSize } from '../../../Function/SeparateFunction'
import { CardTotal, TableList } from './Component/component'
import { Fragment } from 'react'
import { useEffect } from 'react'

export const TableUser = ({ getAllUsers }) => {

    // eslint-disable-next-line
    const [width, height] = useWindowSize()

    // Begin of The Table Component

    const listTheTotal = [
        {
            nama: "Total User",
            total: getAllUsers.length
        },
        {
            nama: "Admin",
            total: "1,893"
        },
        {
            nama: "Active Now",
            total: "189"
        }
    ]

    // End of The Table Component

    return (
        <div className="table-user--section">
            <div className='table-user--greeting'>
                Hello Steve 👋🏼,
            </div>
            <div className='table-user--monitor'>
                <div className='table-user--monitor--wrapper'>
                    {listTheTotal.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <CardTotal>{ `${item.nama}|${item.total}` }</CardTotal>
                            </Fragment>
                        )
                    })}
                </div>
            </div>
            <TableList/>
        </div>
    )
}

export default TableUser;