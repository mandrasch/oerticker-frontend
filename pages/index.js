import Layout from '@/components/Layout'
import LinkItem from '@/components/LinkItem'
import {API_URL} from '@/config/index'

export default function LinksPage({links}) {

    console.log('links',links)
    
    return (
        <Layout title='Übersicht'>
            <h1>Frische Links</h1>
            { links.length }
            {links.length == 0 && <h3>Bisher noch keine Links vorhanden. :(</h3>}

            {links.length > 0 && links.map(link => (
                <LinkItem key={link.id} link={link} />
            ))}
        </Layout>
    )
}

export async function getStaticProps(){

    const res = await fetch(`${API_URL}/links?_sort=published_at:DESC&_limit=2`)
    const links = await res.json()
    //console.log(links) // this will be printed on terminal (server side)

    return{
        props:{links},
        revalidate: 1
    }
}