import {Figure, FigureNames} from "./Figure.ts";
import {Colors} from "../Colors.ts";
import {Cell} from "../Cell.ts";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;

        /*for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const figure = this.cell.board.cells[i][j].figure;
                if (figure?.color !== this.color) {
                    if (figure?.name === FigureNames.KING) {
                        const dx = Math.abs(figure.cell.x - target.x);
                        const dy = Math.abs(figure.cell.y - target.y);
                        if ((dx === 0 && dy === 1) || (dx === 1 && dy === 0) || (dy === 1 && dx === 1)) return false;
                    }
                    if (figure?.canMove(target)) return false;
                }

            }
        }*/

        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        return (dx === 0 && dy === 1) || (dx === 1 && dy === 0) || (dy === 1 && dx === 1)
    }
}