function isFirstMovePawn(player, turnRow) {
    if(player=="W" && turnRow==1){
        return true
    }
    if(player=="B" && turnRow==6){
        return true
    }
}

function getPieceMoves(pieceType, turnRow, turnCol, board, player){
    if(pieceType=="Pawn"){
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
    if(pieceType=="Rook"){
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
    if(pieceType=="Knight"){
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

        return uniqueSpots;
    }
}

module.exports = {
    getPieceMoves
}