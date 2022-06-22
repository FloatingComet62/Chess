function getType(piece: string): number {
    return parseInt(piece.split('')[1])
}
function getPlayer(piece: string): number {
    return parseInt(piece.split('')[0])
}
function ifEnemy(player: string, piece: string): boolean {
    if (getPlayer(piece) === parseInt(player)) return false
    else return true
}


function getPawnMoves(row: number, column: number, board: string[][]): string[] {
    let output: string[] = []

    const piece = board[row][column]
    if (getPlayer(piece) === 0) {
        //* step move
        output.push(`${row + 1}${column}`)

        //* starting jump move
        if (row === 1 && board[row + 1][column] === "") output.push(`${row + 2}${column}`)

        output = output.map(item => {
            const [ row, column ] = item.split('').map(prop=> parseInt(prop))
            if (board[row][column] == '') return item
            else return ""
        })

        //* attack move
        if(column<7)
            if (
                board[row + 1][column + 1] != '' &&
                ifEnemy(getPlayer(piece).toString(), board[row + 1][column + 1])
            ) output.push(`${row + 1}${column + 1}`)
        if(column>1) 
            if (
                board[row + 1][column - 1] != '' &&
                ifEnemy(getPlayer(piece).toString(), board[row + 1][column - 1])
            ) output.push(`${row + 1}${column - 1}`)
    }

    return output
}

function getPieceMoves(piece: string, row: number, column: number, board: string[][]): string[] {
    let output: string[] = []

    const pieceType = getType(piece)
    switch (pieceType) {
        case 1: output = [...output, ...getPawnMoves(row, column, board)]
    }

    return output
}

export default {
    getPieceMoves
}