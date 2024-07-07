import React, {useEffect} from "react";
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

  useEffect(() => {
    const url = new URL(window.location.href)
    const token = url.searchParams.get('token')
    if (token) {
      localStorage.setItem('googleToken', atob(token))
      createRoom()
    }

  }, []);

  const handleClick = async () => {
    const googleToken = localStorage.getItem('googleToken')
    if (!googleToken) {
      location = import.meta.env.VITE_API_URI + '/api/google/login'
    } else {
      createRoom()
    }
  }

  const createRoom = async () => {
    const response = await fetch(import.meta.env.VITE_API_URI + '/api/meet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'authorized_user',
        refresh_token: localStorage.getItem('googleToken'),
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET
      })
    })
    console.log(response.json())
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