import { Img } from 'react-image'
import imageStorage from '../../../../assets/Dashboard/imageStorage'
import './top-summary.css'

const theData = [
    {
        id: 'siswa',
        name: 'Siswa',
        total: '350'
    },
    {
        id: 'alumni',
        name: 'Alumni',
        total: '642'
    },
    {
        id: 'guru',
        name: 'Guru',
        total: '127'
    },
    {
        id: 'staff',
        name: 'Staff',
        total: '331'
    },
]

const TopSummary = () => {

    return (
        <div className="dashboard--top-summary">
            <div className="dashboard--top-summary--wrapper">
                {theData.map((item, index) => {

                    return (
                        <div className='dashboard--top-summary--column'>
                            <div className="dashboard--top-summary--icon">
                                <Img src={imageStorage['statis-icon-1']} />
                            </div>
                            <div className="dashboard--top-summary--text">
                                <span>{item.name}</span>
                                <span>{item.total}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TopSummary;