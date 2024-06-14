import RoomCompnentStyle from "./RoomComponent.module.css"

import React, {useRef} from 'react';

function RoomComponent({room}) {
    return (
        <div>
            <div>
                <a><p>Video meet</p></a><a><p>Recette</p></a><a><p>Ingrédients</p></a><a><p>Participants</p></a>
            </div>
        </div>
    );
}

export default RoomComponent;