import { Board, Colour, Move } from "./chess.types";

class Chess {
  board: Board;
  turn: Colour;
  history: Move[];
}
