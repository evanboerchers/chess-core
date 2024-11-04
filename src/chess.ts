import { BoardSquare, GameState, Move, Piece, PieceColour, PieceType, Position } from "./chess.types"
import { attackZoneStrategyMap, movementStrategyMap } from "./movement"

export const copyGameState = (gameState: GameState): GameState => {
    return {
      ...gameState,
      board: gameState.board.map(row => row.slice()), 
      castlePrivileges: {                             
        [PieceColour.WHITE]: { ...gameState.castlePrivileges[PieceColour.WHITE] },
        [PieceColour.BLACK]: { ...gameState.castlePrivileges[PieceColour.BLACK] }
      },
      history: [...gameState.history]                 
    };
  };

export const getBoardSquare = (gameState: GameState, position: Position): BoardSquare => {
    return gameState.board[position.row][position.row]
}

export const findPiece = (gameState: GameState, piece: Piece): Position[] => {
    const positions: Position[] = []
    gameState.board.forEach((row,i) => {
        row.forEach((piece, j) => {
            if (piece) {
                
            }
        })
    })
    return positions
}


export const getAttackZones = (gameState: GameState, colour: PieceColour): Position[] => {
    const positions: Position[] = [];
    gameState.board.forEach((row, i) => {
        row.forEach((piece, j) => {
            if (piece && piece.colour === colour) {
                positions.concat(getAttackZone(gameState, {row: i, col: j}));
            }
        })
    })
    return positions
}

export const getPotentialLegalMoves = (gameState: GameState, position: Position): Move[] => {
    const piece = getBoardSquare(gameState, position)
    if (!piece) return [];
    const moves =  movementStrategyMap[piece.type](gameState, position)    
    return moves.filter(move => isMoveLegal(gameState, move))
}

export const getAllPotentialLegalMoves = (gameState: GameState, colour: PieceColour): Move[] => {
    const moves: Move[] = []
    gameState.board.forEach((row, i) => {
        row.forEach((piece, j) => {
            if (piece && piece.colour === colour){
                moves.concat(getPotentialLegalMoves(gameState, {row: i, col: j}))
            }
        })
    })
    return moves;
}

export const getAttackZone = (gameState: GameState, position: Position): Position[] => {
    const piece = getBoardSquare(gameState, position)
    if (!piece) return [];
    return attackZoneStrategyMap[piece.type](gameState, position)    
}

export const isKingInCheck = (gameState: GameState, colour: PieceColour): boolean => {
    const kingPosition = findPiece(gameState, { type: PieceType.KING, colour})[0]
    const attackPositions = getAttackZones(gameState, colour)
    return attackPositions.some((position) => (position.row === kingPosition.row && position.col === kingPosition.col))
}

export const isKingInCheckmate = (gameState: GameState, colour: PieceColour): boolean => {
    if (!isKingInCheck(gameState, colour)) {
        return false
    }
    const moves = getAllPotentialLegalMoves(gameState, colour)
    if (moves.length > 0) {
        return false
    }
    return true
}

export const makeMove = (gameState: GameState, move: Move): GameState => {
    if(!isMoveLegal(gameState, move)){
        return gameState;
    }
    const piece =  getBoardSquare(gameState, move.from);
    if(!piece) {
        return gameState
    }
    if (move.castle) { 
        return castle(gameState, move)
    }
    gameState.board[move.to.row][move.to.col] = move.promotionType || piece 
    return gameState;
}

export const castle = (gameState: GameState, move: Move): GameState => {
    if (!move.castle) {
        throw Error("Not a castle move")
    }
    return gameState;  
}

export const isMoveLegal = (gameState: GameState, move: Move): boolean => {
  const futureGameState = makeMove(copyGameState(gameState), move);
  return !isKingInCheck(futureGameState, move.piece.colour);
} 
  