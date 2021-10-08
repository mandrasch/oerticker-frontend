import Layout from '@/components/Layout'
import LinkItem from '@/components/LinkItem'
import {API_URL} from '@/config/index'
import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SearchPage({links}) {
    const router = useRouter()
    return (
        <Layout title='Suchergebnisse'>
            <Link href='/links'>Zurück</Link>
            <h1>Suchergebnisse für "{router.query.term}"</h1>
            {links.length === 0 && <h3>Bisher noch keine Links vorhanden. :(</h3>}
            {links.map(link => (
                <LinkItem key={link.id} link={link} />
            ))}
        </Layout>
    )
}

export async function getServerSideProps({query:{term}}){

    const query = qs.stringify({
        _where:{
            _or:[
                {title_contains: term},
                {description_contains: term},
                {user_contains: term}
            ]
        }
    })

    const res = await fetch(`${API_URL}/links?title_contains=${term}`)
    const links = await res.json()
    //console.log(links) // this will be printed on terminal (server side)

    return{
        props:{links}
    }
}