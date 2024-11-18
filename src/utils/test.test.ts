import { areBoardsEqual } from "./test"

describe("areBoardsEqual", () => {
    it("boards should be equal", () => {
        const board1 = [
            [
                {
                    "colour": "black",
                    "type": "rook"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "queen"
                },
                {
                    "colour": "black",
                    "type": "king"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "rook"
                }
            ],
            [
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                }
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                }
            ],
            [
                {
                    "colour": "white",
                    "type": "rook"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "queen"
                },
                {
                    "colour": "white",
                    "type": "king"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "rook"
                }
            ]
        ]
        const board2 = [
            [
                {
                    "colour": "black",
                    "type": "rook"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "queen"
                },
                {
                    "colour": "black",
                    "type": "king"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "rook"
                }
            ],
            [
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                }
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                }
            ],
            [
                {
                    "colour": "white",
                    "type": "rook"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "queen"
                },
                {
                    "colour": "white",
                    "type": "king"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "rook"
                }
            ]
        ] 
        expect(areBoardsEqual(board1, board2)).toBe(true)
    })

    it("boards should not be equal because missing piece", () => {
        const board1 = [
            [
                null,
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "queen"
                },
                {
                    "colour": "black",
                    "type": "king"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "rook"
                }
            ],
            [
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                }
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                }
            ],
            [
                {
                    "colour": "white",
                    "type": "rook"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "queen"
                },
                {
                    "colour": "white",
                    "type": "king"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "rook"
                }
            ]
        ]
        const board2 = [
            [
                {
                    "colour": "black",
                    "type": "rook"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "queen"
                },
                {
                    "colour": "black",
                    "type": "king"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "rook"
                }
            ],
            [
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                }
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                }
            ],
            [
                {
                    "colour": "white",
                    "type": "rook"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "queen"
                },
                {
                    "colour": "white",
                    "type": "king"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "rook"
                }
            ]
        ] 
        expect(areBoardsEqual(board1, board2)).toBe(false)
    })

    it("boards should not be equal because different colour piece", () => {
        const board1 = [
            [
                {
                    "colour": "white",
                    "type": "rook"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "queen"
                },
                {
                    "colour": "black",
                    "type": "king"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "rook"
                }
            ],
            [
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                }
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                }
            ],
            [
                {
                    "colour": "white",
                    "type": "rook"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "queen"
                },
                {
                    "colour": "white",
                    "type": "king"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "rook"
                }
            ]
        ]
        const board2 = [
            [
                {
                    "colour": "black",
                    "type": "rook"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "queen"
                },
                {
                    "colour": "black",
                    "type": "king"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "rook"
                }
            ],
            [
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                }
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                }
            ],
            [
                {
                    "colour": "white",
                    "type": "rook"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "queen"
                },
                {
                    "colour": "white",
                    "type": "king"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "rook"
                }
            ]
        ] 
        expect(areBoardsEqual(board1, board2)).toBe(false)
    })

    it("boards should be not equal because different piece type", () => {
        const board1 = [
            [
                {
                    "colour": "black",
                    "type": "rook"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "queen"
                },
                {
                    "colour": "black",
                    "type": "king"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "rook"
                }
            ],
            [
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                }
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                }
            ],
            [
                {
                    "colour": "white",
                    "type": "rook"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "queen"
                },
                {
                    "colour": "white",
                    "type": "king"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "rook"
                }
            ]
        ]
        const board2 = [
            [
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "queen"
                },
                {
                    "colour": "black",
                    "type": "king"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "rook"
                }
            ],
            [
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                }
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                }
            ],
            [
                {
                    "colour": "white",
                    "type": "rook"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "queen"
                },
                {
                    "colour": "white",
                    "type": "king"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "rook"
                }
            ]
        ] 
        expect(areBoardsEqual(board1, board2)).toBe(false)
    })

    it("boards should not be equal because of swapped order", () => {
        const board1 = [
            [
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "rook"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "queen"
                },
                {
                    "colour": "black",
                    "type": "king"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "rook"
                }
            ],
            [
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                }
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                }
            ],
            [
                {
                    "colour": "white",
                    "type": "rook"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "queen"
                },
                {
                    "colour": "white",
                    "type": "king"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "rook"
                }
            ]
        ]
        const board2 = [
            [
                {
                    "colour": "black",
                    "type": "rook"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "queen"
                },
                {
                    "colour": "black",
                    "type": "king"
                },
                {
                    "colour": "black",
                    "type": "bishop"
                },
                {
                    "colour": "black",
                    "type": "knight"
                },
                {
                    "colour": "black",
                    "type": "rook"
                }
            ],
            [
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                },
                {
                    "colour": "black",
                    "type": "pawn"
                }
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                },
                {
                    "colour": "white",
                    "type": "pawn"
                }
            ],
            [
                {
                    "colour": "white",
                    "type": "rook"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "queen"
                },
                {
                    "colour": "white",
                    "type": "king"
                },
                {
                    "colour": "white",
                    "type": "bishop"
                },
                {
                    "colour": "white",
                    "type": "knight"
                },
                {
                    "colour": "white",
                    "type": "rook"
                }
            ]
        ] 
        expect(areBoardsEqual(board1, board2)).toBe(false)
    })
    
})