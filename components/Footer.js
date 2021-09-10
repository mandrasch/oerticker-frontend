import Link from 'next/link'
import styles from '@/styles/Footer.module.css'

export default function Header() {
    return (
        <footer className={styles.footer123}>
            <p>Made in Vienna - 2021</p>
            <p>
                <Link href='/about'>
                    <a>About</a>
                </Link>
            </p>
        </footer>
    )
}
