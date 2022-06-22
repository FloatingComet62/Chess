function getType(piece: string): number {
    return parseInt(piece.split('')[1])
}
function getPlayer(piece: string): number {
    return parseInt(piece.split('')[0])
}
function ifEnemy(player: string, piece: string): boolean {
    if (getPlayer(piece) === getPlayer(player)) return false
    else return true
}

function getRookMoves(row: number, column: number, board: string[][]): string[] {
    let output: string[] = [];

    const rook = board[row][column]
    //* horizontal
    const posRow = [
        `${row}0`,
        `${row}1`,
        `${row}2`,
        `${row}3`,
        `${row}4`,
        `${row}5`,
        `${row}6`,
        `${row}7`
    ]
    const right = posRow.slice().splice(column + 1)
    const left = posRow.slice().splice(0, column).reverse()
    let barrierHit = false

    left.forEach(item => {
        if (barrierHit) return

        const [row, column] = item.split('').map(prop => parseInt(prop))
        const piece = board[row][column]
        if (piece === '') output.push(item)
        else if (ifEnemy(rook, piece)) { output.push(item); barrierHit = true }
        else barrierHit = true
    })

    barrierHit = false

    right.forEach(item => {
        if (barrierHit) return

        const [row, column] = item.split('').map(prop => parseInt(prop))
        const piece = board[row][column]
        if (piece === '') output.push(item)
        else if (ifEnemy(rook, piece)) { output.push(item); barrierHit = true }
        else barrierHit = true
    })
    //* vertical
    const posCol = [
        `0${column}`,
        `1${column}`,
        `2${column}`,
        `3${column}`,
        `4${column}`,
        `5${column}`,
        `6${column}`,
        `7${column}`
    ]
    const up = posCol.slice().splice(column+2)
    const down = posCol.slice().splice(0, column+1).reverse()
    console.log(up, down)
    barrierHit = false

    up.forEach(item => {
        if (barrierHit) return

        const [row, column] = item.split('').map(prop => parseInt(prop))
        const piece = board[row][column]
        if (piece === '') output.push(item)
        else if (ifEnemy(rook, piece)) { output.push(item); barrierHit = true }
        else barrierHit = true
    })

    barrierHit = false

    down.forEach(item => {
        if (barrierHit) return

        const [row, column] = item.split('').map(prop => parseInt(prop))
        const piece = board[row][column]
        if (piece === '') output.push(item)
        else if (ifEnemy(rook, piece)) { output.push(item); barrierHit = true }
        else barrierHit = true
    })

    output = output.map(item => {
        const [row, column] = item.split('').map(prop => parseInt(prop))
        const piece = board[row][column]
        if (ifEnemy(rook, piece)) return item

        else return ""
    })
    
    return output
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
                ifEnemy(piece, board[row + 1][column + 1])
            ) output.push(`${row + 1}${column + 1}`)
        if(column>1) 
            if (
                board[row + 1][column - 1] != '' &&
                ifEnemy(piece, board[row + 1][column - 1])
            ) output.push(`${row + 1}${column - 1}`)
    }

    return output
}

function getPieceMoves(row: number, column: number, board: string[][]): string[] {
    let output: string[] = []

    const piece = board[row][column]
    const pieceType = getType(piece)
    switch (pieceType) {
        case 1: { console.log("Pawn"); output = [...output, ...getPawnMoves(row, column, board)]; break; }
        case 2: { console.log("Rook"); output = [...output, ...getRookMoves(row, column, board)]; break; }
        default: break;
    }

    return output
}

export default {
    getPieceMoves
}