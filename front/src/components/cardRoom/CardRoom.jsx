// eslint-disable-next-line no-unused-vars
import React from "react";
import CardRoomStyle from "./CardRoom.module.css"
import icon from "../../assets/icons/fourchette.svg"
import pizza from "../../assets/food/pizza.png"
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
                <p className={CardRoomStyle.title}>{cardRoomInfo.title}</p>
            </div>
            <div className={CardRoomStyle.container}>
                <p className={CardRoomStyle.inline1}>{cardRoomInfo.description}</p>
                <img className={CardRoomStyle.inline2} src={pizza} alt="pizza"/>
            </div>
            <div className={CardRoomStyle.container}>
                <div className={CardRoomStyle.inline1}>
                    <Timer time={cardRoomInfo.recipe.prepTime + cardRoomInfo.recipe.cookingTime}/>
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
        // time: PropTypes.string.isRequired
    })
};


export default CardRoom;
