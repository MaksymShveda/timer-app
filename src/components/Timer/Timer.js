import TimerText from "../TimerText/TimerText";
import Reset from "../Reset/Reset";
import Wait from '../Wait/Wait';
import StartStop from "../StartStop/StartStop";


const Timer = () => {
    return (
        <div id="timer">
            <TimerText />
            <div>
                <StartStop />
                <Wait />
                <Reset />
            </div>
        </div>
    
    )
}


export default Timer;