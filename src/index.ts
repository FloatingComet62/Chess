import cli from './cli'
import pieceHandler from './pieceHandler.js';

function format(board: string[][]) {
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

async function run() {
    let board = [
        ["", "", "", "06", "05", "04", "03", "02"],
        ["01", "01", "01", "01", "01", "01", "01", "01"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "02", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["11", "11", "11", "11", "11", "11", "11", "11"],
        ["12", "13", "14", "15", "16", "14", "13", "12"]
    ]

    // let player = "0"
    const syntaxMessage = `[Syntax: Row:Column Eg. "03" ]`
    let answered = false
    console.clear()
    console.table(format(board))
    while (!answered) {
        const turn = await cli.NewCommandInput(`Which piece do you want to move?\n${syntaxMessage}`)
        const regexTest = turn.match(/[0-9][0-9]/)
        let value = ""
        if (regexTest) value = regexTest[0]
        else { console.log("Invalid input"); continue; }
        if (!value) { console.log("Invalid syntax"); continue; }

        const [row, column] = value.split('').map(item => parseInt(item))
        const moves = pieceHandler.getPieceMoves(row, column, board)
        const response = await cli.askWtihOptions('Choose the position to move the piece', [...moves, "Choose Another Piece"])

        if (response === "Choose Anoher Piece") continue
        console.log(response)
    }
}

run();