import { io } from "socket.io-client";


// const emitEvent = (event, props) => {
//     return socket.emit(event, props)
// }

// const onEvent = (event, lambda) => {
//     return socket.on(event, lambda)
// }

export const connectWS = () => {
  return io.connect(import.meta.env.VITE_WEB_SOCKET_API_URI);
}

export const disconnectWS = (socket) => {
  return socket.close()
}

export const joinRoom = (socket, userUuid, roomName, roomDescription, recipeId, meetingLink, host) => {
  socket.emit('room:join', {userUuid, roomName, roomDescription, recipeId, meetingLink, host})
}

export const onJoinedRoom = (socket, listener) => {
  socket.on("room:joined", listener)
  socket.on("room:left", listener)

  return () => {
    socket.off("room:left", listener)
    socket.off('room:joined', listener)
  }
}

export const onSetRooms = (socket, listener) => {
  socket.on("rooms", listener)
  return () => {
    socket.off("rooms", listener)
  }
}

// export const onRooms = () => {
//   let rooms = []
//   socket.on("room-joined", (args) => {
//     rooms = args.rooms
//   })
//   socket.on("rooms", (args) => {
//     rooms = args.rooms
//   })
//   return rooms
// }
//
// export const login = (username, email, password) => {
//   socket.emit('login', {
//     username,
//     email,
//     password
//   })
// }
