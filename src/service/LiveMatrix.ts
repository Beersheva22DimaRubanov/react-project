import { matrixSum } from "../util/number-functions";
import { getRandomMatrix } from "../util/random";

export default class LiveMatrix {
    constructor(private _numbers: number[][]) {

    }

    get numbers() {
        return this._numbers;
    }

    next(): number[][] {
        // this._numbers = this._numbers.map((arr, index) => {
        //     return arr.map((el, elIndex) => {
        //         // console.log(`i: ${index} n: ${elIndex} el: ${el}`)
        //         let alive = 0;
        //         let deadCells = 0;
        //         let neighbours = this.getNeighbours(index, elIndex, this._numbers.length);
        //         neighbours.forEach((element: number) => {
        //             element == 1 ? alive++ : deadCells++
        //         });
        //         if (el == 0) {
        //             alive == 3 ? el = 1 : el = 0
        //         } else {
        //             if (alive < 2 || alive > 3) {
        //                 el = 0
        //             }
        //         }
        //         return el
        //     })
        // })
        this._numbers = this._numbers.map((_, index) => this.getRow(index))
        return this._numbers
    }

    private getRow(index: number): number[] {
        return this._numbers[index].map((_, j) => this.getNewCell(index, j));
    }

    private getNewCell(row: number, column: number): number{
        const cell = this._numbers[row][column];
        const partialMatrix = this.partialMatrix(row, column)
        const sum = matrixSum(partialMatrix) - cell;
        return cell ? getCellFromLive(sum): getCellFromDead(sum);
    }

    private partialMatrix (row: number, column: number): number[][] {
        const indexStart = !column ? 0 : column-1;
        const indexEnd = column === this._numbers[row].length - 1 ? column + 1 : column + 2 
        return [row-1, row, row+1].map(i => this._numbers[i]? this._numbers[i].slice(indexStart, indexEnd): [0]);
    }

    private getNeighbours(index: number, elIndex: number, length: number) {
        let res = []
        if (index == 0) {
            res = this.getfirstLastLinesElems(index, elIndex, length, 1);
        } else if (index == length - 1) {
            res = this.getfirstLastLinesElems(index, elIndex, length, -1);
        } else {
            if (elIndex == 0) {
                res = this.getMiddleElems(index, elIndex, length, 1);
            } else if (elIndex == length - 1) {
                res = this.getMiddleElems(index, elIndex, length, -1)
            } else {
                res.push(this._numbers[index - 1][elIndex - 1])
                res.push(this._numbers[index - 1][elIndex])
                res.push(this._numbers[index - 1][elIndex + 1])
                res.push(this._numbers[index][elIndex - 1])
                res.push(this._numbers[index][elIndex + 1])
                res.push(this._numbers[index + 1][elIndex - 1])
                res.push(this._numbers[index + 1][elIndex])
                res.push(this._numbers[index + 1][elIndex + 1])
            }
        }
        return res
    }

    private getMiddleElems(index: number, elIndex: number, length: number, increment: number) {
        let res = []
        res.push(this._numbers[index][elIndex + increment])
        res.push(this._numbers[index - 1][elIndex])
        res.push(this._numbers[index - 1][elIndex + increment])
        res.push(this._numbers[index + 1][elIndex])
        res.push(this._numbers[index + 1][elIndex + increment])
        return res;
    }

    private getfirstLastLinesElems(index: number, elIndex: number, length: number, increment: number) {
        let res = [];
        if (elIndex == 0) {
            res.push(this._numbers[index][elIndex + 1])
            res.push(this._numbers[index + increment][elIndex])
            res.push(this._numbers[index + increment][elIndex + 1])
        } else if (elIndex == length - 1) {
            res.push(this._numbers[index][elIndex - 1])
            res.push(this._numbers[index + increment][elIndex - 1])
            res.push(this._numbers[index + increment][elIndex])
        } else {
            res.push(this._numbers[index][elIndex - 1])
            res.push(this._numbers[index][elIndex + 1])
            res.push(this._numbers[index + increment][elIndex - 1])
            res.push(this._numbers[index + increment][elIndex])
            res.push(this._numbers[index + increment][elIndex + 1])
        }
        return res;
    }

}

function getCellFromLive(sum: number): number{
    return +(sum >= 2 && sum <=3);
}

function getCellFromDead(sum: number): number{
    return +(sum == 3);
}
