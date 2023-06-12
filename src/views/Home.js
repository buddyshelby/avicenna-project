import styles from './home.module.css'

import Jumbotron from '../sections/Login'

const Home = () => {
    return (
        <main id={styles['home--page']}>
            <Jumbotron />
        </main>
    )
}

export default Home