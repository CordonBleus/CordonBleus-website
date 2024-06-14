import React, { useRef } from "react";
import buttonStyle from "./button.module.css";
// eslint-disable-next-line react/prop-types

// Improved Button component with onClick prop for function handling
function Button({ text, onClick }) {
    const buttonRef = useRef(null); // Optional for programmatic button access

    const handleClick = () => {
        // Perform any additional logic here before calling the passed onClick function
        if (onClick) {
            onClick(); // Call the function passed as a prop
        }
    };

    return (
        <button ref={buttonRef} className={buttonStyle.button} onClick={handleClick}>
            <span>{text}</span>
        </button>
    );
}

export default Button;