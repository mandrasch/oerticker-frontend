import {FaExclamationTriangle} from 'react-icons/fa'
import Layout from '../components/Layout'
import styles from '../styles/404.module.css'

export default function NotFoundPage() {
    return (
        <Layout title='Seite nicht gefunden'>
            <div className={styles.error}>
                <h1><FaExclamationTriangle /> Ooopsie!</h1>
               <p>Der Link wurde wohl schon recycelt und ist nicht mehr verfügbar.</p>
            </div>
        </Layout>
    )
}