import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { NEXT_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() => checkUserLoggedIn(), [])

    // Register user
    const register = async (user) => {
        console.log('Register user', user,'body:', JSON.stringify(user))
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(user)
        }) 

        console.log('response', res)

        const data = await res.json()

        console.log('response data',data)

        if (res.ok) {
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data.message)
            setError(null)
        }
    }

    // Login user (email renamed to identifier, because of strapi)
    const login = async ({ email: identifier, password }) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                identifier,
                password
            })
        })

        const data = await res.json()

        console.log(data)

        if (res.ok) {
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            setError(data.message)
        }
    }



    // Logout user
    const logout = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST'
        })
        if (res.ok) {
            setUser(null)
            router.push('/')
        }
    }

    // Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        console.log('Check login status')
        const res = await fetch(`${NEXT_URL}/api/user`)
        const data = await res.json()
        if (res.ok) {
            setUser(data.user)
        } else {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext