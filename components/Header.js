import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import { FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'><a>OERticker</a></Link>
            </div>
            <Search />
            <nav>
                <ul>
                    <li>
                        <Link href="/links/">
                            <a>Links</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/links/add'>
                            <a>Link hinzufügen</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/account/login'>
                            <a className='btn-secondary btn-icon'><FaSignInAlt /> Login</a>
                        </Link>
                    </li>
                </ul>
            </nav>

        </header>
    )
}
