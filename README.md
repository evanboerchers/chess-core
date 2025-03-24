# chess-core

A TypeScript library for chess game logic that provides a clean, type-safe interface for managing chess games.

## Features

- Complete chess rules implementation
- Move validation
- Check and checkmate detection
- Game state management
- Move history tracking
- Support for special moves (castling, promotion)
- Written in TypeScript with full type safety

## Installation

```bash
npm install chess-core
```

## Usage

### Basic Example

```typescript
import { ChessGame, PieceColour, Position } from 'chess-core';

// Create a new chess game with default initial state
const game = new ChessGame();

// Get potential moves for a piece at position e2 (pawn)
const position: Position = { row: 6, col: 4 }; // e2 in zero-based indexing
const moves = game.potentialMoves(position);

// Make a move
if (moves.length > 0) {
  const newGameState = game.makeMove(moves[0]);
  console.log(`Current turn: ${game.currentTurn}`);
}

// Check if a king is in check
const isWhiteInCheck = game.isKingInCheck(PieceColour.WHITE);
console.log(`White king in check: ${isWhiteInCheck}`);

// Check if a king is in checkmate
const isBlackInCheckmate = game.isKingInCheckmate(PieceColour.BLACK);
console.log(`Black king in checkmate: ${isBlackInCheckmate}`);

// Get the current game outcome (null if the game is ongoing)
const outcome = game.gameOutcome();
if (outcome) {
  console.log(`Game over! Result: ${outcome}`);
}
```

## API Reference

### `ChessGame` Class

The main class for managing a chess game state.

#### Constructor

```typescript
constructor(initialState?: GameState)
```

Creates a new chess game with either the default initial state or a custom state.

#### Properties

- `gameState: GameState` - The current state of the game
- `currentTurn: PieceColour` - The color of the player whose turn it is
- `board: Board` - The current board state
- `moveHistory: Move[]` - The history of moves made in the game

#### Methods

- `potentialMoves(position: Position): Move[]` - Returns all legal moves for the piece at the given position
- `makeMove(move: Move): GameState` - Makes a move and returns the new game state
- `isKingInCheck(colour: PieceColour): boolean` - Checks if the king of the given color is in check
- `isKingInCheckmate(colour: PieceColour): boolean` - Checks if the king of the given color is in checkmate
- `gameOutcome(): GameOutcome | null` - Returns the outcome of the game or null if it's ongoing
- `getPosition(position: Position): BoardSquare` - Returns the piece or null at the given position

### Types

#### `PieceColour`

```typescript
enum PieceColour {
  WHITE = "white",
  BLACK = "black",
}
```

#### `PieceType`

```typescript
enum PieceType {
  KING = "king",
  QUEEN = "queen",
  ROOK = "rook",
  BISHOP = "bishop",
  KNIGHT = "knight",
  PAWN = "pawn",
}
```

#### `Piece`

```typescript
interface Piece {
  colour: PieceColour;
  type: PieceType;
}
```

#### `Position`

```typescript
interface Position {
  row: number;
  col: number;
}
```

#### `Move`

```typescript
interface Move {
  piece: Piece;
  from: Position;
  to: Position;
  capturedPiece?: Piece;
  promotionType?: Piece;
  castle?: boolean;
}
```

#### `GameOutcome`

```typescript
enum GameOutcome {
  WHITE = PieceColour.WHITE,
  BLACK = PieceColour.BLACK,
  DRAW = "draw"
}
```

## GameState and Board Representation

### `GameState` Interface

The `GameState` object is the core data structure that represents the entire state of a chess game:

```typescript
interface GameState {
  board: Board;                // The current board configuration
  currentTurn: PieceColour;    // Whose turn it is (WHITE or BLACK)
  castlePrivileges: {          // Tracking if castling is still possible
    [PieceColour.WHITE]: ColourState
    [PieceColour.BLACK]: ColourState
  };
  moveHistory: Move[];         // History of all moves made in the game
}

interface ColourState {
  kingSide: boolean;   // Whether kingside castling is still available
  queenSide: boolean;  // Whether queenside castling is still available
}
```

### Board Representation

The chess board is represented as a 2D array of `BoardSquare` (which is either a `Piece` or `null`). The board uses zero-based indexing where:

- `row: 0, col: 0` corresponds to a8 (top-left corner in standard notation)
- `row: 7, col: 7` corresponds to h1 (bottom-right corner in standard notation)

This means:
- Rows run from 0 (top, 8th rank) to 7 (bottom, 1st rank)
- Columns run from 0 (left, a file) to 7 (right, h file)

