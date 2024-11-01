import { BoardSquare, GameState, Move, Piece, PieceColour, Position } from "./chess.types"
import { attackZoneStrategyMap, movementStrategyMap } from "./movement"

export const getBoardSquare = (gameState: GameState, position: Position): BoardSquare => {
    return gameState.board[position.row][position.row]
}

export const findPiece = (gameState: GameState, piece: Piece): Position[] => {
    const positions: Position[] = []
    return positions
}


export const getAttackZones = (gameState: GameState, colour: PieceColour): Position[] => {
    const positions: Position[] = [];
    gameState.board.forEach((row, i) => {
        row.forEach((piece, j) => {
            if (piece && piece.colour == colour) {
                positions.concat(getAttackZone(gameState, {row: i, col: j}));
            }
        })
    })
    return positions
}

export const getPotentialMoves = (gameState: GameState, position: Position): Move[] => {
    const piece = getBoardSquare(gameState, position)
    if (!piece) return [];
    return movementStrategyMap[piece.type](gameState, position)    
}

export const getAttackZone = (gameState: GameState, position: Position): Position[] => {
    const piece = getBoardSquare(gameState, position)
    if (!piece) return [];
    return attackZoneStrategyMap[piece.type](gameState, position)    
}

export const isKingInCheck = (gameState: GameState, colour: PieceColour) => {

}


export const isMoveLegal = (gameStaet: GameState, move: Move) => {
  
} 
  