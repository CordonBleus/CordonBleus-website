import React from "react";
import timer from "../../assets/icons/timer.svg";
import TimerStyle from "./Timer.module.css";

function Timer({time}) {
    return (
        <div className={TimerStyle.container}>
            <img className={TimerStyle.inline1} src={timer} alt="timer" />
            <div className={TimerStyle.inline2}>
                <p className={TimerStyle.timeText}>{time}</p>
            </div>
        </div>
    );
}

export default Timer;