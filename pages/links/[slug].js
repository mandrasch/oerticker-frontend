import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Layout from '@/components/Layout'
import EventMap from '@/components/EventMap'
import { API_URL } from '@/config/index'
import styles from '@/styles/Link.module.css'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function EventPage({ link }) {
  const router = useRouter() // react hook

  return (
    <Layout title="Details zu ">
      <div className={styles.link}>
        <span>
          {new Date(link.published_at).toLocaleString('de-AT')} by by{' '}
          {link.user != null ? link.user.name : 'Anonymes Eichhörnchen'}
        </span>

        <h2>{link.title}</h2>

        <div className={styles.image}>
          <Image
            src={
              link.image
                ? link.image.formats.medium.url
                : '/images/eichkatzerl_cc0_own_photo.png'
            }
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            alt=""
          />
        </div>

        <h3>Beschreibung:</h3>
        <p>{link.description}</p>

        <h3>URL:</h3>
        <p>{link.url}</p>

        <Link href="/links">
          <a className={styles.back}>Zurück</a>
        </Link>
      </div>

      <ToastContainer />
    </Layout>
  )
}

/* export async function getStaticProps({ params: { slug } }) {
  //console.log('slug: ' + slug);
  const res = await fetch(`${API_URL}/links?slug=${slug}`)
  const links = await res.json()
  //console.log(links)
  return {
    props: { link: links[0] },
    revalidate: 1,
  }
} */

// // we need this, because the build process doesn't know the paths to generate
// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/links/`)
//   const links = await res.json()
//   const paths = links.map((link) => ({
//     params: {
//       slug: link.slug,
//     },
//   }))
//   //console.log(paths)

//   return {
//     // array with objects and object.params values (URL paths)
//     paths,
//     fallback: true,
//   }
// }

// ssr rendering
export async function getServerSideProps({ query: { slug } }) {
    console.log('slug: ' + slug,`${API_URL}/links?slug=${slug}`);
    const res = await fetch(`${API_URL}/links?slug=${slug}`)
    const links = await res.json()
    console.log('link found', links[0])
    // returns undefined if not found
    return {
        props: { link: links[0] }
    }
}
