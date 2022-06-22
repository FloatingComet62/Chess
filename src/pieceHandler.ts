import { getBishopMoves } from "./pieces/Bishop"
import { getKnightMoves } from "./pieces/Knight"
import { getPawnMoves } from "./pieces/Pawn"
import { getRookMoves } from "./pieces/Rook"
import { getType } from "./utils"

function getPieceMoves(row: number, column: number, board: string[][]): string[] {
    let output: string[] = []

    const piece = board[row][column]
    const pieceType = getType(piece)
    switch (pieceType) {
        case 1: { console.log("Pawn"); output = [...output, ...getPawnMoves(row, column, board)]; break; }
        case 2: { console.log("Rook"); output = [...output, ...getRookMoves(row, column, board)]; break; }
        case 3: { console.log("Knight"); output = [...output, ...getKnightMoves(row, column, board)]; break; }
        case 4: { console.log("Bishop"); output = [...output, ...getBishopMoves(row, column, board)]; break; }
        default: break;
    }

    return output
}

export default {
    getPieceMoves
}