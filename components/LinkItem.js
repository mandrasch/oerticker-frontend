import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/LinkItem.module.css'

export default function LinkItem({ link }) {
    return (
        <div className={styles.linkContainer}>
            <div className={styles.img}>
                <Image src={link.image ? link.image : '/images/eichkatzerl_cc0_own_photo.png'} layout='fill' alt='' />
            </div>
            <div className={styles.info}>
                <span>{link.date} at {link.time}</span>
                <h3>{link.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/links/${link.slug}`}>
                    <a className='btn'>Details</a>
                </Link>
            </div>
        </div>
    )
}
