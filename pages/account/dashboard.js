import Layout from '@/components/Layout'
import DashboardLink from '@/components/DashboardLink'
import { parseCookies } from '@/helpers/index'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/router'

export default function DashboardPage({ links, token }) {
  console.log('Links for user found', links)

  const router = useRouter()

  const deleteLink = async (id) => {
    console.log('delete id:', id)
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/links/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error('Something went wrong. ' + data.message)
      } else {
        router.reload()
      }
    }
  }

  return (
    <Layout title="Benutzer:in-Profil">
      <div className={styles.dash}>
        <h1>Benutzer: in-Profil</h1>
        <h3>My Events</h3>

        {links.map((link) => (
          <DashboardLink key={link.id} link={link} handleDelete={deleteLink} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const res = await fetch(`${API_URL}/links/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const links = await res.json()

  return {
    props: { links, token },
  }
}
