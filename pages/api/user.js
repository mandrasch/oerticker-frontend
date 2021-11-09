import { API_URL } from '@/config/index'
import cookie from 'cookie'

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */export default async (req, res) => {
    if (req.method === 'GET') {
        if(!req.headers.cookie){
            res.status(403).json({message:'Not Authorized'})
            return
        }

        // parse cookie for token
        const {token} = cookie.parse(req.headers.cookie)

        // send token to strapi
        const strapiRes = await fetch(`${API_URL}/users/me`,{
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        const user = await strapiRes.json()
        
        if(strapiRes.ok){
            res.status(200).json({user})
        }else{
            res.status(403).json({message:'User forbidden'})
        }

    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}