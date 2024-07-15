import Header from "../../components/header/Header.jsx";
import RoomPageStyle from "./RoomPage.module.css";
import RoomComponent from "../../components/room/RoomComponent.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "../../components/button/button.jsx";

function Room() {

    const location = useLocation()
    const meetingUrl = location.state.roomInfo.meetingUrl
    const recipe = location.state.roomInfo.recipe
    const host = location.state.roomInfo.host
    const navigate = useNavigate()

    return (
        <section className={RoomPageStyle.page}>
            <Header />
            <h1 className={RoomPageStyle.title}>{recipe.name}</h1>
            <RoomComponent meetingUrl={meetingUrl} recipe={recipe} host={host}/>
            <Button text={"Back"} onClick={() => navigate('/room-list')}/>
        </section>
    );
}

export default Room;
