import { FaImage } from 'react-icons/fa'
import Layout from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditLinkPage({ link }) {
    console.log('LIIINK', link)
    const [values, setValues] = useState({
        title: link.title,
        url: link.url,
        description: link.description
    })

    const [imagePreview, setImagePreview] = useState(link.image ? link.image.formats.thumbnail.url : null)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Submit', values)

        // validation
        const hasEmptyFields = Object.values(values).some((element) => element === '')

        if (hasEmptyFields) {
            toast.error("Please fill in all fields")
        }

        const res = await fetch(`${API_URL}/links/${link.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        if (!res.ok) {
            toast.error('Something went wrong')
        } else {
            const link = await res.json()
            // redirect to newly created link entry
            router.push(`/links/${link.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        //console.log('Input changes', name, value)
        setValues({ ...values, [name]: value }) // overwrite value, spread operator
    }

    return (
        <Layout title="Neuen Link teilen">

            <Link href='/links'>Zurück</Link>

            <h1>Link editieren</h1>
            <ToastContainer />

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='title'>Titel</label>
                        <input
                            type='text'
                            id='title'
                            name='title'
                            value={values.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='url'>URL</label>
                        <input
                            type='text'
                            id='url'
                            name='url'
                            value={values.url}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='description'>Beschreibung</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <input type='submit' value='Link aktualisieren' className='btn' />
            </form>

            <h2>Vorschaubild</h2>
            {imagePreview ? (
                <Image src={imagePreview} height={100} width={170} />
            ) : (<div>
                <p>Kein Bild hochgeladen</p></div>)
            }

            <div>
                <button className='btn-secondary'><FaImage /> Hochladen</button>
            </div>

        </Layout>
    )
}

export async function getServerSideProps({ params: { slug } }) {

    const res = await fetch(`${API_URL}/links/?slug=${slug}`)
    const links = await res.json()
    const link = links[0]
    return {
        props: {
            link
        }
    }
}