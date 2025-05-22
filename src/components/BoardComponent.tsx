import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board.ts";
import CellComponent from "./CellComponent.tsx";
import {Cell} from "../models/Cell.ts";
import {Player} from "../models/Player.ts";
import LostFigures from "./LostFigures.tsx";
import {Colors} from "../models/Colors.ts";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click (cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else if (cell.figure?.color === currentPlayer?.color) {
            setSelectedCell(cell);
        } else {
            setSelectedCell(null)
        }
    }

    useEffect(() => {
        highLightCells()
    }, [selectedCell]);

    function highLightCells() {
        board.highLightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            Текущий игрок {currentPlayer?.color}
                <div className="board">
                    {board.cells.map((row, i) =>
                        <React.Fragment key={i}>
                            {
                                row.map((cell) =>
                                    <CellComponent
                                        click={click}
                                        cell={cell}
                                        key={cell.id}
                                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                    />
                                )
                            }
                        </React.Fragment>
                    )}
                </div>
            </div>
    );
};

export default BoardComponent;