import models from '../../models'
import paypal from 'paypal-rest-sdk'
import { ForbiddenError, NotFound } from '../../errors'

const HOST = process.env.HOST || `https://localhost:3000`
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
const PAYPAL_MODE = process.env.PAYPAL_MODE

paypal.configure({
  'mode': PAYPAL_MODE,
  'client_id': PAYPAL_CLIENT_ID,
  'client_secret': PAYPAL_CLIENT_SECRET
})

export default {
  // Ruta de solicitud de pago cuando el usuario preciona
  // pagar con paypal
  pay: async (req, res, next) => {
    try {
      if (!req.decode) return next(ForbiddenError())

      // Obtenemos el work para revisar si es de ese usuario
      const work = await models.Work.findById(req.params.workId)
      if (!work) return next(NotFound())
      if (work.author !== req.decode.sub) return next(ForbiddenError())

      const items = req.params.items

      let PAYMENT_JSON = {
        'intent': 'sale',
        'payer': {
          'payment_method': 'paypal'
        },
        'redirect_urls': {
          'return_url': `${HOST}/api/payment/success/${work._id}/${req.decode.sub}/${items}`,
          'cancel_url': `${HOST}/cube-app/${req.params.workId}?payment=cancel`
        },
        'transactions': []
      }

      if (items === '1') {
        PAYMENT_JSON['transactions'] = [{
          'item_list': {
            'items': [{
              'name': '1 Diseño Imprimible de Tarjeta Explosiva',
              'sku': '001',
              'price': '4.99',
              'currency': 'USD',
              'quantity': 1
            }]
          },
          'amount': {
            'currency': 'USD',
            'total': '4.99'
          },
          'description': '1 Diseño / planos imprimibles personalizados para Tarjeta Explosiva'
        }]
      }

      if (items === '2') {
        PAYMENT_JSON['transactions'] = [{
          'item_list': {
            'items': [{
              'name': '2 Diseños Imprimibles de Tarjetas Explosivas',
              'sku': '002',
              'price': '7.99',
              'currency': 'USD',
              'quantity': 1
            }]
          },
          'amount': {
            'currency': 'USD',
            'total': '7.99'
          },
          'description': '2 Diseños / planos imprimibles personalizados para Tarjetas Explosivas'
        }]
      }

      if (items === '4') {
        PAYMENT_JSON['transactions'] = [{
          'item_list': {
            'items': [{
              'name': '4 Diseños Imprimibles de Tarjetas Explosivas',
              'sku': '004',
              'price': '9.99',
              'currency': 'USD',
              'quantity': 1
            }]
          },
          'amount': {
            'currency': 'USD',
            'total': '9.99'
          },
          'description': '4 Diseños / planos imprimibles personalizados para Tarjetas Explosivas'
        }]
      }

      paypal.payment.create(PAYMENT_JSON, (error, payment) => {
        if (error) {
          console.log(error)
          res.redirect(`${HOST}/cube-app/${req.params.workId}?payment=error-unknow1`)
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              res.redirect(payment.links[i].href)
            }
          }
        }
      })
    } catch (error) {
      res.redirect(`${HOST}/cube-app/${req.params.workId}?payment=error-unknow2`)
    }
  },

  // Ruta de confirmacion de pago
  paymentSuccess: async (req, res) => {
    try {
      const payerId = req.query.PayerID
      const paymentId = req.query.paymentId

      const items = req.params.items

      let executePaymentJson = {}

      if (items === '1') {
        executePaymentJson = {
          'payer_id': payerId,
          'transactions': [{
            'amount': {
              'currency': 'USD',
              'total': '4.99'
            }
          }]
        }
      }

      if (items === '2') {
        executePaymentJson = {
          'payer_id': payerId,
          'transactions': [{
            'amount': {
              'currency': 'USD',
              'total': '7.99'
            }
          }]
        }
      }

      if (items === '4') {
        executePaymentJson = {
          'payer_id': payerId,
          'transactions': [{
            'amount': {
              'currency': 'USD',
              'total': '9.99'
            }
          }]
        }
      }

      paypal.payment.execute(paymentId, executePaymentJson, async (error, payment) => {
        if (error) {
          console.log(error.response)
          res.redirect(`${HOST}/cube-app/${req.params.workId}?payment=error-unknow3`)
        } else {
          const response = JSON.stringify(payment)
          const credits = Number(items)
          const author = req.params.sub

          console.log(payment.transactions[0])

          if (payment.state === 'approved') {
            const [ work, user ] = await Promise.all([
              models.Work.findById(req.params.workId),
              models.User.findById(author),
              models.Invoice.create({
                paypalPayment: payment.id,
                amount: payment.transactions[0].amount.total,
                currency: payment.transactions[0].amount.currency,
                author,
                credits
              })
            ])

            // Buscar usuario y agregar credito
            user.credits = user.credits ? user.credits + credits : credits
            user.purchaseCredits = user.purchaseCredits ? user.purchaseCredits + credits : credits

            await user.save()
            work.paid = true
            work.paymentId = response.id
            await work.save()
            res.redirect(`${HOST}/cube-app/${req.params.workId}?payment=success`)
          } else {
            res.redirect(`${HOST}/cube-app/${req.params.workId}?payment=no-completed`)
          }
        }
      })
    } catch (error) {
      res.redirect(`${HOST}/cube-app/${req.params.workId}?payment=error-unknow4`)
    }
  }
}
