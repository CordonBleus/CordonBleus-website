import CardRoomStyle from "./CardRoom.module.css"
import icon from "../../assets/icons/fourchette.svg"
import Timer from "../timer/Timer.jsx";
import Button from "../button/button.jsx";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function CardRoom({cardRoomInfo}) {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(cardRoomInfo);
        navigate(`/room/${cardRoomInfo.id}`, {state: {roomInfo: cardRoomInfo}, replace: true})
    };
    return (
        <article className={CardRoomStyle.card}>
            <img src={icon} alt="icon"/>
            <div>
                <p className={CardRoomStyle.title}>{cardRoomInfo.recipe.name}</p>
            </div>
            <div className={CardRoomStyle.container}>
                <div>
                    <p>Hôte: <b>{cardRoomInfo.host}</b></p>
                    <p>{"Lorem Ipsum Dolor Sit amet"}</p>
                </div>
                <img className={CardRoomStyle.thumbnail} src={cardRoomInfo.recipe.imageUrl} alt="pizza"/>
            </div>
            <div className={CardRoomStyle.container}>
                <div className={CardRoomStyle.inline1}>
                    <Timer time={cardRoomInfo.recipe.prepTime + cardRoomInfo.recipe.cookingTime + " mins"}/>
                </div>
                <Button className={CardRoomStyle.joinButoon} onClick={handleClick}  text={"Join"} />
            </div>
        </article>
    );
}

CardRoom.propTypes = {
    cardRoomInfo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        recipe: PropTypes.object.isRequired,
        host: PropTypes.string.isRequired,
    })
};


export default CardRoom;
