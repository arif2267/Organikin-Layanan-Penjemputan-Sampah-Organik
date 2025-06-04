export default function handler(req, res) {
    if (res.socket.server.io) {
      console.log('Socket.IO already running')
    } else {
      const { initSocket } = require('@/lib/socket')
      initSocket(res.socket.server)
      res.socket.server.io = true
    }
    res.end()
  }