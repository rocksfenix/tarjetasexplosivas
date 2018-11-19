import models from '../../models'
import { getTokens } from '../../services/auth-service'

const signup = async (req, res, next) => {
  try {
    const { email, password, fullname } = req.body
    if (!fullname) return res.json({ error: 'El Nombre es requerido' })
    if (!email) return res.json({ error: 'Email es requerido' })
    if (!password) return res.json({ error: 'Password es requerida' })

    const userExist = await models.User.findOne({ email })

    // Solo en caso de que exista y que se haya registrado con email
    if (userExist && userExist.authProvider === 'email') {
      return res.json({
        error: 'Este email ya estaba registrado con nosotros'
      })
    }

    // Si se registro anteriormente con algun otro provedor
    // y ahora quiere iniciar con email y password
    if (userExist && userExist.authProvider !== 'email') {
      return res.json({
        error: `Anteriormente te regitraste con ${userExist.authProvider}, puedes hacerlo desde alli o te podemos enviar un email para que puedas crear una contraseña`
      })
    }

    const user = await models.User.create({ fullname, email, password, provider: 'email' })

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
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email) return res.json({ error: 'Email es requerido' })
    if (!password) return res.json({ error: 'Password es requerida' })

    const user = await models.User.findOne({ email })

    // No existe usuario
    if (!user) {
      return res.json({ error: 'No tenemos un registro con este email' })
    }

    const isValid = await user.checkPassword(password)

    // Pass invalida
    if (!isValid) {
      return res.json({ error: 'El Email o la password son invalidas' })
    }

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
}

export default {
  login,
  signup
}
