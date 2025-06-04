// models/Request.js
const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  description: String,
  status: {
    type: String,
    enum: ['Menunggu Konfirmasi', 'Diproses', 'Selesai'],
    default: 'Menunggu Konfirmasi'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.models.Request || mongoose.model('Request', requestSchema)
