import { copyGameState, findPiece, getAttackZone, getAttackZones, getBoardSquare, isKingInCheck, makeMove } from "./chess"
import { Board, Move, Piece, PieceColour, PieceType, Position } from "./chess.types"
import { initial } from "./data/gameState"
import { areBoardsEqual } from "./utils/test"

describe("chess tests", () => {
    describe("copyGameState", () => {
         it("should not share a reference", () => {
            const gameState = initial();
            const copy = copyGameState(gameState);
            gameState.currentTurn = PieceColour.BLACK;
            copy.currentTurn = PieceColour.WHITE;
            expect(copy.currentTurn).not.toBe   (gameState.currentTurn)
         })
    })

    describe("getBoardSquare", () => {
        it("should get piece",() => {
            const gameState = initial();
            const expected: Piece = {colour: PieceColour.BLACK, type: PieceType.KING}
            const actual  = getBoardSquare(gameState, {row: 0, col: 4})
            expect(actual).toEqual(expected)
        })
        it("should get null", () => {
            const gameState = initial();
            const actual  = getBoardSquare(gameState, {row: 4, col: 4})
            expect(actual).toEqual(null)
        })
    })

    describe("findPiece", () => {
        it("should return all white pawn positions", () => {
            const gameState = initial();
            const piece: Piece = {colour: PieceColour.WHITE, type: PieceType.PAWN}
            const expected: Position[] = [
                {row: 6, col: 0},
                {row: 6, col: 1},
                {row: 6, col: 2},
                {row: 6, col: 3},
                {row: 6, col: 4},
                {row: 6, col: 5},
                {row: 6, col: 6},
                {row: 6, col: 7},
            ]
            const actual = findPiece(gameState, piece)
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        })
        it("should return the black king position", () => {
            const gameState = initial();
            const piece: Piece = {colour: PieceColour.BLACK, type: PieceType.KING}
            const expected: Position[] = [
                {row: 0, col: 4},
            ]
            const actual = findPiece(gameState, piece)
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        })
        it("should return nothing", () => {
            const gameState = initial();
            gameState.board[0][4] = null;
            const piece: Piece = {colour: PieceColour.BLACK, type: PieceType.KING}
            const expected: Position[] = []
            const actual = findPiece(gameState, piece)
            expect(actual).toHaveLength(expected.length);
        })
    })

    describe("getAttackZone", () => {
        it("should get relevant attack zones for queen", () => {
            const gameState = initial();
            const piece = {colour: PieceColour.WHITE, type: PieceType.QUEEN}
            gameState.board =  [
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, piece, null, null, null ],
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
                { row: 7, col: 1 },
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
            const actual = getAttackZone(gameState, position)
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        })

        it("should relevant attack zone for rook", () => {
            const gameState = initial();
            const piece = {colour: PieceColour.WHITE, type: PieceType.ROOK}
            gameState.board =  [
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, piece, null, null, null  ],
                [null, null, null, null, null, null, null, null ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
            ]
            const expected: Position[] = [
                { row: 3, col: 0 },
                { row: 3, col: 1 },
                { row: 3, col: 2 },
                { row: 3, col: 3 },
                { row: 3, col: 5 },
                { row: 3, col: 6 },
                { row: 3, col: 7 },
                { row: 0, col: 4 },
                { row: 1, col: 4 },
                { row: 2, col: 4 },
                { row: 4, col: 4 },
                { row: 5, col: 4 },
                { row: 6, col: 4 },
                { row: 7, col: 4 },
            ]
            const position = {row: 3, col: 4}
            const actual = getAttackZone(gameState, position);
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        })
    })

    describe("getAttackZones", () => {
        it("should give white starting position attack positions", () => {
            const gameState = initial();
            const expected: Position[] = [
                { row: 5, col: 0 },
                { row: 5, col: 1 },
                { row: 5, col: 2 },
                { row: 5, col: 3 },
                { row: 5, col: 4 },
                { row: 5, col: 5 },
                { row: 5, col: 6 },
                { row: 5, col: 7 },
                { row: 6, col: 0 },
                { row: 6, col: 1 },
                { row: 6, col: 2 },
                { row: 6, col: 3 },
                { row: 6, col: 4 },
                { row: 6, col: 5 },
                { row: 6, col: 6 },
                { row: 6, col: 7 },
                { row: 7, col: 1 },
                { row: 7, col: 2 },
                { row: 7, col: 3 },
                { row: 7, col: 4 },
                { row: 7, col: 5 },
                { row: 7, col: 6 },
            ]
            const actual = getAttackZones(gameState, PieceColour.WHITE);
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        })

        it("should give black starting position attack positions", () => {
            const gameState = initial();
            const expected: Position[] = [
                { row: 0, col: 1 },
                { row: 0, col: 2 },
                { row: 0, col: 3 },
                { row: 0, col: 4 },
                { row: 0, col: 5 },
                { row: 0, col: 6 },
                { row: 1, col: 0 },
                { row: 1, col: 1 },
                { row: 1, col: 2 },
                { row: 1, col: 3 },
                { row: 1, col: 4 },
                { row: 1, col: 5 },
                { row: 1, col: 6 },
                { row: 1, col: 7 },
                { row: 2, col: 0 },
                { row: 2, col: 1 },
                { row: 2, col: 2 },
                { row: 2, col: 3 },
                { row: 2, col: 4 },
                { row: 2, col: 5 },
                { row: 2, col: 6 },
                { row: 2, col: 7 },
            ]
            const actual = getAttackZones(gameState, PieceColour.BLACK);
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        })

        it("should have rook attack zones stopping at and including king", () => {
            const gameState = initial();
            const king = {colour: PieceColour.WHITE, type: PieceType.KING}
            const rook = {colour: PieceColour.BLACK, type: PieceType.ROOK}
            gameState.board =  [
                [null, null, null, null, rook, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, king, null, null, null ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
            ]
            const expected: Position[] = [
                { row: 0, col: 0 },
                { row: 0, col: 1 },
                { row: 0, col: 2 },
                { row: 0, col: 3 },

                { row: 0, col: 5 },
                { row: 0, col: 6 },
                { row: 0, col: 7 },
                { row: 1, col: 4 },
                { row: 2, col: 4 },
                { row: 3, col: 4 },
                { row: 4, col: 4 },
            ]
            const actual = getAttackZones(gameState, PieceColour.BLACK);
            expect(actual).toHaveLength(expected.length);
            expect(actual).toEqual(expect.arrayContaining(expected));
        })
    })

    describe("isKingInCheck", () => {
        it("should not be in check on empty board", () => {
            const gameState = initial();
            const king = {colour: PieceColour.WHITE, type: PieceType.QUEEN}
            gameState.board =  [
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, king, null, null, null ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
            ]
            const actual = isKingInCheck(gameState, PieceColour.WHITE)
            expect(actual).toBe(false);
        })
        
        it("should not be in check from own rook", () => {
            const gameState = initial();
            const king = {colour: PieceColour.WHITE, type: PieceType.KING}
            const rook = {colour: PieceColour.WHITE, type: PieceType.ROOK}
            gameState.board =  [
                [null, null, null, null, rook, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, king, null, null, null ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
            ]
            const actual = isKingInCheck(gameState, PieceColour.WHITE)
            expect(actual).toBe(false);
        })

        it("should not be in check from opponent rook", () => {
            const gameState = initial();
            const king = {colour: PieceColour.WHITE, type: PieceType.KING}
            const rook = {colour: PieceColour.BLACK, type: PieceType.ROOK}
            gameState.board =  [
                [null, null, null, null, rook, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, king, null, null, null ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
            ]
            const actual = isKingInCheck(gameState, PieceColour.WHITE)
            expect(actual).toBe(true);
        })

        it("black should not be in check from opponent rook", () => {
            const gameState = initial();
            const king = {colour: PieceColour.BLACK, type: PieceType.KING}
            const rook = {colour: PieceColour.WHITE, type: PieceType.ROOK}
            gameState.board =  [
                [null, null, null, null, rook, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, king, null, null, null ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
            ]
            const actual = isKingInCheck(gameState, PieceColour.BLACK)
            expect(actual).toBe(true);
        })

        it("should not be in check since pawn blocks", () => {
            const gameState = initial();
            const king = {colour: PieceColour.WHITE, type: PieceType.KING}
            const pawn = {colour: PieceColour.WHITE, type: PieceType.PAWN}
            const bQueen = {colour: PieceColour.BLACK, type: PieceType.QUEEN}
            const bBishop = {colour: PieceColour.BLACK, type: PieceType.BISHOP}
            gameState.board =  [
                [null, bQueen, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, bBishop, null, null  ],
                [null, null, null, null, null, null, null, null ],
                [null, null, null, null, null, null, null, null  ],
                [pawn, pawn, pawn, null, null, null, null, null  ],
                [null, king, null, null, null, null, null, null  ],
            ]
            const actual = isKingInCheck(gameState, PieceColour.WHITE)
            expect(actual).toBe(false);
        })

        it("should not be in check from knight attack", () => {
            const gameState = initial();
            const king = {colour: PieceColour.WHITE, type: PieceType.KING}
            const pawn = {colour: PieceColour.WHITE, type: PieceType.PAWN}
            const bQueen = {colour: PieceColour.BLACK, type: PieceType.QUEEN}
            const bBishop = {colour: PieceColour.BLACK, type: PieceType.BISHOP}
            const bKnight = {colour: PieceColour.BLACK, type: PieceType.KNIGHT}
            gameState.board =  [
                [null, bQueen, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, bBishop, null, null  ],
                [null, null, null, null, null, null, null, null ],
                [null, null, bKnight, null, null, null, null, null  ],
                [pawn, pawn, pawn, null, null, null, null, null  ],
                [null, king, null, null, null, null, null, null  ],
            ]
            const actual = isKingInCheck(gameState, PieceColour.WHITE)
            expect(actual).toBe(true);
        })
    })

    describe("makeMove", () => {
        it("should move king", () => {
            const gameState = initial();
            const piece = {colour: PieceColour.WHITE, type: PieceType.KING}
            const from: Position = {row: 4, col: 4}
            const to: Position = {row: 4, col: 5}
            const move: Move = {
                piece: piece,
                from: from,
                to: to,
            }
            gameState.board = [
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, piece, null, null, null ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
            ]
            const expected: Board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, piece, null, null ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
            
            const actual = makeMove(gameState, move).board
            expect(areBoardsEqual(expected, actual)).toBe(true)  
        })

        it("should capture pawn", () => {
            const gameState = initial();
            const piece = {colour: PieceColour.WHITE, type: PieceType.KING}
            const pawn = {colour: PieceColour.BLACK, type: PieceType.PAWN}
            const from: Position = {row: 4, col: 4}
            const to: Position = {row: 4, col: 5}
            const move: Move = {
                piece: piece,
                from: from,
                to: to,
                capturedPiece: pawn,
            }
            gameState.board = [
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, piece, pawn, null, null ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
            ]
            const expected: Board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, piece, null, null ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                ]
            
            const actual = makeMove(gameState, move).board
            expect(areBoardsEqual(expected, actual)).toBe(true)  
        })

        it("should promote pawn", () => {
            const gameState = initial();
            const pawn = {colour: PieceColour.WHITE, type: PieceType.PAWN}
            const queen = {colour: PieceColour.WHITE, type: PieceType.PAWN}
            const from: Position = {row: 1, col: 4}
            const to: Position = {row: 0, col: 4}
            const move: Move = {
                piece: pawn,
                from: from,
                to: to,
                promotionType: queen
            }
            gameState.board = [
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, pawn, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
            ]
            const expected: Board = [
                [null, null, null, null, queen, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
            ]
            
            const actual = makeMove(gameState, move).board
            expect(areBoardsEqual(expected, actual)).toBe(true)  
        })

        it("should castle queen side", () => {
            it("should promote pawn", () => {
                const gameState = initial();
                const king = {colour: PieceColour.WHITE, type: PieceType.KING}
                const rook = {colour: PieceColour.WHITE, type: PieceType.PAWN}
                const from: Position = {row: 7, col: 4}
                const to: Position = {row: 7, col: 2}
                const move: Move = {
                    piece: king,
                    from: from,
                    to: to,
                    castle: true
                }
                gameState.board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [rook, null, null, null, king, null, null, rook  ],
                ]
                const expected: Board = [
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, null, null, null, null, null, null  ],
                    [null, null, king, rook, null, null, null, rook  ],
                ]
                
                const actual = makeMove(gameState, move).board
                expect(areBoardsEqual(expected, actual)).toBe(true)  
            })
        })
    })
})
