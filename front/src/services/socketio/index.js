import {io} from "socket.io-client";

export const connectWS = () => {
  return io.connect('http://127.0.0.1:3000/');
}

export const disconnectWS = (socket) => {
  return socket.close()
}

export const joinRoom = (socket, userUuid, roomName, meetingLink) => {
  socket.emit('join-room', {userUuid, roomName, meetingLink})
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
