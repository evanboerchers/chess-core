import { Position, Board, Move, PieceType, GameState } from "./chess.types";

export type MovementStrategy = (gameState: GameState, position: Position ) => Move[];

export type MovementStrategyMap = {
  [key in PieceType]: MovementStrategy;
};