import {useEffect, useRef, useState} from 'react';
import {connectWS, disconnectWS, joinRoom, onJoinedRoom, onSetRooms} from "../services/socketio/index.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function RoomList() {
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = connectWS()
    console.log(socket.current)
    fetchRooms()
    // const onroomJOINCleanUp = onJoinedRoom(socket.current, (args) => {
    //   setRooms(args.roomUserList)
    // })
    // const onSetRoomsCleanUp = onSetRooms(socket.current, (args) => {
    //   setRooms(args.rooms)
    // })
    return () => {
      // onroomJOINcleanup()
      // onSetRoomsCleanUp()
      disconnectWS(socket.current)
      socket.current = null
    }
  }, [])

  const fetchRooms = async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/rooms",
    )
    setRooms(response.data.rooms)
  }

  const join = async (roomName) => {
    if (socket.current == null) return;
    const userUuid = localStorage.getItem("userUuid")
    joinRoom(socket.current, userUuid, roomName, 'https://meet.google.com/new')
    // navigate("/room-list")
    // console.log(rooms)
  };

  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {/* eslint-disable-next-line react/prop-types */}
        {rooms.map((room) => (
          <li key={room.name}>  {/* Use unique identifier if available */}
            <button onClick={() => join(room.name)}>
              {room.name || room} {/* Display room name if available */}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => join("Tiramisu" + Math.random() * 100)}>
        Create Room
      </button>
    </div>
  );
}

export default RoomList;
