export function areBoardsEqual(board1: (null | object)[][], board2: (null | object)[][]): boolean {
    if (board1.length !== board2.length) return false;

    for (let row = 0; row < board1.length; row++) {
        if (board1[row].length !== board2[row].length) return false;

        for (let col = 0; col < board1[row].length; col++) {
            const cell1 = board1[row][col];
            const cell2 = board2[row][col];

            // Check if both are null
            if (cell1 === null && cell2 === null) {
                continue;
            }

            // Check if only one is null
            if (cell1 === null || cell2 === null) {
                return false;
            }

            // Check if both are objects and their properties are equal
            if (JSON.stringify(cell1) !== JSON.stringify(cell2)) {
                return false;
            }
        }
    }
    return true;
}