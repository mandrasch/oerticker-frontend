import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'

export default function Header() {
    // destructure what we need to use (pull out)
    const { user, logout } = useContext(AuthContext)

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
                    {user ? (
                        // if logged in
                        <>
                            <li>
                                <Link href='/links/add'>
                                    <a>Link hinzufügen</a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/account/dashboard'>
                                    <a>Benutzer:in-Profil</a>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => logout()} className='btn-secondary btn-icon'><FaSignOutAlt /> Logout
                                </button>
                            </li>
                        </>) : (
                        // if logged out
                        <><li>
                            <Link href='/account/login'>
                                <a className='btn-secondary btn-icon'><FaSignInAlt /> Login</a>
                            </Link>
                        </li></>)}


                </ul>
            </nav>

        </header>
    )
}
