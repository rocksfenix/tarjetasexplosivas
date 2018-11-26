import models from '../../models'
import { NotFound, ForbiddenError } from '../../errors'
import { getTokens } from '../../services/auth-service'
import JSON2CSV from 'json-2-csv'
import deleteS3Directory from '../deleteS3Directory'
const BUCKET = process.env.S3_BUCKET

export default {
  self: async (req, res, next) => {
    try {
      if (!req.decode) return res.json({ error: 'No Autorizado' })
      const id = req.decode.sub

      const user = await models.User.findById(id)

      if (!user) return next(NotFound())

      res.json({
        user: user.toJSON(),
        error: null
      })
    } catch (error) {
      next(error)
    }
  },

  getSelfDataCSV: async (req, res, next) => {
    try {
      if (!req.decode) return res.json({ error: 'No Autorizado' })
      const id = req.decode.sub

      const user = await models.User.findById(id)

      if (!user) return next(NotFound())

      const data = [{
        'nombre': user.fullname,
        'email': user.email,
        'creditos disponibles': user.credits,
        'metodo de autentificacion': user.authProvider,
        'Role en plataforma': user.role,
        'googleId': user.googleId,
        'facebookId': user.facebookId,
        'lenguaje': user.lang,
        'avatar': user.avatar,
        'status': user.status,
        'Numero de Diseños': user.cards || 0,
        'Numero de creditos comprados': user.purchaseCredits || 0
      }]

      const csv = await JSON2CSV.json2csvPromisified(data)

      res.set('Content-Type', 'application/octet-stream')
      res.send(csv)
    } catch (error) {
      next(error)
    }
  },

  acceptTerms: async (req, res, next) => {
    try {
      if (!req.decode) return res.json({ error: 'No Autorizado' })
      const id = req.decode.sub

      const user = await models.User.findById(id)
      user.acceptTerms = Date.now()
      user.acceptPolicyPrivacy = Date.now()
      await user.save()

      const { token, refreshToken } = getTokens(user)

      res.json({
        token,
        refreshToken,
        user: user.toJSON(),
        error: null
      })
    } catch (error) {
      next(error)
    }
  },

  updateFBAccessToken: async (req, res, next) => {
    try {
      if (!req.decode) return res.json({ error: 'No Autorizado' })
      const id = req.decode.sub

      const user = await models.User.findById(id)

      if (!user) return next(NotFound())

      user.facebook_access_token = req.body.facebook_access_token
      await user.save()

      res.json({
        user: user.toJSON(),
        error: null
      })
    } catch (error) {
      next(error)
    }
  },

  put: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    if (req.decode.sub !== req.params.id && req.decode.role !== 'admin') {
      return next(ForbiddenError())
    }

    const user = await models.User.findById(req.params.id)

    if (!user) return next(NotFound())

    let seteables = [
      'fullname',
      'email'
    ]

    if (req.decode.role === 'admin') {
      seteables.push('status')
      seteables.push('role')
    }

    seteables.forEach(key => {
      if (typeof req.body.user[key] !== 'undefined') {
        user[key] = req.body.user[key]
      }
    })

    await user.save()

    res.json({ user: user.toJSON() })
  },

  // Derecho al olvido
  // Se elimina cuenta y archivos que genero en S3
  deleteAndForgotten: async (req, res, next) => {
    try {
      if (!req.decode) return next(ForbiddenError())

      const user = await models.User.findById(req.decode.sub)

      if (!user) return next(NotFound())

      // console.log(req.body.password)
      // // Revisar Password recibida
      // const isValid = await user.checkPassword(req.body.password)
      // // Pass invalida
      // if (!isValid) {
      //   return res.json({ error: 'Password es invalida' })
      // }
      // Si la password es correcta se elimina

      // archivos de usuario en S3 y el propio usuario
      const USERID = req.decode.sub
      deleteS3Directory(BUCKET, `photos/${USERID}`)
      deleteS3Directory(BUCKET, `works/${USERID}`)

      // Eliminar photos de DB y works
      const [ photos, works ] = await Promise.all([
        models.Photo.find({ author: USERID }),
        models.Work.find({ author: USERID })
      ])

      if (photos.length) {
        photos.forEach(async photo => {
          await models.Photo.findByIdAndRemove(photo._id)
        })
      }

      if (works.length) {
        works.forEach(async work => {
          await models.Work.findByIdAndRemove(work._id)
        })
      }

      // Eliminamos el user en DB
      user.remove((error) => {
        if (error) return res.json({ error: 'Ha ocurrido un problema, intenta nuevamente' })
        res.json({
          error: null,
          message: 'Cuenta Eliminada y Olvidada Exitosamente'
        })
      })
    } catch (error) {
      next(error)
    }
  },

  all: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    let limit = 15
    let skip = 0
    let query = {}

    if (typeof req.query.skip !== 'undefined') {
      skip = Number(req.query.skip)
    }

    if (typeof req.query.limit !== 'undefined') {
      limit = Number(req.query.limit)
    }

    const total = await models.User
      .find(query)
      .countDocuments()

    const users = await models.User.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec()

    res.json({
      users: users.map(p => p.toJSON()),
      total,
      hasMore: skip + users.length < total
    })
  },

  getByPartialName: async (req, res, next) => {
    try {
      const limit = 50
      let skip = 0
      const search = new RegExp(req.query.search, 'i')

      const query = {
        fullname: { $regex: search }
      }

      const total = await models.User
        .find(query)
        .countDocuments()

      const users = await models.User.find(query)
        .limit(Number(limit))
        .skip(Number(skip))
        .exec()

      res.json({
        users: users.map(p => p.toJSON()),
        total,
        hasMore: skip + users.length < total
      })
    } catch (error) {
      next(error)
    }
  }
}
