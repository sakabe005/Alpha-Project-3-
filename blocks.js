
export class Blocks {//７種類のブロック

    T_BLOCK = [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
        
    ];

    I_BLOCK = [
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    O_BLOCK = [
        [3, 3],
        [3, 3]
        
    ];

    L_BLOCK = [
        [0, 0, 4],
        [4, 4, 4],
        [0, 0, 0]
        
    ];

    J_BLOCK = [
        [5, 0, 0],
        [5, 5, 5],
        [0, 0, 0]
        
    ];

    S_BLOCK = [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0]
        
    ];

    Z_BLOCK = [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
        
    ];

    empty_BLOCK = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]

    ];

    rotate(block) {
        // ブロックを90度回転させる
        
        let rotated = block[0].map((val, index) => 
            block.map(row => row[index])
        ).reverse();

        
        

        return rotated;
    }

    rotateInverse(block) {
        // ブロックを90度逆回転させる
        let rotatedInverse = block[0].map((val, index) =>
            block.map(row => row[index])
        );
        rotatedInverse = rotatedInverse.map(row => row.reverse());
    
        return rotatedInverse;
    }

    simulateRotate(block) {
        // ブロックを90度回転させるsimulation
        let rotated = block[0].map((val, index) => 
            block.map(row => row[index])
        ).reverse();
    
        return rotated;
    }

    simulateRotateInverse(block) {
        // ブロックを90度逆回転させるsimulation
        let rotatedInverse = block[0].map((val, index) =>
            block.map(row => row[index])
        );
        rotatedInverse = rotatedInverse.map(row => row.reverse());
    
        return rotatedInverse;
    }
}