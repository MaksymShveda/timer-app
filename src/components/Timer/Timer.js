import TimerText from "../TimerText/TimerText";
import Reset from "../Reset/Reset";
import Wait from '../Wait/Wait';
import StartStop from "../StartStop/StartStop";


import { interval } from "rxjs";
import { map } from 'rxjs/operators';

import { useState, useEffect } from "react";

const Timer = () => {
    const [timerData, setTimerData] = useState(0);
    const [countDown, setCountDown] = useState();
    
    const startNewTimer = () => {
        const newTimer = interval(1000)
            .pipe(
                map((value) => value + 1))
            .subscribe((value) => {
                setTimerData(value);
            });
            setCountDown(newTimer)
    };

    const deleteTimer = () => {

    };

    const handleTimer = (countDown) =>{
        countDown ? startNewTimer() : deleteTimer();
    };

    return (
        <div id="timer">
            <TimerText timeAmount={timerData} />
            <div>
                <StartStop handleTimer={handleTimer}/>
                <Wait />
                <Reset />
            </div>
        </div>
    
    )
};


export default Timer;