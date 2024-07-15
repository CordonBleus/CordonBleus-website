import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source.js";
import { getSingleRecipe } from "./routes/recipes/single.js";
import { searchRecipes } from "./routes/recipes/search.js";
import gMeetRouter from "./routes/gmeet.js"
import gLoginRouter from "./routes/google-login.js"
import { seedIfNeeded } from "./seed/index.js"
import {getAllRecipes } from "./routes/recipes/all.js";
import {loginUser} from "./routes/login.js";
import { createServer } from "http";
import { Server } from "socket.io";
import socketReceiveHandler from "./services/socket-io/socket-receive.js"
import {registerUser} from "./routes/register.js";

if (!AppDataSource.isInitialized) {
  await AppDataSource.initialize();
}

seedIfNeeded();

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, _, next) => {
    console.log(req.url)
    next()
})

app.get("/api/recipes", getAllRecipes);
app.get("/api/recipes/search", searchRecipes);
app.get("/api/recipes/:id", getSingleRecipe);
app.post("/api/login", loginUser);
app.post("/api/register", registerUser);

app.use("/api/meet", gMeetRouter);
app.use("/api/google", gLoginRouter);

app.get("/", (_, res) => {
    res.send("Welcome to the API!");
});

if (import.meta.env.PROD) {
  app.listen(3000, () => {
    console.log("API ready !");
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true
  }
});
const rooms = [];
const users = new Map;



app.post('/user', (req, res) => {
  const data = req.body;
  users.set("8f289a73-cf73-4931-ab93-84f65e3462b4",
    {
      email: "gotaga.gros+caca@gmail.com",
      username: "ZroGizi",
      password: "ZroGizi",
      room: "random"
    }
  )
  return res.status(200).json({
    "uuid": "8f289a73-cf73-4931-ab93-84f65e3462b4",
    "new_user": users.get("8f289a73-cf73-4931-ab93-84f65e3462b4")
  })
})

app.get('/rooms', (req, res) => {
  return res.status(200).json({
    "rooms": rooms
  })
})

function roomExist(givenRoomName) {
  const isInRooms = rooms.find(room => room.name === givenRoomName)
  return isInRooms !== undefined
}

function getRoomUserList(room) {
  let roomUserList = []
  users.forEach(user => {
    if (room === user.room) {
      roomUserList.push(user.username)
    }
  })
  return roomUserList
}

const onConnection = (socket) => {
  socketReceiveHandler(io, socket, users, roomExist, getRoomUserList, rooms);
}

io.on("connection", (socket) => {
  onConnection(socket)
})

io.listen(3001);

// noinspection JSUnusedGlobalSymbols (Used by Vite)
export const viteNodeApp = app;
