// import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import models from '../models'
import Constants from '../config/default'
import { getToken } from '../services/auth-service'
const JWT_SECRET = process.env.JWT_SECRET
const { JWT_KEY, JWT_RFS_KEY, JWT_REHYDRATE_KEY } = Constants

// EL filtro de auth pasa por 3 etapas
// Si el token es valido, si expiro y fue remplazado
// Si es valido identifica el role
// TODO Hacer el refreshtoken y que este en sinctronizacion y que funciuone
export default async (req, res, next) => {
  const jwtToken = req.headers[JWT_KEY] || req.cookies[JWT_KEY]
  const jwtRfs = req.headers[JWT_RFS_KEY] || req.cookies[JWT_RFS_KEY]

  if (!jwtRfs || !jwtToken) return next()

  if (jwtToken) {
    const decoded = jwt.decode(jwtToken)
    // Si no ha aceptado los teminos
    try {
      if (decoded.acpp !== 'true') {
        res.set('x-no-acpp', 'false')
      }
    } catch (error) {

    }
    try {
      const user = jwt.verify(jwtToken, JWT_SECRET)
      req.decode = user
    } catch (e) {
      // TOKEN EXPIRED
      if (e.message === 'jwt expired') {
        // Obtenemos el dueño del token
        const e = await jwt.decode(jwtToken)
        const user = await models.User.findById(e.sub)
        // Si algun haker ingreso un sub con un id invalido
        // De algun usuario que no exista
        if (!user) {
          req.decode = null
          return next()
        }

        // Si no envia RefreshToken
        // Creamos un nuevo token pero validamos que el Refresh Token este vigente
        try {
          jwt.verify(jwtRfs, JWT_SECRET)
          // Token valido, creamos nuevo JWT
          // Con el estado de la ultima informacion  de la DB
          const newToken = getToken(user)
          // console.log('NUEVO TOKEN ', newToken)
          // res.set('Access-Control-Expose-Headers', JWT_KEY)

          res.set(JWT_REHYDRATE_KEY, newToken)
          // Pasamos la info decodificada al user
          req.decode = await jwt.decode(newToken)
        } catch (error) {
          // Enviar encavesado de session expirada para hacer
          // un logout en automatico en el cliente
          // redireccionar a /?sessionExired=true
          if (error.message === 'jwt expired' || error.message === 'invalid token') {
            console.log('SESION EXPIRADA')
            // req.decode = null
            res.set('x-tn-expired-session', 'true')
            // next()
          }
        }
      }
    }
  }
  next()
}
