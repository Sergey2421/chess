import './App.css'
import BoardComponent from "./components/BoardComponent.tsx";
import React, {useEffect, useState} from "react";
import {Board} from "./models/Board.ts";
import {Player} from "./models/Player.ts";
import {Colors} from "./models/Colors.ts";
import LostFigures from "./components/LostFigures.tsx";
import Timer from "./components/Timer.tsx";

function App() {
    const [board, setBoard] = useState(new Board());
    const [currentPlayer, setCurrentPlayer] = useState<Player| null>(null);
    const whitePlayer = new Player(Colors.WHITE)
    const blackPlayer = new Player(Colors.BLACK)

    useEffect(() => {
        restart()
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures()
        setBoard(newBoard);
        setCurrentPlayer(whitePlayer)
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.BLACK ? whitePlayer : blackPlayer);
    }

    return (
        <div className="app">
            <Timer currentPlayer={currentPlayer} restart={restart} />
            <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer} />
            <div>
                <LostFigures title={`Чёрные фигуры`} figures={board.lostBlackFigures}/>
                <LostFigures title={`Белые фигуры`} figures={board.lostWhiteFigures}/>
            </div>
        </div>
    )
}

export default App
