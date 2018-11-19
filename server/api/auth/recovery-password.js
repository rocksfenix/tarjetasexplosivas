import models from '../../models'
import { getResetPasswordToken, verifyResetPasswordToken } from '../../services/auth-service'
import { ValidationError } from '../../errors'
import getHash from '../../util/getHash'

const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_PRIVATE_KEY,
  domain: process.env.MAILGUN_PRIVATE_DOMAIN
})

export default {
  // Manda email al usuario
  forgot: async (req, res, next) => {
    if (!req.body.email) return next(ValidationError())

    const email = req.body.email.trim()
    const user = await models.User.findOne({ email })

    console.log('RECUPER ', email)

    if (!user) {
      // Enviar informacion a email informando que no se tiene cuenta
      const data = {
        from: 'TarjetasExplosivas Soporte <TarjetasExplosivas@tarjetasexplosivas.com>',
        to: email,
        subject: 'Recuperar Contraseña de tarjetasexplosivas.com',
        // text: 'Testing some Mailgun awesomeness!',
        html: `<h4>Hola</h4>
        <p>Tu email <strong>${email}</strong> No esta registrado en TarjetasExplosivas.com, puede ser que hayas utilizado
        algun otro email para tu registro.</p>

        <p>Pueder registrarte en <a href="https://tarjetasexplosivas.com/crear-cuenta">https://tarjetasexplosivas.com/crear-cuenta</a></p>
        <p>O contactar con nuestro equipo de soporte <a href="https://tarjetasexplosivas.com/soporte">https://tarjetasexplosivas.com/soporte</a></p>
        <br> El equipo de tarjetasexplosivas.com ♥
        `
      }
      mailgun.messages().send(data, function (e, body) {
        console.log(e)
        console.log(body)
      })
    } else {
      // Enviar link para resetear
      const hash = await getHash(20)
      const min = 5
      user.resetPasswordToken = hash
      user.resetPasswordExpires = Date.now() + (60000 * min) // 5 minutos   // 3600000 // 1 hour
      await user.save()

      // Generamos el JWT para enviar al usuario por email
      // Valido por una hora
      const jwt = getResetPasswordToken(hash)

      const link = `https://${req.headers.host}/recovery/${jwt}`

      const data = {
        from: 'TarjetasExplosivas Soporte <TarjetasExplosivas@tarjetasexplosivas.com>',
        to: email,
        subject: 'Recuperar Contraseña de tarjetasexplosivas.com',
        html: `<h4>Hola ${user.fullname}</h4>
        <p>Alguien solicito tu cambio de contraseña para <strong><a href="https://tarjetasexplosivas.com">tarjetasexplosivas.com</a></strong></p>
        <p>Puedes hacerlo en el siguiente enlace:</p>
        <br>
        <a href='${link}'>${link}</a>
        <br>
        <p>Aun no se ha hecho ningun cambio en tu cuenta, si tienes alguna duda, dejanos
        saber de inmediato. en <a href="https://www.tarjetasexplosivas.com/soporte/">https://www.tarjetasexplosivas.com/soporte</a></p>
        <br> El equipo de tarjetasexplosivas.com ♥
        `
      }
      mailgun.messages().send(data, function (e, body) {
        console.log(body)
      })
    }

    res.json({ error: null, success: true })
  },

  changePassword: async (req, res, next) => {
    if (!req.body.email || !req.body.password || !req.body.token) return next(ValidationError())

    const decode = verifyResetPasswordToken(req.body.token)

    if (decode === 'jwt expired') {
      return res.json({
        success: false,
        error: 'jwt expired'
      })
    }

    if (decode === 'invalid jwt') {
      return res.json({
        success: false,
        error: 'invalid jwt'
      })
    }

    // Validamos que haya usuario con ese resetoken
    const user = await models.User.findOne({ resetPasswordToken: decode.sub })

    if (!user) {
      return res.json({
        success: false,
        error: 'Error este link ya fue expirado, solicita otro en tarjetasexplosivas.com/forgot'
      })
    }

    if (user.email !== req.body.email) {
      return res.json({
        success: false,
        error: 'Error el email ingresado no es el que registraste con nosotros'
      })
    }

    user.password = req.body.password
    user.resetPasswordToken = ''
    await user.save()

    // Enviar email de confirmacion
    const data = {
      from: 'TarjetasExplosivas Soporte <no-response@tarjetasexplosivas.com>',
      to: user.email,
      subject: 'Cambio de contraseña de tarjetasexplosivas.com',
      html: `<h4>Hola ${user.fullname}</h4>
      <p>Tu contraseña en tarjetasexplosivas.com ha sido actualizada segun tus instrucciones</p>
      </p>Si tienes alguna duda, dejanos saber de inmediato en https://tarjetasexplosivas.com/soporte/.</p>
      <br> El equipo de tarjetasexplosivas.com ♥
      `
    }

    mailgun.messages().send(data, function (e, body) {
      console.log(body)
    })

    // Enviar respuesta de ok
    res.json({
      success: true,
      error: null
    })
  }
}
