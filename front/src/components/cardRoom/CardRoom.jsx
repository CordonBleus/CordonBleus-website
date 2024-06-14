// eslint-disable-next-line no-unused-vars
import React from "react";
import CardRoomStyle from "./CardRoom.module.css"
import icon from "../../assets/icons/fourchette.svg"
import pizza from "../../assets/food/pizza.png"
import Timer from "../timer/Timer.jsx";
import Button from "../button/button.jsx";

function CardRoom({cardRoomInfo}) {
    const handleClick = () => {
        console.log(cardRoomInfo);
    };
    return (
        <article className={CardRoomStyle.card}>
            <img src={icon} alt="icon"/>
            <div>
                <p>{cardRoomInfo.title}</p>
            </div>
            <div className={CardRoomStyle.container}>
                <p className={CardRoomStyle.inline1}>{cardRoomInfo.description}</p>
                <img className={CardRoomStyle.inline2} src={pizza} alt="pizza"/>
            </div>
            <div className={CardRoomStyle.container}>
                <div className={CardRoomStyle.inline1}>
                    <Timer time={cardRoomInfo.time}/>
                </div>
                <Button className={CardRoomStyle.joinButoon} onClick={handleClick}  text={"Join"} />
            </div>
        </article>
    );
}

export default CardRoom;