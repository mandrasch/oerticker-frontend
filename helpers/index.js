import cookie from 'cookie'

export function parseCookies(req) {
    //console.log('req',req.headers)
    return cookie.parse(req ? req.headers.cookie || '' : '')
}