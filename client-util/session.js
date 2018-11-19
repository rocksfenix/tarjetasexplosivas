import cookie from 'js-cookie'
import config from '../config'

export const getUser = (req) => {
  const user = getCookie(config.user_cookie_key, req)
  return user || null
}

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/'
      // domain: 'localhost',
      // secure: true,
      // HttpOnly: true
    })
  }
}

export const removeCookie = key => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    })
  }
}

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req)
}

const getCookieFromBrowser = key => {
  return cookie.getJSON(key)
}

const getCookieFromServer = (key, req) => {
  // console.log(req.cookies)
  if (!req && !req.cookies) {
    return undefined
  }

  try {
    return JSON.parse(req.cookies[key])
  } catch (error) {
    try {
      return req.cookies[key]
    } catch (error) {
      return undefined
    }
  }
}

// export const getUser = ({ req }) => {
//   let user = null

//   const userCookie = getCookie('user', req)
//   const jwt = getCookie('jwt', req) || null

//   try {
//     user = JSON.parse(userCookie)
//   } catch (error) {}

//   return { jwt, user }
// }
