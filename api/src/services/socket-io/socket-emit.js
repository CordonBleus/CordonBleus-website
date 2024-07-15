export const roomList = (io, roomName, user) => {
  io.to(roomName).emit('rooms', {joiningUser: user.username})
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