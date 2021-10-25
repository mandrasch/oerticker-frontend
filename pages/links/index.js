import Layout from '@/components/Layout'
import LinkItem from '@/components/LinkItem'
import Pagination from '@/components/Pagination'
import {API_URL, PER_PAGE} from '@/config/index'

export default function LinksPage({links, page, total}) {

    // calculate lastPage
    const lastPage = Math.ceil(total / PER_PAGE)

    return (
        <Layout title='Übersicht'>
            <h1>Links</h1>
            {links.length === 0 && <h3>Bisher noch keine Links vorhanden. :(</h3>}
            {links.map(link => (
                <LinkItem key={link.id} link={link} />
            ))}

          <Pagination page={page} total={total} />

        </Layout>
    )
}

export async function getServerSideProps({query:{page = 1}}){

    // calculate start page value (&_start= "Skip a specific number of entries (especially useful for pagination")
    // console.log('page requested:',page)
    const start = parseInt(page) === 1 ? 0 : ((parseInt(page) - 1) * PER_PAGE)

    // Fetch total
    const totalRes = await fetch(`${API_URL}/links/count`)
    const total = await totalRes.json()

    // Fetch links
    const linksRes = await fetch(`${API_URL}/links?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
    const links = await linksRes.json()

    return{
        props:{links, page: parseInt(page),total}
    }
}