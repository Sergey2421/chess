import {Player} from "../models/Player.ts";
import {FC, useEffect, useRef, useState} from "react";
import {Colors} from "../models/Colors.ts";


interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [whiteTime, setWhiteTime] = useState<number>(300)
    const [blackTime, setBlackTime] = useState<number>(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.BLACK ? decrementBlackTime : decrementWhiteTime;
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTime() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTime() {
        setWhiteTime(prev => prev - 1)
    }

    function handleRestart() {
        setBlackTime(300);
        setWhiteTime(300);
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>

            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    )
}

export default Timer;