export function format(board: string[][]) {
    let output: string[][] = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
    ]
    for (let i = 0; i < board.length; i++) {
        const row = board[i]
        for (let j = 0; j < row.length; j++) {
            const value = row[j].split('')

            if (value[0] === "0") output[i][j] += "W"
            else if (value[0] === "1") output[i][j] += "B"

            output[i][j] += "_"

            if (value[1] === "1") output[i][j] += "Pawn"
            else if (value[1] === "2") output[i][j] += "Rook"
            else if (value[1] === "3") output[i][j] += "Knight"
            else if (value[1] === "4") output[i][j] += "Bishop"
            else if (value[1] === "5") output[i][j] += "Queen"
            else if (value[1] === "6") output[i][j] += "King"
        }
    }

    return output
}

export function getType(piece: string): number {
    return parseInt(piece.split('')[1])
}

export function getPlayer(piece: string): number {
    return parseInt(piece.split('')[0])
}

export function ifEnemy(player: string, piece: string): boolean {
    if (getPlayer(piece) === getPlayer(player)) return false
    else return true
}