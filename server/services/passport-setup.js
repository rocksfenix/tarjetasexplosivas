import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import models from '../models'
import getHash from '../util/getHash'

const HOST = process.env.HOST || `https://localhost:3000`

passport.use(
  new GoogleStrategy({
    clientID: process.env.OAUTH_GOOGLE_ID,
    clientSecret: process.env.OAUTH_GOOGLE_SECRET,
    callbackURL: `${HOST}/api/auth/signup/google/redirect`
  }, async (accessToken, refreshToken, profile, done) => {
    // Revisamos si ya se registro posiblemente con otro authProvider
    // Para eso usamos el email
    let user = await models.User.findOne({ email: profile.emails[0].value })
    const hash = await getHash()
    if (!user) {
      // Si no existe lo creo
      user = await models.User.create({
        fullname: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        avatar: profile.photos[0].value,
        lang: profile._json.language,
        authProvider: 'google',
        hash,
        hashExpires: Date.now() + (60000 * 1) // 1 minuto
      })
      done(null, hash)
    } else if (user.authProvider !== 'google') {
      // Si anteriormente se authentifico con ostro provider
      // Actualizamops con los datos nuevos del provider
      user.googleId = profile.id
      user.avatar = profile.photos[0].value
      user.lang = profile._json.language
      user.authProvider = 'google'
      user.hash = hash
      user.hashExpires = Date.now() + (60000 * 1) // 1 minuto
      await user.save()
      done(null, hash)
    } else if (user) {
      user.hash = hash
      user.hashExpires = Date.now() + (60000 * 1) // 1 minuto
      await user.save()
      done(null, hash)
    }
  })
)

passport.use(
  new FacebookStrategy({
    clientID: process.env.OAUTH_FACEBOOK_ID,
    clientSecret: process.env.OAUTH_FACEBOOK_SECRET,
    callbackURL: `${HOST}/api/auth/signup/facebook/redirect`,
    profileFields: ['id', 'emails', 'displayName']
  }, async (accessToken, refreshToken, profile, done) => {
    // done(null, profile)
    let user = await models.User.findOne({ email: profile.emails[0].value })
    const hash = await getHash()

    if (!user) {
      // Si no existe lo creo
      user = await models.User.create({
        facebookId: profile.id,
        fullname: profile.displayName,
        email: profile.emails[0].value,
        authProvider: 'facebook',
        hash,
        hashExpires: Date.now() + (60000 * 1), // 1 minuto
        avatar: `https://graph.facebook.com/${profile.id}/picture?type=large`
      })
      done(null, hash)
    } else if (user.authProvider !== 'facebook') {
      // Si anteriormente se authentifico con ostro provider
      // Actualizamos con los datos nuevos del provider
      user.facebookId = profile.id
      user.authProvider = 'facebook'
      user.avatar = `https://graph.facebook.com/${profile.id}/picture?type=large`
      user.hash = hash
      user.hashExpires = Date.now() + (60000 * 1) // 1 minuto
      await user.save()
      done(null, hash)
    } else if (user) {
      user.hash = hash
      user.hashExpires = Date.now() + (60000 * 1) // 1 minuto
      await user.save()
      done(null, hash)
    }
  })
)
