import { useState } from 'react'
import './modal-detail-user.css'
import { useSelector } from 'react-redux'

export const ModaDetailUser = ({ setModal, id_user }) => {

    const { userGetAllDataUser } = useSelector(state => state.auth)
    const [styleModal, setStyleModal] = useState({})

    const detailUser = userGetAllDataUser.filter(item => item.id_user === id_user)[0]

    const hidehandler = () => {
        setStyleModal({ animation: 'modalClosed 1s forwards' })
        setTimeout(() => {
            setModal('')
        }, 1000);
    }

    return (
        <>
            <div className='table-user--modal-detail' style={styleModal}>
                <div className='table-user--modal-detail--background' onClick={() => hidehandler()}></div>
                <div className='table-user--modal-detail-wrapper'>
                    <div className='table-user--modal-detail--text'>
                        <span className='table-user--modal-detail--title'>
                            nama
                        </span>
                        <span className='table-user--modal-detail--desc'>
                            {detailUser.fullname}
                        </span>
                        <span className='table-user--modal-detail--title'>
                            email
                        </span>
                        <span className='table-user--modal-detail--desc'>
                            {detailUser.email}
                        </span>
                        <span className='table-user--modal-detail--title'>
                            address
                        </span>
                        <span className='table-user--modal-detail--desc'>
                            {detailUser.alamat}
                        </span>
                        <span className='table-user--modal-detail--title'>
                            phone
                        </span>
                        <span className='table-user--modal-detail--desc'>
                            081289522934
                        </span>
                        <span className='table-user--modal-detail--title'>
                            position
                        </span>
                        <span className='table-user--modal-detail--desc'>
                            Pengusaha Batu Bara
                        </span>
                    </div>
                    <div className='table-user--modal-detail--action--wrapper'>
                        <div className='table-user--modal-detail--action'>
                            Edit
                        </div>
                        <div className='table-user--modal-detail--action'>
                            Delete
                        </div>
                    </div>
                </div> 
            </div>
        </>
    )
}