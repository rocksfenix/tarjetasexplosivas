import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import shortid from 'shortid'
import bcrypt from 'bcryptjs'
import { isEmail } from 'validator'

const UserSchema = new mongoose.Schema({
  _id: { type: String, 'default': shortid.generate },
  emailConfirmed: { type: Boolean, default: false },
  position: { type: String, default: 'Member' },
  authProvider: { type: String, enum: [ 'facebook', 'google', 'email' ], default: 'email' },
  role: { type: String, enum: [ 'member', 'admin' ], default: 'member' },
  googleId: String,
  facebookId: String,
  lang: { type: String, enum: [ 'es', 'en' ], default: 'es' },
  avatar: String,
  hash: String,
  hashExpires: Date,
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: [ true, 'No puede estar es blanco' ],
    validate: [ isEmail, 'El email ingresado en invalido' ],
    maxlength: [100, 'El email debe de tener maximo 100 caracteres'],
    index: true
  },
  fullname: {
    type: String,
    required: [ true, 'No puede estar en blanco' ],
    minlength: [3, 'El nombre debe tener minimo 3 Letras'],
    maxlength: [100, 'El nombre debe de tener maximo 100 caracteres'],
    trim: true,
    index: true
  },
  password: { type: String, minlength: [8, 'La contraseña debe tener minimo 8 caracteres'] },
  // Fecha de aceptacion de politica de Privacidad
  acceptTerms: Date,
  acceptPolicyPrivacy: Date,

  facebook_access_token: String,

  // Credits
  credits: { type: Number, default: 0 },

  // Recovery password
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  // Se usa para banear al usuario en caso
  // de detectar abuso
  status: { type: String, enum: [ 'hold', 'active' ], default: 'active' },

  // Cards
  cards: { type: Number, default: 0 },

  purchaseCredits: { type: Number, default: 0 }

}, { timestamps: true })

UserSchema.plugin(uniqueValidator, { message: 'Ya esta esta en uso' })

UserSchema.pre('save', function (next) {
  let user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next()

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, res) {
      if (err) return reject(err)
      resolve(res)
    })
  })
}

UserSchema.methods.toJSON = function () {
  return {
    fullname: this.fullname,
    role: this.role,
    email: this.email,
    acceptTerms: this.acceptTerms,
    acceptPolicyPrivacy: this.acceptPolicyPrivacy,
    _id: this._id,
    authProvider: this.authProvider,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    facebook_access_token: this.facebook_access_token,
    credits: this.credits,
    avatar: this.avatar,
    status: this.status,
    cards: this.cards,
    purchaseCredits: this.purchaseCredits
  }
}

export default mongoose.model('User', UserSchema)
