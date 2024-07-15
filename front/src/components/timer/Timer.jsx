import timer from "../../assets/icons/timer.svg";
import TimerStyle from "./Timer.module.css";
import * as PropTypes from "prop-types";

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

Timer.propTypes = {
    time: PropTypes.string.isRequired
}


export default Timer;