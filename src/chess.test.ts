import { copyGameState, getAttackZone } from "./chess"
import { PieceColour } from "./chess.types"
import { initial } from "./data/gameState"

describe("chess tests", () => {
    describe("copyGameState", () => {
         it("should not share a reference", () => {
            const gameState = initial();
            const copy = copyGameState(gameState);
            gameState.currentTurn = PieceColour.BLACK;
            copy.currentTurn = PieceColour.WHITE;
            expect(copy.currentTurn).not.toBe(gameState.currentTurn)
         })
    })

    describe("getAttackZone", () => {
        it("should get relevant attack zones for queen", () => {
            const state = initial();
            getAttackZone(state, )
        })
    })
})
