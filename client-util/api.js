import axios from 'axios'
import { getCookie, setCookie, removeCookie } from './session'
import config from '../config'

const HOST = process.env.NODE_ENV !== 'production'
  ? 'https://localhost:3000'
  : 'https://morning-everglades-93431.herokuapp.com'

// Se inicializan las configuraciones por defecto
// de axios
if (process.browser) {
  const jwt = getCookie('jwt')
  const jwtRfs = getCookie('jwt-rfs')

  if (jwt && jwtRfs) {
    axios.defaults.headers.common['jwt'] = jwt
    axios.defaults.headers.common['jwt-rfs'] = jwtRfs
  }
}

// Revisamos si existen los tokens de expiracion
// o de rehidrateo de token
axios.interceptors.response.use((res) => {
  // console.log(res.headers)
  if (res.headers['x-tn-expired-session']) {
    // Sesion expirada, borrar tokens y redireccionar a  /?expired=true
    console.log('expired')
    if (process.browser) {
      removeCookie('jwt')
      removeCookie('jwt-rfs')
      removeCookie(config.user_cookie_key)
      window.alert('EXPIRED')
      window.location = '/?expired=true'
    }
  }

  if (res.headers['x-rehydrate-tok']) {
    // Se caduco el JWT se rehidratara
    console.log('Se reidrata token', getCookie('jwt'), res.headers['x-rehydrate-tok'])
    axios.defaults.headers.common['jwt'] = res.headers['x-rehydrate-tok']
    setCookie('jwt', res.headers['x-rehydrate-tok'])
  }

  if (res.headers['x-no-acpp']) {
    // Se caduco el JWT se rehidratara
    window.location = '/terms'
  }

  return res
}, (error) => {
  // Do something with res error
  return Promise.reject(error)
})

const getCsrf = () => {
  if (process.browser) {
    return document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content')
  }
}

const Auth = {
  async oAuth (hash) {
    const res = await axios.post(`${HOST}/api/auth/login/oauth/${hash}`)
    return res.data
  },

  async login ({ password, email }) {
    const _csrf = getCsrf()
    const res = await axios.post('/api/auth/login/email', { password, email, _csrf })
    return res.data
  },

  async signup ({ password, fullname, email }) {
    const _csrf = getCsrf()
    console.log('REFF', _csrf)
    const res = await axios.post('/api/auth/signup/email', { password, fullname, email, _csrf })
    return res.data
  },

  // Solicita instrucciones por email para cambio de password
  async forgot (email) {
    const _csrf = getCsrf()
    const res = await axios.post('/api/auth/forgot', { email, _csrf })
    return res.data
  },

  // Realiza la confirmacion de cambio de contraseña
  async changePassword (email, password, token) {
    const _csrf = getCsrf()
    const res = await axios.post('/api/auth/change-password', { email, password, token, _csrf })
    return res.data
  }

}

const User = {
  async get () {
    const res = await axios.get(`/api/user`)
    return res.data
  },

  async acceptTerms () {
    const res = await axios.post('/api/auth/accept-terms')
    return res.data
  },

  async updateFBAccessToken (fbToken) {
    console.log(fbToken)
    const res = await axios.put('/api/user/facebook/accessToken', {
      facebook_access_token: fbToken
    })
    return res.data
  },

  async update (user) {
    const res = await axios.put(`/api/user/${user._id}`, { user })
    return res.data
  },

  async getAll (skip = 0) {
    const res = await axios.get(`/api/users/?skip=${skip}`)
    return res.data
  },

  async findByName (name) {
    const res = await axios.get(`/api/usersByName/?search=${name}`)
    return res.data
  }
}

const Photo = {
  async upload (workId, side, formData) {
    const res = await axios.post(`/api/photo/${workId}/${side}`, formData, {
      headers: {
        'Content-Type': `multipart/form-data`
      }
    })
    return res.data
  },

  async getAll (skip = 0) {
    const res = await axios.get(`/api/photos?skip=${skip}`)
    return res.data
  }
}