```
    0   1   2   3   4   5   6   7  (cols)
  ┌───┬───┬───┬───┬───┬───┬───┬───┐
0 │a8 │b8 │c8 │d8 │e8 │f8 │g8 │h8 │
  ├───┼───┼───┼───┼───┼───┼───┼───┤
1 │a7 │b7 │c7 │d7 │e7 │f7 │g7 │h7 │
  ├───┼───┼───┼───┼───┼───┼───┼───┤
2 │a6 │b6 │c6 │d6 │e6 │f6 │g6 │h6 │
  ├───┼───┼───┼───┼───┼───┼───┼───┤
3 │a5 │b5 │c5 │d5 │e5 │f5 │g5 │h5 │
  ├───┼───┼───┼───┼───┼───┼───┼───┤
4 │a4 │b4 │c4 │d4 │e4 │f4 │g4 │h4 │
  ├───┼───┼───┼───┼───┼───┼───┼───┤
5 │a3 │b3 │c3 │d3 │e3 │f3 │g3 │h3 │
  ├───┼───┼───┼───┼───┼───┼───┼───┤
6 │a2 │b2 │c2 │d2 │e2 │f2 │g2 │h2 │
  ├───┼───┼───┼───┼───┼───┼───┼───┤
7 │a1 │b1 │c1 │d1 │e1 │f1 │g1 │h1 │
  └───┴───┴───┴───┴───┴───┴───┴───┘
(rows)
```

Each square on the board is represented by a `BoardSquare` which can be:
- `null` for an empty square
- A `Piece` object with `colour` and `type` properties

For example, the starting position has:
- `board[0][0]` = `{ colour: PieceColour.BLACK, type: PieceType.ROOK }` (black rook at a8)
- `board[7][4]` = `{ colour: PieceColour.WHITE, type: PieceType.KING }` (white king at e1)
- `board[3][3]` = `null` (empty square at d5)

### Converting Between Coordinate Systems

To convert between standard chess notation and the library's zero-based coordinate system:

```typescript
// Convert from chess notation (e.g., "e4") to Position
function notationToPosition(notation: string): Position {
  const file = notation.charCodeAt(0) - 'a'.charCodeAt(0); // 'a' -> 0, 'b' -> 1, etc.
  const rank = 8 - parseInt(notation[1]);                  // '8' -> 0, '7' -> 1, etc.
  return { row: rank, col: file };
}

// Convert from Position to chess notation
function positionToNotation(position: Position): string {
  const file = String.fromCharCode('a'.charCodeAt(0) + position.col);
  const rank = 8 - position.row;
  return `${file}${rank}`;
}
```

### Initial Board Setup

When a new game is created with the default initial state, the board is set up with all pieces in their standard starting positions. The `initial()` function creates a new `GameState` with:

- All pawns on the 2nd and 7th ranks
- Rooks in the corners
- Knights next to the rooks
- Bishops next to the knights
- Queens on their color (white queen on d1, black queen on d8)
- Kings on e1 (white) and e8 (black)
- White to move first
- Full castling privileges for both sides
- Empty move history

## Examples

### Creating a Custom Board Position

```typescript
import { ChessGame, GameState, PieceColour, PieceType } from 'chess-core';

// Create a custom board state
const customState: GameState = {
  board: Array(8).fill(null).map(() => Array(8).fill(null)),
  currentTurn: PieceColour.WHITE,
  castlePrivileges: {
    [PieceColour.WHITE]: { kingSide: false, queenSide: false },
    [PieceColour.BLACK]: { kingSide: false, queenSide: false }
  },
  moveHistory: []
};

// Add pieces to the board
customState.board[0][4] = { colour: PieceColour.BLACK, type: PieceType.KING };
customState.board[7][4] = { colour: PieceColour.WHITE, type: PieceType.KING };
customState.board[7][3] = { colour: PieceColour.WHITE, type: PieceType.QUEEN };

// Create a new chess game with the custom state
const game = new ChessGame(customState);
```

### Analyzing a Position

```typescript
import { ChessGame, PieceColour, Position } from 'chess-core';

const game = new ChessGame();

// Get all legal moves for the current player
const allMoves = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const position: Position = { row, col };
    const square = game.getPosition(position);
    if (square && square.colour === game.currentTurn) {
      const pieceMoves = game.potentialMoves(position);
      allMoves.push(...pieceMoves);
    }
  }
}

console.log(`Total legal moves: ${allMoves.length}`);
```

## License

MIT
