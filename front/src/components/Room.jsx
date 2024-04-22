import React, {useRef} from 'react';

function Room(props) {
  const messageRef = useRef(null);
  return (
    <div className="data-room">
      <h2>Data Room: {props.roomName}</h2>
      <div className="message" ref={messageRef}></div>
    </div>
  );
}

export default Room;
