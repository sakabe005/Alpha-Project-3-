export class MainBoard {//ゲームの基本ボード

    constructor() {
        this.matrix = new Array(20).fill(null).map((_, i) =>
            new Array(10).fill( 0)
        );
       
        
    }

    checkGameOver() {
        // matrixの最初の行に1以上の値が含まれているかチェック
        return this.matrix[0].some(value => value >= 1);
    }
    
    
    
    checkBlockTouchedBottom(block, positionY) {//床にブロックが当たったかどうか
        let num = block.reduce((acc, row, i) => row.some(cell => cell >= 1) ? Math.max(i, acc) : acc, 0);
        console.log(positionY+num);
        
        return (positionY + num) === this.matrix.length -1;
    }

    checkBlockTouchedWall(block, positionX) {//壁にブロックが当たったかどうか
        let leftEdge = block[0].length;
        let rightEdge = 0;
    
        for(let i = 0; i < block[0].length; i++) {
            for(let j = 0; j < block.length; j++) {
                if(block[j][i] >= 1) {
                    leftEdge = Math.min(i, leftEdge);
                    rightEdge = Math.max(i, rightEdge);
                }
            }
        }
    
        return (positionX + leftEdge < 0) || (positionX + rightEdge >= this.matrix[0].length);
    }
    
    fixBlock(block, positionX, positionY) {//落ち切ったブロックをフィールドに固定
        for(let y = 0; y < block.length; y++) {
            for(let x = 0; x < block[y].length; x++) {
                if(block[y][x] >= 1) {
                    this.matrix[positionY + y][positionX + x] = block[y][x];
                }
            }
        }
    }

    checkBlockTouchedFixed(block, positionX, positionY) {//すでに肯定されたブロックに今のブロックが接触しているか確認
        for(let y = 0; y < block.length; y++) {
            for(let x = 0; x < block[y].length; x++) {
                if(block[y][x] >= 1 && this.matrix[positionY + y][positionX + x] >= 1) {
                    return true;
                }
            }
        }
        return false;
    }

    clearFullRows() {//そろった行を削除
        let num = 0;
        for(let y = 0; y < this.matrix.length; y++) {
            if(this.matrix[y].every(cell => cell >=1)) {
                this.matrix.splice(y, 1);
                this.matrix.unshift(new Array(10).fill(0));
                num++;
            }
        }
        return num;
    }
    
    
    
    
}