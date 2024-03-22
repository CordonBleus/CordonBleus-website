import React from 'react';


// eslint-disable-next-line react/prop-types
function RoomList({rooms, onRoomSelect}) {
  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {/* eslint-disable-next-line react/prop-types */}
        {rooms.map((room) => (
          <li key={room.name}>  {/* Use unique identifier if available */}
            <button onClick={() => onRoomSelect(room.id || room.name)}>
              {room.name || room} {/* Display room name if available */}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => onRoomSelect("Tiramisu" + Math.random() * 100)}>
        Create Room
      </button>
    </div>
  );
}

export default RoomList;
