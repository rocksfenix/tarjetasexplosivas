import models from '../../models'
import { ForbiddenError, NotFound } from '../../errors'
import CC from 'coupon-code'

export default {
  getAll: async (req, res, next) => {
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

    const total = await models.Photo
      .find(query)
      .estimatedDocumentCount()

    const coupons = await models.Coupon.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .exec()

    res.json({
      coupons: coupons.map(p => p.toJSON()),
      total,
      hasMore: skip + coupons.length < total
    })
  },

  create: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    try {
      const coupon = await models.Coupon.create({
        code: CC.generate()
      })

      res.json({
        coupon: coupon.toJSON()
      })
    } catch (error) {
      next(error)
    }
  },

  put: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const coupon = await models.Coupon.findById(req.params.id)

    if (!coupon) return next(NotFound());
    [
      'totalUses',
      'credits',
      'expired',
      'expiration'
    ].forEach(key => {
      if (typeof req.body.coupon[key] !== 'undefined') {
        coupon[key] = req.body.coupon[key]
      }
    })

    await coupon.save()

    res.json({ coupon: coupon.toJSON() })
  },

  delete: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())
    if (req.decode.role !== 'admin') return next(ForbiddenError())

    const coupon = await models.Coupon.findById(req.params.id)

    if (!coupon) return next(NotFound())

    await coupon.remove()

    res.json({ coupon: coupon.toJSON() })
  },

  apply: async (req, res, next) => {
    if (!req.decode) return next(ForbiddenError())

    // Apicamos el coupon al usuario con los creditos
    try {
      // Buscamos el coupon por su codigo
      // TODO : revisar que no este vencido
      const coupon = await models.Coupon.findOne({ code: req.params.code })
      if (!coupon) {
        return res.json({
          error: 'Codigo Invalido'
        })
      }

      if (coupon.uses >= coupon.totalUses) {
        return res.json({ error: 'Este cupon ha expirado' })
      }

      // Buscamos los Invocies del usuario con eso aseguramos
      // que un cupon solo pueda ser aplicado 1 vez por usuario
      const invoice = await models.Invoice.findOne({
        author: req.decode.sub,
        coupon: req.params.code
      })

      if (!invoice) {
        const newInvoice = await models.Invoice.create({
          author: req.decode.sub,
          paypalPayment: 'N/A',
          amount: '0',
          currency: 'USD',
          credits: coupon.credits,
          coupon: req.params.code
        })

        // Actualizamos el cupon
        coupon.uses = coupon.uses + 1

        const user = await models.User.findById(req.decode.sub)

        user.credits = user.credits + coupon.credits

        coupon.save()
        user.save()

        res.json({
          invoice: newInvoice,
          user: user.toJSON(),
          error: null
        })
      } else {
        res.json({
          error: 'Ya has utilizado este cupon con anterioridad'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}
