import { GameState, Move, PieceColour, PieceType, Position } from './chess.types'
import {diagonalAttackZone, diagonalMovement, linearMovement} from './movement'
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
                expect(expected).toHaveLength(actual.length);
                expect(expected).toEqual(expect.arrayContaining(actual));
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
                expect(expected).toHaveLength(actual.length);
                expect(expected).toEqual(expect.arrayContaining(actual));
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
                expect(expected).toHaveLength(actual.length);
                expect(expected).toEqual(expect.arrayContaining(actual));
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
                expect(expected).toHaveLength(actual.length);
                expect(expected).toEqual(expect.arrayContaining(actual));
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
                expect(expected).toHaveLength(actual.length);
                expect(expected).toEqual(expect.arrayContaining(actual));
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
                expect(expected).toHaveLength(actual.length);
                expect(expected).toEqual(expect.arrayContaining(actual));
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
                expect(expected).toHaveLength(actual.length);
                expect(expected).toEqual(expect.arrayContaining(actual));
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
                expect(expected).toHaveLength(actual.length);
                expect(expected).toEqual(expect.arrayContaining(actual));
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
                expect(expected).toHaveLength(actual.length);
                expect(expected).toEqual(expect.arrayContaining(actual));
            })
        })  
    })
})
