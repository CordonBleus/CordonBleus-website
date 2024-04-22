import {io} from "socket.io-client";


// const emitEvent = (event, props) => {
//     return socket.emit(event, props)
// }

// const onEvent = (event, lambda) => {
//     return socket.on(event, lambda)
// }

export const connectWS = () => {
  return io.connect('http://127.0.0.1:3000/login');
}

export const disconnectWS = (socket) => {
  return socket.close()
}

export const joinRoom = (socket, roomName, meetingLink) => {
  socket.emit('join-room', {roomName, meetingLink})
}

export const onJoinedRoom = (socket, listener) => {
  socket.on("room-joined", listener)
  socket.on("room-left", listener)

  return () => {
    socket.off("room-left", listener)
    socket.off('room-joined', listener)
  }
}

export const onSetRooms = (socket, listener) => {
  socket.on("rooms", listener)
  return () => {
    socket.off("rooms", listener)
  }
}

export const onRooms = () => {
  let rooms = []
  socket.on("room-joined", (args) => {
    rooms = args.rooms
  })
  socket.on("rooms", (args) => {
    rooms = args.rooms
  })
  return rooms
}

export const login = (username, email, password) => {
  socket.emit('login', {
    username,
    email,
    password
  })
}
