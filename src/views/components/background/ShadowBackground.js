import styles from './shadowBackgorund.module.css'

const ShadowBackground = (props) => {
    return (
        <div className={styles['shadow-background']} style={{ transform: props.showModal ? `translate(0, 0)` : `translate(0, -100%)` }}>
            {/* <div className={styles['close-modal']} onClick={closeModal} /> */}
            {props.children}
        </div>
    )
}

export default ShadowBackground