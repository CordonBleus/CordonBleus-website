import Button from "../button/button.jsx";
import * as PropTypes from "prop-types";
import CreateRoomModalStyle from "./CreateRoomModal.module.css";
import {useEffect, useState} from "react";
import {joinRoom} from "../../services/socketio/index.js";

function CreateRoomModal({socket, onClose}) {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  useEffect( () => {
    getRecipes()
  }, []);

  const getRecipes = async () => {
    const response = await fetch(import.meta.env.VITE_API_URI + '/api/recipes', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const result = await response.json()
    setRecipes(result)
    setSelectedRecipe(result[0])
  }

  const createRoom = async () => {
    if (socket.current == null) return;
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
    console.log(selectedRecipe)

    const userUuid = localStorage.getItem("userUuid");
    joinRoom(
      socket.current,
      userUuid,
      result.roomName,
      "roomDescription",
      selectedRecipe.id,
      result.meetingUri,
      localStorage.getItem('username')
    );

    onClose()
  }

  return (
    <div className={CreateRoomModalStyle.modalBackground}>
      <div className={CreateRoomModalStyle.modalContent}>
        <h2>Choose a recipe</h2>
        <select onChange={(event) => setSelectedRecipe(event.target.value)}>
          {recipes.map((recipe) => <option key={recipe.id} value={recipe.id}>{recipe.name}</option>)}
        </select>
        <div className={CreateRoomModalStyle.btnContainer}>
          <Button text={"Create"} onClick={createRoom}/>
          <Button text={"Close"} onClick={onClose}/>
        </div>
      </div>
    </div>
  )
}

CreateRoomModal.propTypes = {
  onClose: PropTypes.func,
  socket: PropTypes.object
};

export default CreateRoomModal;