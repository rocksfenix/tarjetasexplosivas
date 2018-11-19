import passport from 'passport'

// Cuando el usuaro accede al link de auth de facebook
const signupOrLogin = passport.authenticate('facebook', { scope: 'email' })

// Cuando facebook da respuesta despues de que usuario acepta
const callback = passport.authenticate('facebook', { session: false })

// Cuando se completo el callback se redirecciona
// a nuestro sitio, desde alli se llama a un
// segunda solicitud que regresara los jwt
// Nota: El req.user es el hash aleatorio no el usuario
const redirect = async (req, res, next) => {
  res.redirect(`/oauth?h=${req.user}`)
}

export default {
  signupOrLogin,
  callback,
  redirect
}
