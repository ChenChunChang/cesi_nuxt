const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = new Schema({
  name: String,
  token: String,
  expires_in: Number,
  meta: {
    created: {
      type: Date,
      default: Date.now()
    },
    updated: {
      type: Date,
      default: Date.now()
    }
  }
})

tokenSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

tokenSchema.statics = {
  async getAccessToken() {
    const token = await this.findOne({
      name: 'access_token'
    }).exec()
    return token
  },

  async saveAccessToken(data) {
    let token = await this.findOne({
      name: 'access_token'
    }).exec()
    if (token) {
      token.access_token = data.access_token
      token.expires_in = data.expires_in
    } else {
      token = new Token({
        name: 'access_token',
        token: 'data.access_token',
        expires_in: 'data.expires_in'
      })
    }
    await token.save()

    return data
  }
}

const Token = mongoose.model('Token', tokenSchema)
