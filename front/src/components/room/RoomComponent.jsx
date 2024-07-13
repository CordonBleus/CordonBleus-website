import PropTypes from "prop-types";
import RoomComponentStyle from "./RoomComponent.module.css"

function RoomComponent({meetingUrl}) {
    return (
        <div>
            <div>
              <div className={RoomComponentStyle.info}>
                <p>Participants : {"N"}</p>
                <p><a href={meetingUrl} target="_blank">Video meet</a></p>
              </div>
                <h2>Ingrédients</h2>
                <h2>Recette</h2>
            </div>
        </div>
    );
}

RoomComponent.propTypes = {
    meetingUrl: PropTypes.string
}

export default RoomComponent;