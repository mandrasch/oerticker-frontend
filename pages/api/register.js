import { API_URL } from '@/config/index'
import cookie from 'cookie'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req, res) => {
    if (req.method === 'POST') {
        console.log('req body',req.body)
        const { username, email, password } = req.body

        const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        const data = await strapiRes.json()

        if (strapiRes.ok) {
            // Set cookie
            res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // week
                sameSite: 'strict',
                Path: '/'
            }))
            res.status(200).json({ user: data.user })
        } else {
            res.status(data.statusCode).json({ message: data.message[0].messages[0].message })
        }

    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}