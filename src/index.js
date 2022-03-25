const cli = require('./cli.js');
const pieceHandler = require('./pieceHandler.js');

async function run(){
    board = [
        ["W_Rook", "W_Knight", "W_Bishop", "W_Queen", "W_King", "W_Bishop", "W_Knight", "W_Rook"],
        ["W_Pawn", "W_Pawn", "W_Pawn", "W_Pawn", "W_Pawn", "W_Pawn", "W_Pawn", "W_Pawn"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["B_Pawn", "B_Pawn", "B_Pawn", "B_Pawn", "B_Pawn", "B_Pawn", "B_Pawn", "B_Pawn"],
        ["B_Rook", "B_Knight", "B_Bishop", "B_Queen", "B_King", "B_Bishop", "B_Knight", "B_Rook"]
    ]

    let player = "W";
    const syntaxMessage = `[Syntax: Row:Column Eg. "03" ]`;
    const answered = false;
    console.clear();
    console.table(board);
    while (!answered){
        const turn = await cli.NewCommandInput(`Which piece do you want to move?\n${syntaxMessage}`);
        const regexTest = turn.match(/[0-9][0-9]/);
        let value = "";
        if(regexTest){
            value = regexTest[0];
        }else{
            console.log("Invalid input");
            break;
        }
        if(!value){
            console.log("Invalid syntax");
            break;
        }
        const turnRow = parseInt(value[0]);
        const turnCol = parseInt(value[1]);
        if(board[turnRow][turnCol] === ""){
            console.log("Invalid move");
            break;
        }
        const piece = board[turnRow][turnCol].split('_');
        const pieceColor = piece[0];
        if(pieceColor !== player){
            console.log("Invalid move");
            break;
        }
        const pieceType = piece[1];
        const pieceMoves = pieceHandler.getPieceMoves(pieceType, turnRow, turnCol, board, player);
        const move = await cli.askWtihOptions(`Where do you want to move?`, pieceMoves);
    }
}

run();