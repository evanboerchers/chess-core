import { GameState, Move, PieceColour, PieceType } from './chess.types'
import {diagonalMovement} from './movement'
import { initial } from './data/gameState'

describe("movement tests", () => {
    describe("diagonal movement", () => {
        it("", () => {
            const gameState: GameState = initial
            gameState.board = [
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, {colour: PieceColour.BLACK, type: PieceType.BISHOP}, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
                [null, null, null, null, null, null, null, null  ],
            ]
            const position = {row: 4, col: 4}
            const expected: Move[] = [] 
            const actual: Move[] = diagonalMovement(gameState, position)
            
        })
    })
})