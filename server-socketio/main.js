const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const httpServer = createServer(app);
const hostName = "127.0.0.1";
const port = 3000;

const bodyParser = require('body-parser');

app.use(cors())
app.use(express.json())

// Local DB

const users = new Map;

const rooms = [];

// Endpoints

app.post('/login', (req, res) => {
    const data = req.body;
    let userUuid = undefined;
    if (data.userUuid != null) {
        userUuid = data.userUuid
        let user = users.get(userUuid)
        if (user != null) {
            return res.status(201).json({
                "userUuid": userUuid
            });
        }
        return res.status(404).json({
            "message": "User not found"
        });
    } else {
        if (data.email && data.username && data.password && data.socketId){
            userUuid = uuidv4();
            users.set(userUuid,
              {
                  email: data.email,
                  username: data.username,
                  password: data.password,
                  room: data.socketId
              }
            )
            res.status(201).json({
                "userUuid": userUuid
            });
        } else {
            return res.status(400).json({
                "message": "Incorrect data"
            });
        }
    }
})

app.get('/rooms', (req, res) => {
    return res.status(200).json({
        "rooms": rooms
    })
})


const io = new Server(httpServer, {
    cors: {
        origin: "*",
        credentials: true
    }
});



function getRoomUserList(room) {
    roomUserList = []
    users.forEach(user => {
        if (room === user.room) {
            roomUserList.push(user.username)
        }
    })
    return roomUserList
}

function roomExist(givenRoomName) {
    const isInRooms = rooms.find(room => room.name === givenRoomName)
    return isInRooms !== undefined
 }

function getRoomIndex(givenRoomName) {
    let returnedIndex = -1
    rooms.forEach((room, index) => {
        if (room.name === givenRoomName) return returnedIndex = index
    })
    return returnedIndex
}

io.on('connection', (socket) => {

    socket.on('join-room', ({ userUuid, roomName, meetingLink }) => {
        const currentUser = users.get(userUuid)
        let roomUserList = getRoomUserList(roomName)
        try {
            io.to(currentUser.room).emit('room-left', {roomUserList, userCount: socket.rooms.size});
        } catch (error) {
            // console.log(error)
        }
        currentUser.room = roomName
        if (!roomExist(roomName)){
            rooms.push({
                name: roomName,
                roomInfo: {
                    recipe: [], meetingLink: meetingLink,
                }
            })
        }
        users.set(socket.id, currentUser)
        roomUserList = getRoomUserList(roomName)
        io.to(roomName).emit('user-joined', {joiningUser: currentUser.username})
        socket.join(roomName);
        io.to(roomName).emit('room-joined', {roomUserList, userCount: socket.rooms.size});
        // io.sockets.emit('rooms', {rooms});
    })

    socket.on('leave-room', (userUuid) => {
        let currentUser = users.get(userUuid)
        users.forEach(user => {
            if (currentUser.room !== user.room) {

            }
        })
        socket.join(socket.id)
        currentUser.room = socket.id
        users.set(socket.id, currentUser)
    })

    // socket.on('send-message', (message) => {
    //     console.log(message)
    //     const currentUser = users.get(socket.id)
    //     const roomIndex = getRoomIndex(currentUser.room)
    //     const formattedMessage = {author: currentUser.username, message: message}
    //     rooms[roomIndex].messageList.push(formattedMessage)
    //     io.to(currentUser.room).emit('message-received', {formattedMessage, messageList: rooms[roomIndex].messageList})
    //
    // })

    socket.on('disconnect', () => {
        console.log("disconnecting")
        // const currentUser = users.get(socket.id)
        // rooms.forEach(room => {
        //     let isEmptyRoom = true
        //
        //     users.delete(socket.id)
        //
        //     users.forEach(user => {
        //         if (room === user.room) {
        //             isEmptyRoom = false
        //         }
        //     })
        //     if (isEmptyRoom) {
        //         rooms.splice(rooms.indexOf(room), 1)
        //     }
        // })
        // if (currentUser) {
        //     const roomUserList = getRoomUserList(currentUser.room)
        //     io.to(currentUser.room).emit('room-left', {roomUserList, userCount: socket.rooms.size});
        // }
        // io.sockets.emit('rooms', {rooms});

    });

});


httpServer.listen(port, hostName, () => {
    console.log(`Server link : http://${hostName}:${port}`)
});