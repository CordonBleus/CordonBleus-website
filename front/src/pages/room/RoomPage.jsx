import React from "react";
import Header from "../../components/header/Header.jsx";
import RoomPageStyle from "./RoomPage.module.css";
import RoomComponent from "../../components/room/RoomComponent.jsx";

function Room({ roomName }) {
    return (
        <section className={RoomPageStyle.page}>
            <Header />
            <h1 className={RoomPageStyle.title}>Room: {roomName}</h1>
            <RoomComponent />
        </section>
    );
}

export default Room;
