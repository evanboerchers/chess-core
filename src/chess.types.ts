export type BoardSquare = Piece | null;

export type Board = BoardSquare[][];

export enum PieceColour {
  WHITE = "white",
  BLACK = "black",
}

export enum PieceType {
  KING = "king",
  QUEEN = "queen",
  ROOK = "rook",
  BISHOP = "bishop",
  KNIGHT = "knight",
  PAWN = "pawn",
}

export interface Piece {
  colour: PieceColour;
}

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  colour: PieceColour;
  to: Position;
  from: Position;
  capturedPiece?: Piece;
  promotionType?: Piece;
}

export interface GameState {
  board: Board;
  currentTurn: PieceColour;
  history: Move[];
}
