import cli from './cli'
import pieceHandler from './pieceHandler.js';
import { format } from './utils';


async function run() {
    let board = [
        ["", "", "", "06", "05", "04", "03", "02"],
        ["01", "01", "01", "01", "01", "01", "01", "01"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "02", "", "", "", "03", ""],
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