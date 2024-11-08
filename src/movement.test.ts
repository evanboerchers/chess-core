import { GameState, Move, PieceColour, PieceType, Position } from './chess.types'
import {diagonalAttackZone, diagonalMovement, kingMovement, knightAttackZone, knightMovement, linearAttackZone, linearMovement, pawnAttackZone, pawnCapture, pawnMovement} from './movement'
import { initial } from './data/gameState'

describe("movement tests", () => {
    describe("diagonal", () => {
        describe("diagonalMovement", () => {
            test("should give all moves on lines", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 3, col: 3 } },
                    { piece, from: position, to: { row: 2, col: 2 } },
                    { piece, from: position, to: { row: 1, col: 1 } },
                    { piece, from: position, to: { row: 0, col: 0 } },
                    { piece, from: position, to: { row: 5, col: 5 } },
                    { piece, from: position, to: { row: 6, col: 6 } },
                    { piece, from: position, to: { row: 7, col: 7 } },
                    { piece, from: position, to: { row: 3, col: 5 } },
                    { piece, from: position, to: { row: 2, col: 6 } },
                    { piece, from: position, to: { row: 1, col: 7 } },
                    { piece, from: position, to: { row: 5, col: 3 } },
                    { piece, from: position, to: { row: 6, col: 2 } },
                    { piece, from: position, to: { row: 7, col: 1 } }
                ] 
                const actual: Move[] = diagonalMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give piece captures on lines ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                const oppPiece = {colour: PieceColour.BLACK, type: PieceType.KNIGHT}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, oppPiece, null, null, null, oppPiece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, oppPiece, null, null, null, oppPiece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 2, col: 2 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 3 } },
                    { piece, from: position, to: { row: 5, col: 5 } },
                    { piece, from: position, to: { row: 6, col: 6 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 5 } },
                    { piece, from: position, to: { row: 2, col: 6 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 5, col: 3 } },
                    { piece, from: position, to: { row: 6, col: 2 }, capturedPiece: oppPiece }
                ] 
                const actual: Move[] = diagonalMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give moves until blocked by own pieces ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, piece, null, null, null, piece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, piece, null, null, null, piece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 3, col: 3 } },
                    { piece, from: position, to: { row: 5, col: 5 } },
                    { piece, from: position, to: { row: 3, col: 5 } },
                    { piece, from: position, to: { row: 5, col: 3 } },
                ] 
                const actual: Move[] = diagonalMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
        })
        describe("diagonalAttackZone", () => {
            test("should give all positions on lines", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 3, col: 3 },
                    { row: 2, col: 2 },
                    { row: 1, col: 1 },
                    { row: 0, col: 0 },
                    { row: 5, col: 5 },
                    { row: 6, col: 6 },
                    { row: 7, col: 7 },
                    { row: 3, col: 5 },
                    { row: 2, col: 6 },
                    { row: 1, col: 7 },
                    { row: 5, col: 3 },
                    { row: 6, col: 2 },
                    { row: 7, col: 1 }
                ] 
                const actual: Position[] = diagonalAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give position on lines up to and including captures", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                const oppPiece = {colour: PieceColour.BLACK, type: PieceType.KNIGHT}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, oppPiece, null, null, null, oppPiece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, oppPiece, null, null, null, oppPiece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 2, col: 2 },
                    { row: 3, col: 3 },
                    { row: 5, col: 5 },
                    { row: 6, col: 6 },
                    { row: 3, col: 5 },
                    { row: 2, col: 6 },
                    { row: 5, col: 3 },
                    { row: 6, col: 2 }
                ] 
                const actual: Position[] = diagonalAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give moves on lines up to and including guarded pieces ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, piece, null, null, null, piece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, piece, null, null, null, piece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 2, col: 2 },
                    { row: 3, col: 3 },
                    { row: 5, col: 5 },
                    { row: 6, col: 6 },
                    { row: 3, col: 5 },
                    { row: 2, col: 6 },
                    { row: 5, col: 3 },
                    { row: 6, col: 2 }
                ] 
                const actual: Position[] = diagonalAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
        })
    })
    describe("linear", () => {
        describe("linearMovement", () => {
            test("should give all moves on lines", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 4, col: 0 } },
                    { piece, from: position, to: { row: 4, col: 1 } },
                    { piece, from: position, to: { row: 4, col: 2 } },
                    { piece, from: position, to: { row: 4, col: 3 } },
                    { piece, from: position, to: { row: 4, col: 5 } },
                    { piece, from: position, to: { row: 4, col: 6 } },
                    { piece, from: position, to: { row: 4, col: 7 } },
                    { piece, from: position, to: { row: 0, col: 4 } },
                    { piece, from: position, to: { row: 1, col: 4 } },
                    { piece, from: position, to: { row: 2, col: 4 } },
                    { piece, from: position, to: { row: 3, col: 4 } },
                    { piece, from: position, to: { row: 5, col: 4 } },
                    { piece, from: position, to: { row: 6, col: 4 } },
                    { piece, from: position, to: { row: 7, col: 4 } },
                ] 
                const actual: Move[] = linearMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give piece captures on lines ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                const oppPiece = {colour: PieceColour.BLACK, type: PieceType.KNIGHT}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, oppPiece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, oppPiece, null, piece, null, oppPiece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, oppPiece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 4, col: 2 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 4, col: 3 } },
                    { piece, from: position, to: { row: 4, col: 5 } },
                    { piece, from: position, to: { row: 4, col: 6 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 2, col: 4 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 4 } },
                    { piece, from: position, to: { row: 5, col: 4 } },
                    { piece, from: position, to: { row: 6, col: 4 }, capturedPiece: oppPiece },
                ] 
                const actual: Move[] = linearMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give moves until blocked by own pieces ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, piece, null, piece, null, piece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 3, col: 4 } },
                    { piece, from: position, to: { row: 5, col: 4 } },
                    { piece, from: position, to: { row: 4, col: 5 } },
                    { piece, from: position, to: { row: 4, col: 3 } },
                ] 
                const actual: Move[] = linearMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
        })
        describe("linearAttackZone", () => {
            test("should give all positions on lines", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 4, col: 0 },
                    { row: 4, col: 1 },
                    { row: 4, col: 2 },
                    { row: 4, col: 3 },
                    { row: 4, col: 5 },
                    { row: 4, col: 6 },
                    { row: 4, col: 7 },
                    { row: 0, col: 4 },
                    { row: 1, col: 4 },
                    { row: 2, col: 4 },
                    { row: 3, col: 4 },
                    { row: 5, col: 4 },
                    { row: 6, col: 4 },
                    { row: 7, col: 4 },
                ] 
                const actual: Position[] = linearAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give piece position upto an including opponent pieces ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                const oppPiece = {colour: PieceColour.BLACK, type: PieceType.KNIGHT}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, oppPiece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, oppPiece, null, piece, null, oppPiece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, oppPiece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 4, col: 2 },
                    { row: 4, col: 3 },
                    { row: 4, col: 5 },
                    { row: 4, col: 6 },
                    { row: 2, col: 4 },
                    { row: 3, col: 4 },
                    { row: 5, col: 4 },
                    { row: 6, col: 4 },
                ] 
                const actual: Position[] = linearAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give moves until blocked by own pieces ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, piece, null, piece, null, piece, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 2, col: 4 },
                    { row: 3, col: 4 },
                    { row: 5, col: 4 },
                    { row: 6, col: 4 },
                    { row: 4, col: 6 },
                    { row: 4, col: 5 },
                    { row: 4, col: 3 },
                    { row: 4, col: 2 },
                ] 
                const actual: Position[] = linearAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
        })    
    })
    describe("knight", () => {
        describe("knightMovement", () => {
            test("should give all moves", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.KNIGHT}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 2, col: 3 } },
                    { piece, from: position, to: { row: 2, col: 5 } },
                    { piece, from: position, to: { row: 3, col: 2 } },
                    { piece, from: position, to: { row: 5, col: 2 } },
                    { piece, from: position, to: { row: 6, col: 3 } },
                    { piece, from: position, to: { row: 6, col: 5 } },
                    { piece, from: position, to: { row: 3, col: 6 } },
                    { piece, from: position, to: { row: 5, col: 6 } },
                ] 
                const actual: Move[] = knightMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give all piece captures ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.KNIGHT}
                const oppPiece = {colour: PieceColour.BLACK, type: PieceType.KNIGHT}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, oppPiece, null, oppPiece, null, null  ],
                    [null, null, oppPiece, null, null, null, oppPiece, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, oppPiece, null, null, null, oppPiece, null  ],
                    [null, null, null, oppPiece, null, oppPiece, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 2, col: 3 }, capturedPiece: oppPiece},
                    { piece, from: position, to: { row: 2, col: 5 }, capturedPiece: oppPiece},
                    { piece, from: position, to: { row: 3, col: 2 }, capturedPiece: oppPiece},
                    { piece, from: position, to: { row: 5, col: 2 }, capturedPiece: oppPiece},
                    { piece, from: position, to: { row: 6, col: 3 }, capturedPiece: oppPiece},
                    { piece, from: position, to: { row: 6, col: 5 }, capturedPiece: oppPiece},
                    { piece, from: position, to: { row: 3, col: 6 }, capturedPiece: oppPiece},
                    { piece, from: position, to: { row: 5, col: 6 }, capturedPiece: oppPiece},
                ] 
                const actual: Move[] = knightMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give moves until blocked by own pieces ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.KNIGHT}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, piece, null, piece, null, null  ],
                    [null, null, piece, null, null, null, piece, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, piece, null, null, null, piece, null  ],
                    [null, null, null, piece, null, piece, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                ] 
                const actual: Move[] = knightMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
        })
        describe("kinghtAttackZone", () => {
            test("should give all positions", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.BISHOP}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 2, col: 3 },
                    { row: 2, col: 5 },
                    { row: 3, col: 2 },
                    { row: 5, col: 2 },
                    { row: 6, col: 3 },
                    { row: 6, col: 5 },
                    { row: 3, col: 6 },
                    { row: 5, col: 6 },
                ] 
                const actual: Position[] = knightAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should give all positions including those with opponent pieces ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.KNIGHT}
                const oppPiece = {colour: PieceColour.BLACK, type: PieceType.KNIGHT}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, oppPiece, null, oppPiece, null, null  ],
                    [null, null, oppPiece, null, null, null, oppPiece, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, oppPiece, null, null, null, oppPiece, null  ],
                    [null, null, null, oppPiece, null, oppPiece, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 2, col: 3 },
                    { row: 2, col: 5 },
                    { row: 3, col: 2 },
                    { row: 5, col: 2 },
                    { row: 6, col: 3 },
                    { row: 6, col: 5 },
                    { row: 3, col: 6 },
                    { row: 5, col: 6 },
                ] 
                const actual: Position[] = knightAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give moves until blocked by own pieces ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.KNIGHT}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, piece, null, piece, null, null  ],
                    [null, null, piece, null, null, null, piece, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, piece, null, null, null, piece, null  ],
                    [null, null, null, piece, null, piece, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 2, col: 3 },
                    { row: 2, col: 5 },
                    { row: 3, col: 2 },
                    { row: 5, col: 2 },
                    { row: 6, col: 3 },
                    { row: 6, col: 5 },
                    { row: 3, col: 6 },
                    { row: 5, col: 6 },
                ] 
                const actual: Position[] = knightAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
        })    
    })
    describe("pawn", () => {
        describe("pawnMovement", () => {
            test("should give a white forward move up the board", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 3, col: 4 } },
                ] 
                const actual: Move[] = pawnMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
            test("should give a white starting double forward move up the board", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 6, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 4, col: 4 } },
                    { piece, from: position, to: { row: 5, col: 4 } },
                ] 
                const actual: Move[] = pawnMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should give a black forward move down the board", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.BLACK, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 5, col: 4 } },
                ] 
                const actual: Move[] = pawnMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should give a black starting double forward move up the board", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.BLACK, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 1, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 2, col: 4 } },
                    { piece, from: position, to: { row: 3, col: 4 } },
                ] 
                const actual: Move[] = pawnMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should be blocked by friendly piece", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [] 
                const actual: Move[] = pawnMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should be blocked by opponent piece", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.PAWN}
                const oppPiece = {colour: PieceColour.BLACK, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, oppPiece, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [] 
                const actual: Move[] = pawnMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should have white promotions", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 1, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 0, col: 4 }, promotionType: {colour: PieceColour.WHITE, type: PieceType.BISHOP}},
                    { piece, from: position, to: { row: 0, col: 4 }, promotionType: {colour: PieceColour.WHITE, type: PieceType.KNIGHT}},
                    { piece, from: position, to: { row: 0, col: 4 }, promotionType: {colour: PieceColour.WHITE, type: PieceType.QUEEN}},
                    { piece, from: position, to: { row: 0, col: 4 }, promotionType: {colour: PieceColour.WHITE, type: PieceType.ROOK}},
                ] 
                const actual: Move[] = pawnMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should have black promotions", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.BLACK, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 6, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 7, col: 4 }, promotionType: {colour: PieceColour.BLACK, type: PieceType.BISHOP}},
                    { piece, from: position, to: { row: 7, col: 4 }, promotionType: {colour: PieceColour.BLACK, type: PieceType.KNIGHT}},
                    { piece, from: position, to: { row: 7, col: 4 }, promotionType: {colour: PieceColour.BLACK, type: PieceType.QUEEN}},
                    { piece, from: position, to: { row: 7, col: 4 }, promotionType: {colour: PieceColour.BLACK, type: PieceType.ROOK}},
                ] 
                const actual: Move[] = pawnMovement(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
        })

        describe("pawnCapture", () => {
            test("should give no captures", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [] 
                const actual: Move[] = pawnCapture(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should no captures on own pieces", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, piece, null, piece, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [] 
                const actual: Move[] = pawnCapture(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should capture opponent pieces", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.PAWN}
                const oppPiece = {colour: PieceColour.BLACK, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, oppPiece, oppPiece, oppPiece, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Move[] = [
                    { piece, from: position, to: { row: 3, col: 5 }, capturedPiece: oppPiece },
                    { piece, from: position, to: { row: 3, col: 3 }, capturedPiece: oppPiece },
                ] 
                const actual: Move[] = pawnCapture(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should capture and propomote", () => {
                
            })
        })

        describe("pawnEnPassant", () => {

        }) 

        describe("pawnAttackZone", () => {
            test("should give all white positions", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 3, col: 3 },
                    { row: 3, col: 5 },
                ] 
                const actual: Position[] = pawnAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should give all black positions", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.BLACK, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 5, col: 3 },
                    { row: 5, col: 5 },
                ] 
                const actual: Position[] = pawnAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })

            test("should give all white positions including those with opponent pieces ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.WHITE, type: PieceType.PAWN}
                const oppPiece = {colour: PieceColour.BLACK, type: PieceType.KNIGHT}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, oppPiece, null, oppPiece, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 3, col: 3 },
                    { row: 3, col: 5 },
                ] 
                const actual: Position[] = pawnAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
    
            test("should give all black positions including those with opponent pieces ", () => {
                const gameState: GameState = initial
                const piece = {colour: PieceColour.BLACK, type: PieceType.PAWN}
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, piece, null, null, null  ],
                    [null, null, null, piece, null, piece, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
                const position = {row: 4, col: 4}
                const expected: Position[] = [
                    { row: 5, col: 3 },
                    { row: 5, col: 5 },
                ] 
                const actual: Position[] = pawnAttackZone(gameState, position)
                expect(actual).toHaveLength(expected.length);
                expect(actual).toEqual(expect.arrayContaining(expected));
            })
        })    
        

    })
})
