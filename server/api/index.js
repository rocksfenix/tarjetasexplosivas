import express from 'express'
import csrf from 'csurf'
import errorHandler from '../midlewares/errorHandler'
import authEmail from './auth/auth-email'
import authGoogle from './auth/auth-google'
import authFacebook from './auth/auth-facebook'
import loginOauth from './auth/login-oauth'
import user from './user/user'
import recovery from './auth/recovery-password'

import design from './design'
import photos from './photos'
import works from './works'
import compile from './compile'
import coupon from './coupon'
import paypal from './paypal'
import texture from './texture'
import category from './category'
import invoice from './invoice'
import envelope from './envelope'

var csrfProtection = csrf({ cookie: true })

const api = express.Router()

// oAuth
api.post('/api/auth/login/oauth/:hash', loginOauth)

// Auth Facebook
api.get('/api/auth/signup/facebook', authFacebook.signupOrLogin)
api.get('/api/auth/signup/facebook/redirect', authFacebook.callback, authFacebook.redirect)

// Auth Google
api.get('/api/auth/signup/google', authGoogle.signupOrLogin)
api.get('/api/auth/signup/google/redirect', authGoogle.callback, authGoogle.redirect)

// Auth Email
api.post('/api/auth/signup/email', csrfProtection, authEmail.signup)
api.post('/api/auth/login/email', csrfProtection, authEmail.login)

// Recuperar pass, envia email a user
api.post('/api/auth/forgot', csrfProtection, recovery.forgot)
// Cahbia pass
api.post('/api/auth/change-password', csrfProtection, recovery.changePassword)

// User
api.get('/api/user', user.self)
api.get('/api/users', user.all)
api.put('/api/user/:id', user.put)
api.put('/api/user/facebook/accessToken', user.updateFBAccessToken)
api.post('/api/auth/accept-terms', user.acceptTerms)
api.get('/api/usersByName', user.getByPartialName)

// Photos
api.post('/api/photo/:workId/:side', photos.upload)
api.get('/api/photos', photos.getAllSelf)

// Works
api.post('/api/work', works.post)
api.get('/api/work/:id', works.getById)
api.put('/api/work/:id', works.update)
api.get('/api/work/compile/:id', compile.process)
api.get('/api/works', works.getAllSelf)

// Coupons
api.post('/api/coupon', coupon.create)

// Payments Paypal
api.get('/api/payment/:workId/:items', paypal.pay)
api.get('/api/payment/success/:workId/:sub/:items', paypal.paymentSuccess)

// Textures
api.get('/api/textures', texture.getAll)
api.post('/api/texture', texture.post)
api.put('/api/texture/:id', texture.put)
api.post('/api/texture/:id/image', texture.upload)
api.delete('/api/texture/:id', texture.delete)

// Category
api.get('/api/allcategories', category.getAllAdmin)
api.get('/api/categories', category.getAll)
api.post('/api/category', category.post)
api.put('/api/category/:id', category.put)
api.delete('/api/category/:id', category.delete)
api.post('/api/category/:id/image', category.upload)

// Designs
api.get('/api/designs', design.getAll)
api.get('/api/design', design.getByCategory)
api.post('/api/design', design.post)
api.put('/api/design/:id', design.put)
api.delete('/api/design/:id', design.delete)
api.post('/api/design/:id/image', design.upload)

// Invoice
api.get('/api/invoices', invoice.getAllSelf)
api.get('/api/allinvoices', invoice.getAll)

// Letters Envelopes
api.get('/api/envelopes', envelope.getAll)
api.post('/api/envelope', envelope.post)
api.put('/api/envelope/:id', envelope.put)
api.post('/api/envelope/:id/image', envelope.uploadImage)
api.post('/api/envelope/:id/cover', envelope.uploadCover)
api.delete('/api/envelope/:id', envelope.delete)

// Error Handler
api.use(errorHandler)

export default api
