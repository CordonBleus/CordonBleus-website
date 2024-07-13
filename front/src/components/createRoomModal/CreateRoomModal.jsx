import Button from "../button/button.jsx";
import * as PropTypes from "prop-types";
import CreateRoomModalStyle from "./CreateRoomModal.module.css";
import {useEffect, useState} from "react";

function CreateRoomModal({onClose}) {
  const [recipes, setRecipes] = useState([])

  useEffect( () => {
    getRecipes().then((recipes) => setRecipes(recipes))
  }, []);

  const getRecipes = async () => {
    const response = await fetch(import.meta.env.VITE_API_URI + '/api/recipes', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return await response.json()
  }

  return (
    <div className={CreateRoomModalStyle.modalBackground}>
      <div className={CreateRoomModalStyle.modalContent}>
        <h2>Choose a recipe</h2>
        <select>
          {recipes.map((recipe) => <option key={recipe.id} value={recipe.id}>{recipe.name}</option>)}
        </select>
        <Button text={"Create"} onClick={onClose}/>
      </div>
    </div>
  )
}

CreateRoomModal.propTypes = {onClose: PropTypes.func};

export default CreateRoomModal;