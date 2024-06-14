// CardRoomList.jsx
import React from 'react';
import CardRoom from '../cardRoom/CardRoom.jsx';
import styleCardRoom from "./ListOfRoomCards.module.css"

const cardRoomData = [
    {
        id: 1,
        title: "Pizza",
        description: "Pizza is a traditional Italian cuisine recipe, originating from Naples, made from flatbread dough, topped mainly with olive oil, tomato sauce, mozzarella ...",
        time: "45 min"
    },
    {
        id: 2,
        title: "Burger",
        description: "Burgers are popular American cuisine, made from a ground meat patty, usually beef, placed inside a sliced bread roll or bun, often served with cheese, lettuce, tomato, and condiments.",
        time: "30 min"
    },
    {
        id: 3,
        title: "Sushi",
        description: "Sushi is a traditional Japanese dish, prepared with vinegared rice, usually accompanied by various ingredients such as seafood, vegetables, and occasionally tropical fruits.",
        time: "60 min"
    },
    {
        id: 4,
        title: "Sushi",
        description: "Sushi is a traditional Japanese dish, prepared with vinegared rice, usually accompanied by various ingredients such as seafood, vegetables, and occasionally tropical fruits.",
        time: "60 min"
    },
    {
        id: 4,
        title: "Sushi",
        description: "Sushi is a traditional Japanese dish, prepared with vinegared rice, usually accompanied by various ingredients such as seafood, vegetables, and occasionally tropical fruits.",
        time: "60 min"
    }
    ,{
        id: 4,
        title: "Sushi",
        description: "Sushi is a traditional Japanese dish, prepared with vinegared rice, usually accompanied by various ingredients such as seafood, vegetables, and occasionally tropical fruits.",
        time: "60 min"
    }
    ,{
        id: 4,
        title: "Sushi",
        description: "Sushi is a traditional Japanese dish, prepared with vinegared rice, usually accompanied by various ingredients such as seafood, vegetables, and occasionally tropical fruits.",
        time: "60 min"
    }
    // Add more items as needed
];

function ListOfRoomCards() {
    return (
        <div className={styleCardRoom.cardContainer}>
            {cardRoomData.map((cardRoomInfo) => (
                <CardRoom key={cardRoomInfo.id} cardRoomInfo={cardRoomInfo} />
            ))}
        </div>
    );
}

export default ListOfRoomCards;
