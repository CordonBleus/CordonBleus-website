import { roomLeft, roomJoined, raiseError } from "./socket-emit.js";
import { AppDataSource } from "../../data-source.js";
import { Recipe } from "../../entity/Recipe.js";

const socketReceive = (io, socket, users, roomExist, getRoomUserList, rooms) => {
  const joinRoom = (user, roomName, roomDescription, recipe, meetingLink) => {
    try {
    } catch (error) {
      console.log(error)
    }
    user.room = roomName
    if (!roomExist(roomName)){
      rooms.push({
        id: `${Math.floor(Math.random() * 10**8)}`,
        title: roomName,
        recipe: recipe,
        description: roomDescription,
        meetingUrl: meetingLink,
      })
    }
    users.set(socket.id, user)
    console.log(rooms)
    socket.join(roomName);
  }

  const leaveRoom = (user) => {
    // users.forEach(user => {
    //   if (currentUser.room !== user.room) {
    //
    //   }
    // })
    socket.join(socket.id)
    user.room = socket.id
    users.set(socket.id, user)
  }

  socket.on("room:join", async ({userUuid, roomName, roomDescription, recipeId, meetingLink}) => {
    const user = users.get(userUuid)
    const roomUserList = getRoomUserList(roomName)
    const recipeRepo = AppDataSource.getRepository(Recipe);
    const recipe = await recipeRepo.findOneBy({id: recipeId})
    if (!recipe) {
      return raiseError(io, roomName, "This recipe does not exist !")
    }
    joinRoom(user, roomName, roomDescription, recipe, meetingLink)
    roomJoined(io, user, roomName, roomUserList)
  });

  socket.on("room:leave", ({userUuid, roomName}) => {
    const user = users.get(userUuid)
    const roomUserList = getRoomUserList(roomName)
    leaveRoom(user)
    roomLeft(io, user, roomName, roomUserList)
  });
}

export default socketReceive
