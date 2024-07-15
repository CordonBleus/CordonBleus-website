import "dotenv/config.js";
import {createServer} from "node:http";
import express from "express";
import cors from "cors";
import {Server} from "socket.io";
import {AppDataSource} from "./data-source.js";
import {getSingleRecipe} from "./routes/recipes/single.js";
import {searchRecipes} from "./routes/recipes/search.js";
import gMeetRouter from "./routes/gmeet.js";
import gLoginRouter from "./routes/google-login.js";
import {seedIfNeeded} from "./seed/index.js";
import {getAllRecipes} from "./routes/recipes/all.js";
import {loginUser} from "./routes/login.js";
import socketReceiveHandler from "./services/socket-io/socket-receive.js";
import {registerUser} from "./routes/register.js";

if (!AppDataSource.isInitialized) {
  await AppDataSource.initialize();
}

seedIfNeeded();

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, _, next) => {
  console.log(req.url);
  next();
});

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

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
const rooms = [];
const users = new Map;
users.set("8f289a73-cf73-4931-ab93-84f65e3462b4",
  {
    email: "random.mail@gmail.com",
    username: "sampleUsername",
    password: "samplePassword",
    room: "random",
  },
);

app.post("/api/user", (req, res) => {
  const data = req.body;
  users.set("8f289a73-cf73-4931-ab93-84f65e3462b4",
    {
      email: "random.mail@gmail.com",
      username: "sampleUsername",
      password: "samplePassword",
      room: "random",
    },
  );
  return res.status(200).json({
    "uuid": "8f289a73-cf73-4931-ab93-84f65e3462b4",
    "new_user": users.get("8f289a73-cf73-4931-ab93-84f65e3462b4"),
  });
});

app.get("/api/rooms", (req, res) => {
  return res.status(200).json({
    "rooms": rooms,
  });
});

function roomExist(givenRoomName) {
  const isInRooms = rooms.find(room => room.name === givenRoomName);
  return isInRooms !== undefined;
}

function getRoomUserList(room) {
  let roomUserList = [];
  users.forEach(user => {
    if (room === user.room) {
      roomUserList.push(user.username);
    }
  });
  return roomUserList;
}

const onConnection = (socket) => {
  socketReceiveHandler(io, socket, users, roomExist, getRoomUserList, rooms);
};

io.on("connection", (socket) => {
  onConnection(socket);
});

httpServer.listen(3000);
