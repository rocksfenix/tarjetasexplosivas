import models from '../../models'
import { getTokens } from '../../services/auth-service'

// Este es el punto donde el usuario sera buscado
// por el hash
export default async (req, res, next) => {
  if (!req.params.hash || req.params.hash === '' || req.params.hash === 'null') {
    return res.json({ error: 'Expired try again' })
  }

  const user = await models.User.findOne({
    hash: req.params.hash,
    hashExpires: { $gt: Date.now() }
  })

  if (!user) {
    return res.json({ error: 'Try again' })
  }

  // console.log(`/oauth?h=${req.params.hash}`)
  // console.log('REVISANDO LOGIN CON OAUTH HASH', user.hashExpires, Date.now(), user.hashExpires > Date.now())

  user.hash = null
  await user.save()

  const { token, refreshToken } = getTokens(user)

  res.json({
    token,
    refreshToken,
    user: user.toJSON(),
    error: null
  })
}
