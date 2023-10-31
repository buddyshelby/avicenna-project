import styles from './loading.module.css'
import stylesImage from './image-loading.module.css'

export const ImageLoading = ({ size }) => {

    const customSize = size ? size.replaceAll(' ','').split(',') : ''

    return <div>
        <div className={stylesImage['loading--image']} style={{ width: customSize[0], height: customSize[1] }}></div>
    </div>
}

const Loading = () => {
    return <div className={styles.loader}>
        <div className={styles.container}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
}

export default Loading;