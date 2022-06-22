import { ifEnemy } from "../utils"

export function getKnightMoves(row: number, column: number, board: string[][]): string[] {
    let output: string[] = []

    const knight = board[row][column]
    if(row-2>=0 && column-1>=0) output.push(`${row-2}${column-1}`)
    if(row+2<=7 && column-1>=0) output.push(`${row+2}${column-1}`)
    if(row-2>=0 && column+1<=7) output.push(`${row-2}${column+1}`)
    if(row+2<=7 && column+1<=7) output.push(`${row+2}${column+1}`)

    if(row-1>=0 && column-2>=0) output.push(`${row-1}${column-2}`)
    if(row+1<=7 && column-2>=0) output.push(`${row+1}${column-2}`)
    if(row-1>=0 && column+2<=7) output.push(`${row-1}${column+2}`)
    if(row+1<=7 && column+2<=7) output.push(`${row+1}${column+2}`)
    output = output.map(item => {
        const [row, column] = item.split('').map(prop => parseInt(prop))
        const piece = board[row][column]
        if (ifEnemy(knight, piece)) return item

        else return ""
    })

    return output
}