const Work = {
  async getAllSelf (skip = 0) {
    const res = await axios.get(`/api/works?skip=${skip}`)
    return res.data
  },

  async post () {
    const res = await axios.post(`/api/work`)
    return res.data
  },

  async getById (id) {
    const res = await axios.get(`/api/work/${id}`)
    return res.data
  },

  async update (work) {
    const res = await axios.put(`/api/work/${work._id}`, { work })
    return res.data
  },

  async compile (work) {
    const res = await axios.get(`/api/work/compile/${work._id}`)
    return res.data
  }
}

const Texture = {
  async getAll (skip = 0) {
    const res = await axios.get(`/api/textures?skip=${skip}`)
    return res.data
  },

  async post (texture) {
    const res = await axios.post(`/api/texture`, { texture })
    return res.data
  },

  async update (texture) {
    const res = await axios.put(`/api/texture/${texture._id}`, { texture })
    return res.data
  },

  async delete (texture) {
    const res = await axios.delete(`/api/texture/${texture._id}`)
    return res.data
  },

  async upload (id, formData) {
    const res = await axios.post(`/api/texture/${id}/image`, formData, {
      headers: {
        'Content-Type': `multipart/form-data`
      }
    })
    return res.data
  }
}

const Category = {
  // Solo admin
  // retorna todas las categorias sin paginacion ni limite
  async getAllAdmin () {
    const res = await axios.get(`/api/allcategories`)
    return res.data
  },

  async getAll (skip = 0) {
    const res = await axios.get(`/api/categories?skip=${skip}`)
    return res.data
  },

  async post (category) {
    const res = await axios.post(`/api/category`, { category })
    return res.data
  },

  async update (category) {
    const res = await axios.put(`/api/category/${category._id}`, { category })
    return res.data
  },

  async delete (category) {
    const res = await axios.delete(`/api/category/${category._id}`)
    return res.data
  },

  async upload (id, formData) {
    const res = await axios.post(`/api/category/${id}/image`, formData, {
      headers: {
        'Content-Type': `multipart/form-data`
      }
    })
    return res.data
  }
}

const Design = {
  // Admin only
  async getAll (skip = 0) {
    const res = await axios.get(`/api/designs/?skip=${skip}`)
    return res.data
  },

  async getByCategory (category, skip = 0) {
    const res = await axios.get(`/api/design/?category=${category}&skip=${skip}`)
    return res.data
  },

  async post (design) {
    const res = await axios.post(`/api/design`, { design })
    return res.data
  },

  async update (design) {
    const res = await axios.put(`/api/design/${design._id}`, { design })
    return res.data
  },

  async delete (design) {
    const res = await axios.delete(`/api/design/${design._id}`)
    return res.data
  },

  async upload (id, formData) {
    const res = await axios.post(`/api/design/${id}/image`, formData, {
      headers: {
        'Content-Type': `multipart/form-data`
      }
    })
    return res.data
  }
}

const Envelope = {
  // Admin only
  async getAll (skip = 0) {
    const res = await axios.get(`/api/envelopes/?skip=${skip}`)
    return res.data
  },

  async post (envelope) {
    const res = await axios.post(`/api/envelope`, { envelope })
    return res.data
  },

  async update (envelope) {
    const res = await axios.put(`/api/envelope/${envelope._id}`, { envelope })
    return res.data
  },

  async delete (envelope) {
    const res = await axios.delete(`/api/envelope/${envelope._id}`)
    return res.data
  },

  async uploadImage (id, formData) {
    const res = await axios.post(`/api/envelope/${id}/image`, formData, {
      headers: {
        'Content-Type': `multipart/form-data`
      }
    })
    return res.data
  },

  async uploadCover (id, formData) {
    const res = await axios.post(`/api/envelope/${id}/cover`, formData, {
      headers: {
        'Content-Type': `multipart/form-data`
      }
    })
    return res.data
  }
}

const Invoice = {
  async getAll (skip = 0) {
    const res = await axios.get(`/api/invoices/?skip=${skip}`)
    return res.data
  }
}

export default {
  Auth,
  User,
  Work,
  Photo,
  Texture,
  Category,
  Design,
  Envelope,
  Invoice
}
