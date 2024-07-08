import Header from "../../components/header/Header.jsx";
import RoomPageStyle from "./RoomPage.module.css";
import RoomComponent from "../../components/room/RoomComponent.jsx";
import {useLocation} from "react-router-dom";
import PropTypes from "prop-types";

function Room({ roomName }) {
    const location = useLocation()
    const meetingUrl = location.state.roomInfo.meetingUrl

    return (
        <section className={RoomPageStyle.page}>
            <Header />
            <h1 className={RoomPageStyle.title}>Room: {roomName}</h1>
            <RoomComponent meetingUrl={meetingUrl}/>
        </section>
    );
}

Room.propTypes = {
    roomName: PropTypes.string.isRequired
};

export default Room;
