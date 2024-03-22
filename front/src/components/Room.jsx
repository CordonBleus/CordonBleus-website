import React, { useEffect, useRef } from 'react';

function Room({ roomName, socket }) {
    const messageRef = useRef(null);

    return (
        <div className="data-room">
            <h2>Data Room: {roomName}</h2>
            <div className="message" ref={messageRef}></div>
        </div>
    );
}

export default Room;
