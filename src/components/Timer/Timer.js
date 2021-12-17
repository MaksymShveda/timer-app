import TimerText from "../TimerText/TimerText";
import Reset from "../Reset/Reset";
import Pause from '../Pause/Pause';
import StartStop from "../StartStop/StartStop";


import { Observable } from "rxjs";

import { useState } from "react";

const Timer = () => {
    const [timerData, setTimerData] = useState(0);
    const [countDown, setCountDown] = useState("");
    const [isClickedOnce, setClicked] = useState(false)
    
    const startNewTimer = () => {
        const newTimer = new Observable((subscriber) => {
            setInterval(() => {
            subscriber.next(value => value + 1)
        
            }, 1000)
        }).subscribe((value) => {
            setTimerData(value)
        });
        setCountDown(newTimer)
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
            const timerForClick = setTimeout(() => {
                setClicked(false);
                clearTimeout(timerForClick);
            }, 300)
        }
        else {
            if(countDown){
                countDown.unsubscribe();
            };

            setCountDown('');
        }
    };

    const handleReset = () => {
        if(countDown){
            countDown.unsubscribe();
        };

        setTimerData(0);

        const newTimer = new Observable((subscriber) =>{
            setInterval(() => {
                subscriber.next(value => value + 1)
            
                }, 1000)
            }).subscribe((value) => {
                setTimerData(value)
            });
    
        setCountDown(newTimer);
    };


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