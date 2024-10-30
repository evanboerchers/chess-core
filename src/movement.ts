import {
  Board,
  GameState,
  Move,
  PieceColour,
  PieceType,
  Position,
} from "./chess.types";

export type MovementStrategy = (position: Position, board: Board) => Move[];

export type MovementStrategyMap = {
  [key in PieceType]: MovementStrategy;
};

export const mergeMovementStrategies = (
  strategies: MovementStrategy[],
): MovementStrategy => {
  return (position, board) => {
    const moves: Move[] = [];

    strategies.forEach((strategy) => {
      const newMoves = strategy(position, board);
      moves.push(...newMoves);
    });
    return moves;
  };
};

export const diagonalMovement: MovementStrategy = (
  position: Position,
  board: Board,
) => {
  const { row, col } = position;
  const current = board[row][col];
  const moves: Move[] = [];

  if (!current) {
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
        if (target.colour !== current.colour) {
          moves.push({
            piece: current,
            from: { row: row, col: col },
            to: { row: newRow, col: newCol },
            capturedPiece: target,
          });
        }
        break;
      }
      moves.push({
        piece: current,
        from: { row: row, col: col },
        to: { row: newRow, col: newCol },
      });
      newRow += direction.row;
      newCol += direction.col;
    }
  });

  return moves;
};

export const linearMovement: MovementStrategy = (
  position: Position,
  board: Board,
) => {
  const { row, col } = position;
  const current = board[row][col];
  const moves: Move[] = [];
  const directions = [
    { row: 1, col: 0 },
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: -1 },
  ];

  if (!current) {
    return [];
  }

  directions.forEach((direction) => {
    let newRow = row + direction.row;
    let newCol = col + direction.col;

    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      const target = board[newRow][newCol];
      if (target) {
        if (target.colour !== current.colour) {
          moves.push({
            piece: current,
            from: { row: row, col: col },
            to: { row: newRow, col: newCol },
            capturedPiece: target,
          });
        }
        break;
      }
      moves.push({
        piece: current,
        from: { row: row, col: col },
        to: { row: newRow, col: newCol },
      });
      newRow += direction.row;
      newCol += direction.col;
    }
  });

  return moves;
};

export const knightMovement: MovementStrategy = (
  position: Position,
  board: Board,
) => {
  const { row, col } = position;
  const moves: Move[] = [];
  const current = board[row][col];

  if (!current) return [];

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
      const target = board[newRow][newCol];
      if (target) {
        if (target.colour !== current.colour) {
          moves.push({
            piece: current,
            from: { row: row, col: col },
            to: { row: newRow, col: newCol },
            capturedPiece: target,
          });
        }
      } else {
        moves.push({
          piece: current,
          from: { row: row, col: col },
          to: { row: newRow, col: newCol },
        });
      }
    }
  });

  return moves;
};

export const pawnMovement: MovementStrategy = (
  position: Position,
  board: Board,
) => {
  const { row, col } = position;
  const current = board[row][col];
  const moves: Move[] = [];

  if (!current) return [];

  const direction = current.colour === PieceColour.WHITE ? -1 : 1;

  let newRow = row + direction;
  const target = board[newRow][col];
  if (newRow >= 0 && newRow < 8 && !target) {
    moves.push({
      piece: current,
      from: { row: row, col: col },
      to: { row: newRow, col: col },
    });
  }

  if (
    (row === 6 && current.colour === PieceColour.WHITE) ||
    (row === 1 && current.colour === PieceColour.BLACK)
  ) {
    newRow += direction;
    if (newRow >= 0 && newRow < 8 && !target) {
      moves.push({
        piece: current,
        from: { row: row, col: col },
        to: { row: newRow, col: col },
      });
    }
  }

  return moves;
};

export const pawnCapture: MovementStrategy = (
  position: Position,
  board: Board,
) => {
  const { row, col } = position;
  const moves: Move[] = [];
  const current = board[row][col];

  if (!current) return [];

  const direction = current.colour === PieceColour.WHITE ? -1 : 1;

  const directions = [
    { row: direction, col: 1 },
    { row: direction, col: -1 },
  ];

  directions.forEach((direction) => {
    const newRow = row + direction.row;
    const newCol = col + direction.col;
    const target = board[newRow][newCol];
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if (target && target.colour !== target.colour) {
        moves.push({
          piece: current,
          from: { row: row, col: col },
          to: { row: newRow, col: newCol },
          capturedPiece: target,
        });
      }
    }
  });

  return moves;
};

export const kingMovement: MovementStrategy = (
  coordingate: Position,
  board: Board,
) => {
  const { row, col } = coordingate;
  const current = board[row][col];
  const moves: Move[] = [];

  if (!current) return [];

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
    const target = board[newRow][newCol];
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      if (target) {
        if (target.colour !== target.colour) {
          moves.push({
            piece: current,
            from: { row: row, col: col },
            to: { row: newRow, col: newCol },
            capturedPiece: target,
          });
        }
      } else {
        moves.push({
          piece: current,
          from: { row: row, col: col },
          to: { row: newRow, col: newCol },
        });
      }
    }
  });
  return moves;
};

export const kingHasMoved = (
  gameState: GameState,
  colour: PieceColour,
): boolean => {
  gameState.history.forEach((move) => {
    if (move.piece.type === PieceType.KING && move.piece.colour === colour) {
      return true;
    }
  });
  return false;
};

export const kingCastle: MovementStrategy = (
  position: Position,
  board: Board,
) => {
  const { row, col } = position;
  const current = board[row][col];
  const moves: Move[] = [];
  const kingHasMoved = false;
  const kingSideRookHasMoved = false;
  const queenSideRookHasMoved = false;

  if (!current) return [];

  const direction = current.colour === PieceColour.WHITE ? 1 : -1;

  const kingSideCastle = board[row][7];
  const queenSideCastle = board[row][0];

  if (
    kingSideCastle &&
    !kingHasMoved &&
    !kingSideRookHasMoved &&
    !board[row][5] &&
    !board[row][6]
  ) {
    moves.push({
      piece: current,
      from: position,
      to: { row, col: 6 },
      castle: true,
    });
  }

  if (
    queenSideCastle &&
    !kingHasMoved &&
    !queenSideRookHasMoved &&
    !board[row][1] &&
    !board[row][2] &&
    !board[row][3]
  ) {
    moves.push({
      piece: current,
      from: position,
      to: { row, col: 2 },
      castle: true,
    });
  }

  return moves;
};

export const movementStrategyMap: MovementStrategyMap = {
  [PieceType.PAWN]: mergeMovementStrategies([pawnMovement, pawnCapture]),
  [PieceType.ROOK]: linearMovement,
  [PieceType.KNIGHT]: knightMovement,
  [PieceType.BISHOP]: diagonalMovement,
  [PieceType.KING]: mergeMovementStrategies([kingMovement, kingMovement]),
  [PieceType.QUEEN]: mergeMovementStrategies([
    diagonalMovement,
    linearMovement,
  ]),
};
