import Head from 'next/head'
import Header from  './Header'
import Showcase from './Showcase'
import Footer from  './Footer'
import styles from '@/styles/Layout.module.css'
import {useRouter} from 'next/router';

export default function Layout({ title, keywords, description, children }) {

    const router = useRouter()

    return (
        <div>
            <Head>
                <title>OERticker :: {title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </Head>
            <Header />
            {router.pathname === '/' && <Showcase />}

            <div className={styles.container}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'OERticker',
    description: 'Im OERticker werden die Links zu den  neuesten und frischesten Open Educational Resources von Nutzer:innen geteilt.',
    keyword: 'OER, Bildungsmaterial, Digitale Bildung'
}


