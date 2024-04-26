// eslint-disable-next-line no-unused-vars
import React from "react";
import CardRoomStyle from "./CardRoom.module.css"
import icon from "../../assets/cooking_icons/burgerhumburger.png"
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
                <p>Pizza</p>
            </div>
            <div className={CardRoomStyle.container}>
                <p className={CardRoomStyle.inline1}>Pizza is a traditional Italian cuisine recipe, originating from
                    Naples, made from flatbread dough, topped mainly with olive oil, tomato sauce, mozzarella ...</p>
                <img className={CardRoomStyle.inline2} src={pizza} alt="pizza"/>
            </div>
            <div className={CardRoomStyle.container}>
                <div className={CardRoomStyle.inline1}>
                    <Timer time={"45 min"}/>
                </div>
                <Button className={CardRoomStyle.joinButoon} onClick={handleClick}  text={"Join"} />
            </div>
        </article>
    );
}

export default CardRoom;