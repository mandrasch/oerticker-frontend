import { useRouter } from "next/router"
import Layout from '@/components/Layout'

export default function EventPage() {

    const router = useRouter() // react hook
    console.log(router) 

    return (
        <Layout title="Details zu ">
            <h1>Link details</h1>
        </Layout>
    )
}
