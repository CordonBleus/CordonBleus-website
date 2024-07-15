import PropTypes from "prop-types";
import RoomComponentStyle from "./RoomComponent.module.css"
import Button from "../button/button.jsx";

function RoomComponent({meetingUrl, recipe, host}) {
    return (
        <div>
            <img src={recipe.imageUrl} className={RoomComponentStyle.recipeThumbnail}/>
            <div className={RoomComponentStyle.container}>
                <div className={RoomComponentStyle.info}>
                    <p>Participants : {"N"}</p>
                    <p>Hôte : <b>{host}</b></p>
                </div>
                <div className={RoomComponentStyle.linkContainer}>
                    <Button text={"Access the meeting"} onClick={() => window.open(meetingUrl, "_blank")}/>
                </div>
                <h2>Ingrédients</h2>
                <ul>
                    {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                </ul>
                <h2>Recette</h2>
                <ol>
                    {recipe.steps.map((step, key) => (
                        <li key={key}>{step}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

RoomComponent.propTypes = {
    meetingUrl: PropTypes.string,
    recipe: PropTypes.object,
    host: PropTypes.string
}

export default RoomComponent;