export type Board = (Piece | null)[][];

export enum Colour {
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
  colour: Colour;
}

export interface Position {
  row: number;
  col: number;
}

export interface Move {
  colour: Colour;
  to: Position;
  from: Position;
  capturedPiece?: Piece;
  promotionType?: Piece;
}
