import React from "react";
import Header from "../../components/header/Header.jsx";
import RoomsPageStyle from "./RoomsPage.module.css";
import CardRoom from "../../components/cardRoom/CardRoom.jsx";
import ListOfRoomCards from "../../components/listOfRoomCards/ListOfRoomCards.jsx";
import Button from "../../components/button/button.jsx";
import {useNavigate} from "react-router-dom";

/**
 * Login Page
 * @returns {Element}
 * @constructor
 */
function RoomsPage({room}) {

  const handleClick = async () => {

    location = import.meta.env.VITE_API_URI + '/api/google/login'
  }

  return (
        <section className={RoomsPageStyle.page}>
            <Header />
                <h1 className={RoomsPageStyle.title}>Rooms</h1>
            <ListOfRoomCards  />
            <Button text={"Create Room"} onClick={handleClick}/>
        </section>
    );
}

export default RoomsPage;