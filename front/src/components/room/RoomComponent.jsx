import PropTypes from "prop-types";

function RoomComponent({meetingUrl}) {
    return (
        <div>
            <div>
                <a href={meetingUrl} target="_blank"><p>Video meet</p></a>
                <p>Recette</p>
                <p>Ingrédients</p>
                <p>Participants</p>
            </div>
        </div>
    );
}

RoomComponent.propTypes = {
    meetingUrl: PropTypes.string
}

export default RoomComponent;