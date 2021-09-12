import { useRouter } from "next/router"
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Link.module.css'

export default function EventPage({ link }) {
    //console.log(link);
    const router = useRouter() // react hook
    //console.log(router) 

    const deleteEvent = (e) => {
        console.log('delete')
    }

    return (
        <Layout title="Details zu ">

            <div className={styles.link}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${link.slug}`}>
                        <a><FaPencilAlt /> Bearbeiten</a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Löschen
                    </a>
                </div>

                <span>
                    {link.date} at {link.time}
                </span>

                <h2>{link.name}</h2>

                <div className={styles.image}>
                    <Image src={link.image ? link.image : '/images/eichkatzerl_cc0_own_photo.png'} layout='fill' objectFit='cover' objectPosition='center center' alt='' />
                </div>

                <h3>Performers:</h3>
                <p>{link.performers}</p>
                <h3>Description:</h3>
                <p>{link.description}</p>
                <h3>Venue: {link.venue}</h3>
                <p>{link.address}</p>

                <Link href='/events'>
                    <a className={styles.back}>
                        Zurück
                    </a>
                </Link>
            </div>


        </Layout>
    )
}

export async function getStaticProps({ params: { slug } }) {
    //console.log('slug: ' + slug);
    const res = await fetch(`${API_URL}/api/links/${slug}/`)
    const links = await res.json()
    //console.log(links)
    return {
        props: { link: links[0] },
        revalidate: 1
    }
}

// we need this, because the build process doesn't know the paths to generate
export async function getStaticPaths() {

    const res = await fetch(`${API_URL}/api/links/`)
    const links = await res.json()
    const paths = links.map(link => ({
        params: {
            slug: link.slug
        }
    }))
    //console.log(paths)

    return {
        // array with objects and object.params values (URL paths)
        paths,
        fallback: true
    }
}

// ssr rendering
/*export async function getServerSideProps({ query: { slug } }) {
    //console.log('slug: ' + slug);
    const res = await fetch(`${API_URL}/api/links/${slug}/`)
    const links = await res.json()
    //console.log(links)
    return {
        props: { link: links[0] }
    }
}*/