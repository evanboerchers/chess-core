import { BoardSquare, GameState, Move, Piece, PieceColour, Position } from "./chess.types"
import { movementStrategyMap } from "./movement"

export const getBoardSquare = (gameState: GameState, position: Position): BoardSquare => {
    return gameState.board[position.row][position.row]
}

export const findPiece = (gameState: GameState, piece: Piece): Position[] => {
    const positions: Position[] = []
    return positions
}

export const getAllPossibleMoves = (gameState: GameState, colour: PieceColour): Move[] => {
    const moves: Move[] = [];
    return moves
}


export const getPotentialMoves = (gameState: GameState, position: Position): Move[] => {
    const piece = getBoardSquare(gameState, position)
    if (!piece) return [];
    return movementStrategyMap[piece.type](gameState, position)    
}


export const isKingInCheck = (gameState: GameState, colour: PieceColour) => {

}


export const isMoveLegal = (gameStaet: GameState, move: Move) => {
  
} 
  