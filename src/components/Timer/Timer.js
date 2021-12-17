import TimerText from "../TimerText/TimerText";
import Reset from "../Reset/Reset";
import Pause from '../Pause/Pause';
import StartStop from "../StartStop/StartStop";


import { interval } from "rxjs";
import { map } from 'rxjs/operators';

import { useState, useEffect } from "react";

const Timer = () => {
    const [timerData, setTimerData] = useState(0);
    const [timerCache, setTimerCache] = useState(0);
    const [countDown, setCountDown] = useState("");
    const [isClickedOnce, setClicked] = useState(false)
    
    const startNewTimer = () => {
        const newTimer = interval(1000)
            .pipe(
                map((value) => value + 1))
            .subscribe((value) => {
                setTimerData(value + timerCache);
            });
            setCountDown(newTimer);
    };

    const deleteTimer = () => {
        countDown.unsubscribe();
        setTimerData(0);
        setCountDown("");
    };

    const handleTimer = () =>{
        countDown ? deleteTimer() : startNewTimer();
    };

    const handlePause = () => {
        if(!isClickedOnce){
            setClicked(true);
            const timerForClick = setTimeout(()=>{
                setClicked(false);
                clearTimeout(timerForClick);
            }, 300)
        }
        else {
            if(countDown){
                countDown.unsubscribe();
            };

            setTimerCache(timerData);
            setCountDown('');
        }
    }

    const handleReset = () => {

    }

    return (
        <div id="timer">
            <TimerText timeAmount={timerData} />
            <div>
                <StartStop handleTimer={handleTimer}/>
                <Pause handlePause={handlePause} />
                <Reset handleReset={handleReset} />
            </div>
        </div>
    
    );
};


export default Timer;