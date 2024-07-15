import CardRoom from '../cardRoom/CardRoom.jsx';
import styleCardRoom from "./ListOfRoomCards.module.css"
import PropTypes from "prop-types";


function ListOfRoomCards({rooms}) {
    return (
        <div className={styleCardRoom.cardContainer}>
            {rooms.map((cardRoomInfo) => (
                <CardRoom key={cardRoomInfo.id} cardRoomInfo={cardRoomInfo} />
            ))}
        </div>
    );
}

ListOfRoomCards.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        recipe: PropTypes.object.isRequired,
        meetingUrl: PropTypes.string.isRequired
    }))
};

export default ListOfRoomCards;
