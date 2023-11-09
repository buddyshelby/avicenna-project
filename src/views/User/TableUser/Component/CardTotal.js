import './component-table-user-style.css'
import imageStorage from '../../../../assets/TableUser/imageStorage'
import { Img } from 'react-image'
import { ImageLoading } from '../../../components/loading/Loading'
import { useWindowSize } from '../../../../Function/SeparateFunction'

export const CardTotal = ({ children }) => {

    const [width, height] = useWindowSize()
    const imageParams = children.split('|')[0].replaceAll(' ','-').toLowerCase()
    const headerName = children.split('|')[0]
    const total = children.split('|')[1]

    return (
        <div className='table-user--all-total'>
            {width > 400 ?
            <Img
            src={imageStorage[imageParams]}
            loader={<ImageLoading size="54px, 54px"/>}
            style={{ width: '54px', height: '54px' }}
            /> :
            <Img
            src={imageStorage[imageParams]}
            loader={<ImageLoading size="75px, 75px"/>}
            style={{ width: '75px', height: '75px' }}
            />}
            <div className='table-user--text'>
                <span className='header'>{ headerName }</span>
                <span className='desc'>{ total }</span>
            </div>
        </div>
    )
}