import passport from 'passport'

// Cuando el usuaro accede al link de auth de google
const signupOrLogin = passport.authenticate('google', {
  scope: [ 'profile', 'email' ]
})

// Cuando google da respuesta despues de que usuario acepta
const callback = passport.authenticate('google', { session: false })

// Cuando se completo el callback se redirecciona
// a nuestro sitio, desde alli se llama a una
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
