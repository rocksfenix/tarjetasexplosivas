import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const getTokens = (user) => ({
  token: getToken(user),
  refreshToken: getRefreshToken(user)
})

export const getToken = ({ _id, role, acceptTerms, acceptPolicyPrivacy }) => {
  const payload = {
    sub: _id,
    role,
    acpp: (acceptTerms && acceptPolicyPrivacy) ? 'true' : 'false'
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' })
}

export const getRefreshToken = ({ _id }) => {
  const payload = { sub: _id }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// Aqui no exponemos el id del usuario en su lugar enviamos un hash
export const getResetPasswordToken = (sub) => {
  return jwt.sign({
    sub
  }, JWT_SECRET, { expiresIn: '1h' })
}

export const verifyResetPasswordToken = (token) => {
  try {
    const decode = jwt.verify(token, JWT_SECRET)
    return decode
  } catch (error) {
    if (error.message === 'jwt expired') {
      return 'jwt expired'
    }
    return 'invalid jwt'
  }
}
