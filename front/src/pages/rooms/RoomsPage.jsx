import React from "react";
import Header from "../../components/header/Header.jsx";
import RoomsPageStyle from "./RoomsPage.module.css";
import CardRoom from "../../components/cardRoom/CardRoom.jsx";
import ListOfRoomCards from "../../components/listOfRoomCards/ListOfRoomCards.jsx";

/**
 * Login Page
 * @returns {Element}
 * @constructor
 */
function RoomsPage({room}) {
    return (
        <section className={RoomsPageStyle.page}>
            <Header />
                <h1 className={RoomsPageStyle.title}>Rooms</h1>
            <ListOfRoomCards  />
        </section>
    );
}

export default RoomsPage;