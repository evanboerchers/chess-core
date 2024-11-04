import { isKingInCheck, isKingInCheckmate, makeMove } from "./chess";
import { GameState, Move, PieceColour } from "./chess.types";
import { initial } from "./data/gameState";

export default class ChessGame {
    public gameState: GameState 

    constructor(initalState: GameState = initial ) {
        this.gameState = initalState  
    }

    public getPotentialMoves() {
        
    }

    public makeMove(move: Move): GameState {
        this.gameState = makeMove(this.gameState, move);
        return this.gameState
    } 

    public isKingInCheck(colour: PieceColour): boolean {
        return isKingInCheck(this.gameState, colour)
    }

    public isKingInCheckmate(colour: PieceColour): boolean {
        return isKingInCheckmate(this.gameState, colour)
    }
}