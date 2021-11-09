import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import styles from '@/styles/DashboardLink.module.css'
import link from 'next/link'

export default function DashboardLink({ link, handleDelete }) {
  return (
    <div className={styles.link}>
      <h4>
        <Link href={`/links/${link.slug}`}>
          <a>{link.title}</a>
        </Link>
      </h4>

      <Link href={`/links/edit/${link.slug}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Bearbeiten</span>
        </a>
      </Link>

      <a
        href="#"
        className={styles.delete}
        onClick={() => handleDelete(link.id)}
      >
        <FaTimes /> <span> Löschen</span>
      </a>
    </div>
  )
}
