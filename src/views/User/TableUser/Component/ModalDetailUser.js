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
                        <div className='table-user--modal-detail--title'>
                            nama
                        </div>
                        <div className='table-user--modal-detail--desc'>
                            {detailUser.fullname}
                        </div>
                        <div className='table-user--modal-detail--title'>
                            email
                        </div>
                        <div className='table-user--modal-detail--desc'>
                            {detailUser.email}
                        </div>
                        <div className='table-user--modal-detail--title'>
                            address
                        </div>
                        <div className='table-user--modal-detail--desc'>
                            {detailUser.alamat}
                        </div>
                        <div className='table-user--modal-detail--title'>
                            phone
                        </div>
                        <div className='table-user--modal-detail--desc'>
                            081289522934
                        </div>
                        <div className='table-user--modal-detail--title'>
                            position
                        </div>
                        <div className='table-user--modal-detail--desc'>
                            Pengusaha Batu Bara
                        </div>
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