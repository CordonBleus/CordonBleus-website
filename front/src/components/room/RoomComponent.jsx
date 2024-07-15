import PropTypes from "prop-types";
import RoomComponentStyle from "./RoomComponent.module.css"

function RoomComponent({meetingUrl, recipe}) {
    return (
        <div>
            <img src={recipe.imageUrl} className={RoomComponentStyle.recipeThumbnail}/>
            <div className={RoomComponentStyle.container}>
              <div className={RoomComponentStyle.info}>
                <p>Participants : {"N"}</p>
                <p><a href={meetingUrl} target="_blank">Video meet</a></p>
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
    recipe: PropTypes.object
}

export default RoomComponent;