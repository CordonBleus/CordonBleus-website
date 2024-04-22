import "./App.jsx"
// Client.jsx
import {useEffect, useRef, useState} from 'react';
import LoginForm from './components/LoginForm.jsx';
import RoomList from './components/RoomList.jsx';
import Room from './components/Room.jsx';
import {connectWS, disconnectWS, joinRoom, onJoinedRoom} from "./services/socketio/index.js";

function Client() {
    const socketRef = useRef(null);
    const [room, setRoom] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roomsData, setRoomsData] = useState([]);

    useEffect(() => {
        socketRef.current = io.connect(import.meta.env.SOCKET_SERVER_URI); // Replace with your server URL
        console.log('socketRef.current', socketRef.current)

        socketRef.current.on('rooms', ({rooms}) => {
            console.log('rooms', rooms)
            setRoomsData(rooms); // Update state with received rooms
        })

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const joinRoom = async (roomName) => {
        // const {meetId, meetingLink} = await createRoom()

        console.log('joinRoom', roomName)
        socketRef.current.emit('join-room', {room: roomName, meetingLink: 'https://meet.google.com/new'});
        setRoom(roomName);
    };

    // const leaveRoom = () => {
    //     socketRef.current.emit('leave-room');
    //     setRoom(null); // Clear current room
    // };

    const handleLogin = (username, email, password) => {
        socketRef.current.emit('login', {username, email, password});
        setIsLoggedIn(true);
    };

    const handleRoomSelection = (selectedRoom) => {
        console.log("send socket")
        joinRoom(selectedRoom).then(r => console.log(r));
    };

    return (
      <div>
          {!isLoggedIn ? (
            <LoginForm onLogin={handleLogin}/>
          ) : room ? (
            <Room roomName={room} socket={socketRef.current}/>
          ) : (
            <RoomList rooms={roomsData} onRoomSelect={handleRoomSelection}/>
          )}
      </div>
    );
}

export default Client;