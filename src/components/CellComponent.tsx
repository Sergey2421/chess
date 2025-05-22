import React, {FC} from 'react';
import {Cell} from "../models/Cell.ts";

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({cell, selected, click   }) => {
    return (
        <div
            className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
             onClick={() => click(cell)}
            style={{backgroundColor: cell.available && cell.figure ? 'green' : ''}}
        >
            {cell.available && !cell.figure && <div className='available'></div>}
            {
            cell.figure?.logo && <img src={cell.figure.logo} alt={cell.figure.name}></img>
            }
        </div>
    );
};

export default CellComponent;