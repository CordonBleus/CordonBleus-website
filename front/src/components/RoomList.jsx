import {useEffect, useRef, useState} from 'react';
import {connectWS, disconnectWS, joinRoom, onJoinedRoom} from "../services/socketio/index.js";

// eslint-disable-next-line react/prop-types
function RoomList() {
  const [room, setRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = (connectWS())
    const onroomJOINcleanup = onJoinedRoom(socket, (args) => {
      setRooms(args)
    })

    return () => {
      onroomJOINcleanup()
      disconnectWS()
      socket.current = null
    }
  }, [])

  const join = (roomName) => {
    if (socket == null) return;
    joinRoom(socket, roomName, 'https://meet.google.com/new')
    setRoom(roomName);
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
