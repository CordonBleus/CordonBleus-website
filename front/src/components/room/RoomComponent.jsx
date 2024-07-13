import PropTypes from "prop-types";

function RoomComponent({meetingUrl}) {
    return (
        <div>
            <div>
                <a href={meetingUrl} target="_blank"><p>Video meet</p></a><a><p>Recette</p></a><a><p>Ingrédients</p></a><a><p>Participants</p></a>
            </div>
        </div>
    );
}

RoomComponent.propTypes = {
    meetingUrl: PropTypes.string
}

export default RoomComponent;