import React, {useRef} from "react";
import buttonStyle from "./button.module.css"
// eslint-disable-next-line react/prop-types
function Button({ text }) {
    return (
        <button className={buttonStyle.button}><span>{text}</span></button>
    );
}

export default Button;