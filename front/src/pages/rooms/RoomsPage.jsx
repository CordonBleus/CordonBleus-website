import {useEffect, useState} from "react";
import Header from "../../components/header/Header.jsx";
import RoomsPageStyle from "./RoomsPage.module.css";
import ListOfRoomCards from "../../components/listOfRoomCards/ListOfRoomCards.jsx";
import Button from "../../components/button/button.jsx";
import CreateRoomModal from "../../components/createRoomModal/CreateRoomModal.jsx";

export const RoomsPage = () => {
  const [rooms, setRooms] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const url = new URL(window.location.href)
    const token = url.searchParams.get('token')
    if (token) {
      localStorage.setItem('googleToken', atob(token))
      setShowModal(true)
    }

  }, []);

  const handleClick = async () => {
    const googleToken = localStorage.getItem('googleToken')
    if (!googleToken) {
      location = import.meta.env.VITE_API_URI + '/api/google/login'
    } else {
      setShowModal(true)
    }
  }

  return (
        <section className={RoomsPageStyle.page}>
            <Header />
            <h1 className={RoomsPageStyle.title}>Rooms</h1>
            <Button text={"Create Room"} onClick={handleClick}/>
            <ListOfRoomCards rooms={rooms} />
            {showModal && <CreateRoomModal onClose={async () => {
              setShowModal(false)
            }} />}
        </section>
    );
}
