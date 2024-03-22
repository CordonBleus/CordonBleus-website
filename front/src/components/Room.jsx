import React, { useEffect, useRef } from 'react';

function Room({ roomName, socket }) {
    const messageRef = useRef(null);

    useEffect(() => {
        // Handle joining the room
        socket.emit('join-room', roomName);

        // Handle receiving strings from the server
        socket.on('receive-string', (data) => {
            messageRef.current.textContent = data; // Update message content
        });

        // Cleanup on unmount
        return () => {
            socket.emit('leave-room'); // Leave the room on component unmount
        };
    }, [socket, roomName]);

    return (
        <div className="data-room">
            <h2>Data Room: {roomName}</h2>
            <div className="message" ref={messageRef}></div>
        </div>
    );
}

export default Room;
