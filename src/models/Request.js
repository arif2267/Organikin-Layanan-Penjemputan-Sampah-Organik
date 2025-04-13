// src/models/Request.js
import mongoose from 'mongoose'

const RequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  email: { type: String, required: true }, // email user yang login
  status: { type: String, default: 'Menunggu Konfirmasi' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Request || mongoose.model('Request', RequestSchema)
