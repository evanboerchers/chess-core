import { Board, Move, PieceColour, PieceType, Position } from "./chess.types";

export type MovementStrategy = (coordinate: Position, board: Board) => Move[];

export const mergeMovementStrategies = (
  strategies: MovementStrategy[],
): MovementStrategy => {
  return (coordinate, board) => {
    const moves: Position[] = [];
    const captures: Position[] = [];
    const castles: Position[] = [];

    strategies.forEach((strategy) => {
      const {
        moves: newMoves,
        captures: newCaptures,
        castles: newCastles,
      } = strategy(coordinate, board);
      moves.push(...newMoves);
      captures.push(...newCaptures);
      castles.push(...newCastles);
    });
    return { moves, captures, castles };
  };
};

export const diagonalMovement: MovementStrategy = (
  coordinate: Position,
  board: Board,
) => {
  const { row, col } = coordinate;
  const piece = board[row][col];
  const moves: Move[] = [];

  if (!piece) {
    return [];
  }

  const directions = [
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: 1 },
    { row: -1, col: -1 },
  ];

  directions.forEach((direction) => {
    let newRow = row + direction.row;
    let newCol = col + direction.col;

    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const target = board[newRow][newCol];
      if (target) {
        if (target.colour !== piece.colour) {
          moves.push({
            colour: piece.colour,
            from: { row: row, col: col },
            to: { row: newRow, col: newCol },
            capturedPiece: { colour: target.colour, type: target.colour },
          });
        }
        break;
      }
      moves.push({ row: newRow, col: newCol });
      newRow += direction.row;
      newCol += direction.col;
    }
  });

  return moves;
};

export const linearMovement: MovementStrategy = (
  coordinate: Position,
  board: Board,
) => {
  const { row, col } = coordinate;
  const moves: Position[] = [];
  const captures: Position[] = [];

  const directions = [
    { row: 1, col: 0 },
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: -1 },
  ];

  directions.forEach((direction) => {
    let newRow = row + direction.row;
    let newCol = col + direction.col;

    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if (board[newRow][newCol].piece) {
        if (
          board[newRow][newCol].piece?.colour !== board[row][col].piece?.colour
        ) {
          captures.push({ row: newRow, col: newCol });
        }
        break;
      }
      moves.push({ row: newRow, col: newCol });
      newRow += direction.row;
      newCol += direction.col;
    }
  });

  return { moves, captures, castles: [] };
};

export const knightMovement: MovementStrategy = (
  coordinage: Position,
  board: Board,
) => {
  const { row, col } = coordinage;
  const moves: Position[] = [];
  const captures: Position[] = [];

  const directions = [
    { row: 2, col: 1 },
    { row: 2, col: -1 },
    { row: -2, col: 1 },
    { row: -2, col: -1 },
    { row: 1, col: 2 },
    { row: 1, col: -2 },
    { row: -1, col: 2 },
    { row: -1, col: -2 },
  ];

  directions.forEach((direction) => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;

    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if (board[newRow][newCol].piece) {
        if (
          board[newRow][newCol].piece?.colour !== board[row][col].piece?.colour
        ) {
          captures.push({ row: newRow, col: newCol });
        }
      } else {
        moves.push({ row: newRow, col: newCol });
      }
    }
  });

  return { moves, captures, castles: [] };
};

export const pawnMovement: MovementStrategy = (
  coordinate: Position,
  board: Board,
) => {
  const { row, col } = coordinate;
  const piece = board[row][col].piece;
  const moves: Position[] = [];
  const captures: Position[] = [];

  console.log(coordinate);
  const direction = piece?.colour === PieceColour.White ? -1 : 1;

  let newRow = row + direction;
  if (newRow >= 0 && newRow < 8 && !board[newRow][col].piece) {
    moves.push({ row: newRow, col });
  }

  if (
    (row === 6 && piece?.colour === PieceColour.White) ||
    (row === 1 && piece?.colour === PieceColour.Black)
  ) {
    newRow += direction;
    if (newRow >= 0 && newRow < 8 && !board[newRow][col].piece) {
      moves.push({ row: newRow, col });
    }
  }

  return { moves, captures, castles: [] };
};

export const pawnCapture: MovementStrategy = (
  coordinate: Position,
  board: Board,
) => {
  const { row, col } = coordinate;
  const moves: Position[] = [];
  const captures: Position[] = [];

  const direction =
    board[row][col].piece?.colour === PieceColour.White ? -1 : 1;

  const directions = [
    { row: direction, col: 1 },
    { row: direction, col: -1 },
  ];

  directions.forEach((direction) => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;

    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if (
        board[newRow][newCol].piece &&
        board[newRow][newCol].piece?.colour !== board[row][col].piece?.colour
      ) {
        captures.push({ row: newRow, col: newCol });
      }
    }
  });

  return { moves, captures, castles: [] };
};

export const kingMovement: MovementStrategy = (
  coordingate: Position,
  board: Board,
) => {
  const { row, col } = coordingate;
  const moves: Position[] = [];
  const captures: Position[] = [];

  const directions = [
    { row: 1, col: 0 },
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: -1 },
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: 1 },
    { row: -1, col: -1 },
  ];

  directions.forEach((direction) => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;

    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if (board[newRow][newCol].piece) {
        if (
          board[newRow][newCol].piece?.colour !== board[row][col].piece?.colour
        ) {
          captures.push({ row: newRow, col: newCol });
        }
      } else {
        moves.push({ row: newRow, col: newCol });
      }
    }
  });
  return { moves, captures, castles: [] };
};

export const kingCastle: MovementStrategy = (
  coordinate: Position,
  board: Board,
) => {
  const { row, col } = coordinate;
  const moves: Position[] = [];
  const captures: Position[] = [];
  const castles: Position[] = [];

  if (board[row][col].piece?.hasMoved) {
    return { moves, captures, castles };
  }

  const direction =
    board[row][col].piece?.colour === PieceColour.White ? 1 : -1;

  const kingSideCastle = board[row][7].piece;
  const queenSideCastle = board[row][0].piece;

  if (
    kingSideCastle &&
    !kingSideCastle.hasMoved &&
    !board[row][5].piece &&
    !board[row][6].piece
  ) {
    castles.push({ row, col: 6 });
  }

  if (
    queenSideCastle &&
    !queenSideCastle.hasMoved &&
    !board[row][1].piece &&
    !board[row][2].piece &&
    !board[row][3].piece
  ) {
    castles.push({ row, col: 2 });
  }

  return { moves, captures, castles };
};

export const movementStrategyMap: MovementStrategyMap = {
  [PieceType.Pawn]: mergeMovementStrategies([pawnMovement, pawnCapture]),
  [PieceType.Rook]: linearMovement,
  [PieceType.Knight]: knightMovement,
  [PieceType.Bishop]: diagonalMovement,
  [PieceType.Wizard]: mergeMovementStrategies([kingMovement, kingMovement]),
  [PieceType.Queen]: mergeMovementStrategies([
    diagonalMovement,
    linearMovement,
  ]),
};
