import Layout from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddLinkPage() {
    // TODO: how does this work exactly?
    const [values, setValues] = useState({
        title: '',
        url: '',
        description: ''
    })

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Submit', values)

        // validation
        const hasEmptyFields = Object.values(values).some((element) => element === '')

        if(hasEmptyFields){
            toast.error("Please fill in all fields")
        }

        const res = await fetch(`${API_URL}/links`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)
        })

        if(!res.ok){
            toast.error('Something went wrong')
        }else{
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

            <h1>Neuen Link teilen</h1>
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
                <input type='submit' value='Link einreichen' className='btn' />
            </form>

        </Layout>
    )
}
