// Client.jsx
import React, { useEffect, useRef, useState } from 'react';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import LoginForm from './components/LoginForm.jsx';
import RoomList from './components/RoomList.jsx';
import Room from './components/Room.jsx';

function Client() {
    const socketRef = useRef(null);
    const [room, setRoom] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roomsData, setRoomsData] = useState([]);

    useEffect(() => {
        socketRef.current = io('http://localhost:3000'); // Replace with your server URL

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const joinRoom = (roomName) => {
        if (socketRef.current) {
            socketRef.current.emit('join-room', roomName);
            setRoom(roomName); // Track current room
        }
    };

    const leaveRoom = () => {
        if (socketRef.current) {
            socketRef.current.emit('leave-room');
            setRoom(null); // Clear current room
        }
    };

    // const getRooms = () => {
    //     if (socketRef.current) {
    //         socketRef.current.emit('get-rooms', ({rooms}) => {
    //             setRoomsData(rooms); // Update state with received rooms
    //         });
    //     }
    // };
    socketRef.current.on('rooms', ({rooms}) => {
        setRoomsData(rooms); // Update state with received rooms
    });
    const handleLogin = (username, email, password) => {
        if (socketRef.current) {
            socketRef.current.emit('login', { username, email, password }, (loginSuccess) => {
                if (loginSuccess) {
                    setIsLoggedIn(true);
                    //getRooms(); // Fetch room list after successful login
                } else {
                    // Handle login failure
                }
            });
        }
    };

    const handleRoomSelection = (selectedRoom) => {
        joinRoom(selectedRoom);
    };

    return (
        <div>
            {!isLoggedIn ? (
                <LoginForm onLogin={handleLogin} />
            ) : room ? (
                <Room roomName={room} socket={socketRef.current} />
            ) : (
                <RoomList rooms={roomsData} onRoomSelect={handleRoomSelection} />
            )}
        </div>
    );
}

export default Client;
