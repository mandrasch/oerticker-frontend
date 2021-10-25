import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useContext } from 'react'
import Link from "next/link"
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import { FaUser } from 'react-icons/fa'

export default function RegisterPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if(password !== passwordConfirm){
            toast.error('Passwörter stimmen nicht überein')
            return
        }

        console.log({username, email,password, passwordConfirm})
    }

    return (
        <Layout title="Registrierung">
            <div className={styles.auth}>
                <h1><FaUser /> Registrierung</h1>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                <div>
                        <label htmlFor="username">
                            Benutzer:in-Name 
                        </label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="email">
                            E-Mailadresse
                        </label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Passwort
                        </label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="passwordConfirm">
                            Passwort-Bestätigung
                        </label>    
                        <input type="passwordConfirm" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </div>

                    <input type='submit' value='Registrieren' className='btn' />
                </form>

                <p>Du hast schon einen Account? <Link href='/account/login'>Login</Link></p>
            </div>
        </Layout>
    )
}