export const roomList = (io, rooms) => {
  io.emit('rooms', {rooms: rooms})
}

export const roomJoined = (io, user, roomName, roomUserList) => {
  io.to(roomName).emit('room:joined', {joiningUser: user.username, roomUserList, userCount: roomUserList.length});
}
export const roomLeft = (io, user, roomName, roomUserList) => {
  io.to(roomName).emit('room:left', {user, roomUserList, userCount: roomUserList.length});
}
export const raiseError = (io, roomName, errorMessage) => {
  io.to(roomName).emit('error', {error: errorMessage});
}