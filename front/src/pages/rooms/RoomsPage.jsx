import React from "react";
import Header from "../../components/header/Header.jsx";
import RoomsPageStyle from "./RoomsPage.module.css";
import CardRoom from "../../components/cardRoom/CardRoom.jsx";

/**
 * Login Page
 * @returns {Element}
 * @constructor
 */
function RoomsPage({rooms}) {
    return (
        <section className={RoomsPageStyle.page}>
            <Header />
                <h1 className={RoomsPageStyle.title}>Rooms</h1>
            <CardRoom cardRoomInfo={{}} />
        </section>
    );
}

export default RoomsPage;