function isFirstMovePawn(player, turnRow) {
    if(player=="W" && turnRow==1){
        return true
    }
    if(player=="B" && turnRow==6){
        return true
    }
}
function Pawn(player, turnRow, turnCol){
    if(isFirstMovePawn(player, turnRow)){
        if(player=="B"){
            return [`${turnRow-1}${turnCol}`, `${turnRow-2}${turnCol}`]
        }else{
            return [`${turnRow+1}${turnCol}`, `${turnRow+2}${turnCol}`]
        }
    }else{
        return [`${turnRow-1}${turnCol}`]
    }
}
function Rook(turnRow, turnCol, board){
    col1 = [];
    for(let i=turnRow+1; i<8; i++){
        if(board[i][turnCol]==""){
            col1.push(`${i}${turnCol}`);
        }else{
            col1.push(`${i}${turnCol}`);
            break;
        }
    }
    col2 = [];
    for(let i=turnRow-1; i>=0; i--){
        if(board[i][turnCol]==""){
            col2.push(`${i}${turnCol}`);
        }else{
            col2.push(`${i}${turnCol}`);
            break;
        }
    }
    row1 = [];
    for(let i=turnCol+1; i<8; i++){
        if(board[turnRow][i]==""){
            row1.push(`${turnRow}${i}`);
        }else{
            row1.push(`${turnRow}${i}`);
            break;
        }
    }
    row2 = [];
    for(let i=turnCol-1; i>=0; i--){
        if(board[turnRow][i]==""){
            row2.push(`${turnRow}${i}`);
        }else{
            row2.push(`${turnRow}${i}`);
            break;
        }
    }
    moveableSpots = [...row1, ...row2, ...col1, ...col2];

    return moveableSpots;
}
function Knight(turnRow, turnCol){
    possibleSpots = [
        [turnRow+2, turnCol+1], [turnRow+2, turnCol-1], [turnRow-2, turnCol+1], [turnRow-2, turnCol-1],
        [turnRow+1, turnCol+2], [turnRow+1, turnCol-2], [turnRow-1, turnCol+2], [turnRow-1, turnCol-2]
    ];

    existingSpots = [];
    for(possibleSpot in possibleSpots){
        const row = possibleSpots[possibleSpot][0];
        const col = possibleSpots[possibleSpot][1];

        const regexTest = `${row}${col}`.match(/[0-7][0-7]/);
        if(regexTest){
            existingSpots.push(regexTest[0]);
        }
    }

    const uniqueSpots = existingSpots.filter((v, i, a) => a.indexOf(v) === i);

    return uniqueSpots
}
function Bishop(turnRow, turnCol, board){
    moves = [];
    for(var i=0;i<8;i++){
        if(turnCol-i<0){
            break;
        }
        if(turnRow-i<0){
            break;
        }
        if(board[turnRow-i][turnCol-i]!="" && i!=0){
            moves.push(`${turnRow-i}${turnCol-i}`)
            break;
        }
        moves.push(`${turnRow-i}${turnCol-i}`)
    }
    for(var i=0;i<8;i++){
        if(turnCol-i<0){
            break;
        }
        if(turnRow-i<0){
            break;
        }
        if(board[turnRow+i][turnCol-i]!="" && i!=0){
            moves.push(`${turnRow+i}${turnCol-i}`)
            break;
        }
        moves.push(`${turnRow+i}${turnCol-i}`)
    }
    for(var i=0;i<8;i++){
        if(turnCol-i<0){
            break;
        }
        if(turnRow-i<0){
            break;
        }
        if(board[turnRow-i][turnCol+i]!="" && i!=0){
            moves.push(`${turnRow-i}${turnCol+i}`)
            break;
        }
        moves.push(`${turnRow-i}${turnCol+i}`)
    }
    for(var i=0;i<8;i++){
        if(turnCol-i<0){
            break;
        }
        if(turnRow-i<0){
            break;
        }
        if(board[turnRow+i][turnCol+i]!="" && i!=0){
            moves.push(`${turnRow+i}${turnCol+i}`)
            break;
        }
        moves.push(`${turnRow+i}${turnCol+i}`)
    }
    moves.forEach((value, index) => {
        if(value==`${turnRow}${turnCol}`){
            moves.splice(index, 1);
        }
    })
    
    return moves;
}
function King(turnRow, turnCol){
    output = [
        `${turnRow+1}${turnCol}`, `${turnRow+1}${turnCol+1}`, `${turnRow+1}${turnCol-1}`,
        `${turnRow-1}${turnCol}`, `${turnRow-1}${turnCol+1}`, `${turnRow-1}${turnCol-1}`,
        `${turnRow}${turnCol+1}`, `${turnRow}${turnCol-1}`
    ];
    itemsToRemove = [];
    output.forEach((value, index)=>{
        if(parseInt(value) < 0){
            itemsToRemove.push(index);
        }
    });
    itemsToRemove.sort().reverse().forEach((value)=>{
        output.splice(value, 1);
    });

    return output;
}


function getPieceMoves(pieceType, turnRow, turnCol, board, player){
    if(pieceType=="Pawn"){
        return Pawn(player, turnRow, turnCol);
    }
    if(pieceType=="Rook"){
        return Rook(turnRow, turnCol, board);
    }
    if(pieceType=="Knight"){
        return Knight(turnRow, turnCol);
    }
    if(pieceType=="Bishop"){
        return Bishop(turnRow, turnCol, board);
    }
    if(pieceType=="King"){
        return King(turnRow, turnCol);
    }
}

module.exports = {
    getPieceMoves
}