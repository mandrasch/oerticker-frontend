import { createContext,useState,useEffect} from "react"
import { useRouter } from "next/router"
import {API_URL} from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [error,setError] = useState(null)

    // Register user
    const register = async (user) => {
        console.log(user)
    }

    // Login user (email renamed to identifier, because of strapi)
    const login = async ({email:identifier,password}) => {
        console.log('login (called in authcontext):',identifier,password)
    }

    // Logout user
    const logout = async (user) => {
        console.log(user)
    }

    // Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        console.log('Check login status')
    }

    return(
        <AuthContext.Provider value={{user,error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext