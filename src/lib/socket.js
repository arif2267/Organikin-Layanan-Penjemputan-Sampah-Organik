import { Server } from 'socket.io'

let io

export function initSocket(server) {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: '*', // Sesuaikan dengan domain frontend Anda di production
        methods: ['GET', 'POST'],
      },
    })

    io.on('connection', (socket) => {
      console.log('A client connected:', socket.id)

      socket.on('disconnect', () => {
        console.log('A client disconnected:', socket.id)
      })
    })
  }
  return io
}

export function getIO() {
  if (!io) {
    throw new Error('Socket.IO not initialized!')
  }
  return io
}