import React, {useEffect, useState} from "react";
import Header from "../../components/header/Header.jsx";
import RoomsPageStyle from "./RoomsPage.module.css";
import ListOfRoomCards from "../../components/listOfRoomCards/ListOfRoomCards.jsx";
import Button from "../../components/button/button.jsx";

/**
 * Login Page
 * @type {React.FC}
 */
export const RoomsPage = () => {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const url = new URL(window.location.href)
    const token = url.searchParams.get('token')
    if (token) {
      localStorage.setItem('googleToken', atob(token))
      createRoom() // Or redirect to the room creation page
    }

  }, []);

  const handleClick = async () => {
    const googleToken = localStorage.getItem('googleToken')
    if (!googleToken) {
      location = import.meta.env.VITE_API_URI + '/api/google/login'
    } else {
      await createRoom()
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
    const result = await response.json()
    console.log(result)

    rooms.push({
      id: result.roomName.substring(result.roomName.indexOf('/') + 1, result.roomName.length),
      meetingUrl: result.meetingUri,
      title: "Lorem Ipsum Title",
      description: "Lorem Ipsum Dolor Sit Amet Description",
      time: "60 min"
    })
    setRooms([...rooms])
  }

  return (
        <section className={RoomsPageStyle.page}>
            <Header />
            <h1 className={RoomsPageStyle.title}>Rooms</h1>
            <Button text={"Create Room"} onClick={handleClick}/>
            <ListOfRoomCards rooms={rooms} />
        </section>
    );
}
