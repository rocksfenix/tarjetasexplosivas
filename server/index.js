import next from 'next'
import express from 'express'
import ip from 'ip'
import mongoose from 'mongoose'
import 'dotenv/config'
import api from './api'
import passport from 'passport'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import security from './midlewares/security'
import csrf from 'csurf'
import fileUpload from 'express-fileupload'
import compression from 'compression'
import './services/passport-setup'
import auth from './midlewares/auth'
import path from 'path'
import fs from 'fs'
import https from 'https'
import favicon from 'serve-favicon'

mongoose.Promise = global.Promise

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const csrfProtection = csrf({ cookie: true })
console.log('test')
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    const app = next({
      dev
    })

    const handle = app.getRequestHandler()

    app.prepare()
      .then(() => {
        const server = express()

        server.use(passport.initialize())
        server.use(bodyParser.urlencoded({ extended: false }))
        server.use(bodyParser.json())
        server.use(cookieParser())
        server.use(compression())
        // Security middlewares.
        server.use(...security)
        // Upload Images
        server.use(fileUpload({
          limits: { fileSize: 20 * 1024 * 1024 } // 5 MB
        }))

        server.use(favicon(path.join(__dirname, '../', 'static', 'brand', 'favicon.ico')))

        // Check jwt headers
        server.use(auth)
        server.use(api)

        server.get('/', csrfProtection, (req, res) => {
          app.render(req, res, '/home')
        })

        server.get('/login', csrfProtection, (req, res) => {
          app.render(req, res, '/login')
        })

        server.get('/crear-cuenta', csrfProtection, (req, res) => {
          app.render(req, res, '/crear-cuenta')
        })

        server.get('/boxes-editor/:id', csrfProtection, (req, res) => {
          app.render(req, res, '/boxes-editor')
        })

        server.get('/cube-app/:id/:modal?/:source?/:subId?', csrfProtection, (req, res) => {
          app.render(req, res, '/cube-app', {
            query: req.query
          })
        })

        server.get('/forgot', csrfProtection, (req, res) => {
          app.render(req, res, '/forgot')
        })

        server.get('/recovery/:token', csrfProtection, (req, res) => {
          app.render(req, res, '/recovery')
        })

        server.get('*', (req, res) => handle(req, res))

        if (dev) {
          const certOptions = {
            key: fs.readFileSync(path.resolve('cert/server.key')),
            cert: fs.readFileSync(path.resolve('cert/server.crt'))
          }
          https.createServer(certOptions, server).listen(PORT, () => {
            console.log(`
              ⚡
              DEV MODE: ${process.env.NODE_ENV}
              GO: https://${ip.address()}:${PORT}
              GO: https://localhost:${PORT}
            `)
          })
        } else {
          server.listen(PORT, () => {
            console.log(`
              ⚡
              DEV MODE: ${process.env.NODE_ENV}
              GO: https://${ip.address()}:${PORT}
              GO: https://localhost:${PORT}
            `)
          })
        }
      })
  })
  .catch((error) => {
    console.log('ERROR MONGO-DB::', error)
  })
