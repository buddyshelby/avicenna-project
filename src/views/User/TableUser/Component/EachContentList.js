import { useState } from "react"
import { useWindowSize } from "../../../../Function/SeparateFunction"
import { ModaDetailUser } from './component'
import { useNavigate } from "react-router-dom"

export const EachContentList = ({ nama, email, address, phone, position, id_user }) => {
    const [width, height] = useWindowSize()
    const [modal, setModal] = useState('')
    const navigate = useNavigate()

    const detailsHandler = (passId) => {
        setModal(passId)
    }

    const editHandler = () => {
        navigate(`/editUser/${id_user}`)
    }

    const deleteHandler = () => {
        navigate(`/deleteUser/${id_user}`)
    }
    
    return (
        <div className='table-user--middle-table--list'>
            <div className='content-listed'>{ nama }</div>
            <div className='content-listed'>{ email }</div>
            {/* <div className='content-listed'>{ address }</div> */}
            <div className='content-listed'>{ phone }</div>
            <div className='content-listed'>{ position }</div>
            <div className='content-listed'>
                <div className='content-listed--action' onClick={editHandler}>
                    <span className="material-icons">
                        edit
                    </span>
                </div>
                <div className='content-listed--action' onClick={deleteHandler}>
                    <span className="material-icons">
                        delete
                    </span>
                </div>
                <div className='content-listed--action' onClick={() => detailsHandler(id_user)}>
                    <span className="material-icons">
                        info
                    </span>
                </div>
            </div>
            {(modal === id_user) && <ModaDetailUser id_user={id_user} setModal={setModal}/>}
        </div>
    )
}