import { MainBoard  } from './matrix.js';
import { Blocks } from './blocks.js';
import { handleInput } from './input.js';

const GameState = {//stateの設定。
    InitialGameState: 0,
    GAMING: 3,
    GAMEOVER: 4,
    PauseGame: 5
};


//使用する変数の設定
const HeightCellNum = 20;
const WidthCellNum = 10;

let gameState = GameState.InitialGameState;



let myInstance = new MainBoard();
let blocks = new Blocks();
let canvas = document.getElementById('tetris');
let ctx = canvas.getContext('2d');
let gameOverProgress = 0;
let positionX = Math.floor(myInstance.matrix[0].length / 2) - 2;
let positionY = -1;
const BoardStartX = canvas.width / 3;

let movingBlock = JSON.parse(JSON.stringify(blocks.T_BLOCK));
let slow =0;
let switchBlock = 0;


let score = 0;
let holdBlock = null;
let canHold = true;

const scoreValues = {1: 100, 2: 250, 3: 500, 4: 1000};

const blockColors = {//blockの色を設定
    0: 'black',
    1: 'purple',
    2: 'skyblue',
    3: 'yellow',
    4: 'orange',
    5: 'blue',
    6: 'green',
    7: 'red'
};
const SlideblockSize = canvas.height / HeightCellNum*0.8; 
const XSlide = {1:0 , 2:-SlideblockSize/2 , 3:SlideblockSize/2 , 4:0 ,5:0 , 6:0 , 7:0};
const YSlide = {1:SlideblockSize/2 , 2:0 , 3:SlideblockSize/2 , 4:SlideblockSize/2 ,5:SlideblockSize/2 , 6:SlideblockSize/2 , 7:SlideblockSize/2};



//使用する関数の設定

function getRandomBlock() {
    const blockTypes = [blocks.I_BLOCK, blocks.O_BLOCK, blocks.T_BLOCK, blocks.L_BLOCK, blocks.J_BLOCK, blocks.S_BLOCK, blocks.Z_BLOCK];
    return blockTypes[Math.floor(Math.random() * blockTypes.length)];
}




function drawNextBlock(block, ctx, canvas) {//次のブロックを画面上に示す
     // ブロックのサイズを計算
     const blockSize = canvas.height / HeightCellNum*0.8; 
    const startX = blockSize;  // 描画開始位置のX座標
    const startY = blockSize;  // 描画開始位置のY座標

    

    // ブロックの描画
    for (let y = 0; y < block.length; y++) {
        for (let x = 0; x < block[y].length; x++) {
            if (block[y][x] >= 1) {
                ctx.fillStyle = blockColors[block[y][x]];

                ctx.fillRect(startX + x * blockSize+XSlide[block[y][x]], startY + y * blockSize+YSlide[block[y][x]], blockSize, blockSize);
            }
        }
    }
}


function drawNext2Block(block, ctx, canvas) {//次の次のブロックを画面上に示す
    const blockSize = canvas.height / HeightCellNum*0.8;  // ブロックのサイズを計算
    const startX = blockSize;  // 描画開始位置のX座標
    const startY = blockSize;  // 描画開始位置のY座標

    // ブロックの描画
    for (let y = 0; y < block.length; y++) {
        for (let x = 0; x < block[y].length; x++) {
            if (block[y][x] >= 1) {
                ctx.fillStyle = blockColors[block[y][x]];

                

                //ctx.fillRect(startX + x * blockSize, startY + y * blockSize+canvas.height/HeightCellNum*5, blockSize, blockSize);
                ctx.fillRect(startX + x * blockSize+XSlide[block[y][x]], startY + y * blockSize+YSlide[block[y][x]]+canvas.height/HeightCellNum*5, blockSize, blockSize);
            }
        }
    }
}



function drawHoldBlock(block, ctx, canvas) {//holdされたブロックを画面上に示す
    const blockSize = canvas.height / HeightCellNum*0.8;  // ブロックのサイズを計算
    const startX = blockSize;  // 描画開始位置のX座標
    const startY = blockSize;  // 描画開始位置のY座標

    // ブロックの描画
    for (let y = 0; y < block.length; y++) {
        for (let x = 0; x < block[y].length; x++) {
            if (block[y][x] >= 1) {
                ctx.fillStyle = blockColors[block[y][x]];
                ctx.fillRect(startX + x * blockSize+XSlide[block[y][x]], startY + y * blockSize+YSlide[block[y][x]]+canvas.height/HeightCellNum*10, blockSize, blockSize);
                //ctx.fillRect(startX + x * blockSize, startY + y * blockSize+canvas.height/HeightCellNum*10, blockSize, blockSize);
            }
        }
    }
}




function draw() {//画面上の描写をまとめた関数

    //main boardの行列をもとに描画する。埋まっていない0は黒に、それ以外には色を付けて描画
    for (let y = 0; y < myInstance.matrix.length; y++) {
        for (let x = 0; x < myInstance.matrix[y].length; x++) {
            // ブロックの描画
            if (x >= positionX && x < positionX + movingBlock[0].length &&
                 y >= positionY && y < positionY + movingBlock.length &&
                  movingBlock[y - positionY][x - positionX] >=1)
             {
                    
                ctx.fillStyle = blockColors[movingBlock[y - positionY][x - positionX]];
            } 
            
            
            
            else {
                
                
                ctx.fillStyle = blockColors[myInstance.matrix[y][x]];
               
            }
            ctx.fillRect(BoardStartX + x * (canvas.width * 2 / 3) / WidthCellNum, y * canvas.height / HeightCellNum,
             (canvas.width * 2 / 3) / WidthCellNum, canvas.height / HeightCellNum);
        }
    }
    // 次のブロックの描画
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.height /HeightCellNum*5*0.8, canvas.height/HeightCellNum*5*0.8);  // 左部分の余白を黒で塗りつぶす
    ctx.fillStyle = 'black';
    ctx.fillRect(0, canvas.height/HeightCellNum*5, canvas.height /HeightCellNum*5*0.8, canvas.height/HeightCellNum*5*0.8);  // 左部分の余白を黒で塗りつぶす
    if(switchBlock === 0 ){
       
        drawNextBlock(blockList1[0], ctx, canvas);  // 次のブロックを描画
        if(blockList1.length === 1){
            drawNext2Block(blockList2[0],ctx,canvas);
        }else {
            drawNext2Block(blockList1[1],ctx,canvas);
        }
        
    }else if(switchBlock === 1 ){
        drawNextBlock(blockList2[0], ctx, canvas);  // 次のブロックを描画
        
        if(blockList2.length === 1){
            drawNext2Block(blockList1[0],ctx,canvas);// 次の次のブロックを描画
        }else {
            drawNext2Block(blockList2[1],ctx,canvas);
        }
        
    }
    

    ctx.fillStyle = 'black';
    ctx.fillRect(0, canvas.height/HeightCellNum*10, canvas.height /HeightCellNum*5*0.8, canvas.height/HeightCellNum*5*0.8);  // 左部分の余白を黒で塗りつぶす
    if(holdBlock!=null){
        drawHoldBlock(holdBlock, ctx, canvas);  // Holdブロックを描画
    }
    drawScore();
    drawNext();
}
function drawNext(){//次、次の次のブロック、ホールドさを示す文字の表示。
    ctx.fillStyle = 'white'; // 上書きする色を設定（この場合は背景色）
    ctx.fillRect(0, canvas.height/HeightCellNum*4, canvas.width/3, 30); // テキストの領域を上書きします
    
    ctx.font = '20px Arial';
    let Line = 'Next ';
    //Line += score.toString();
    ctx.fillStyle = 'black';
    ctx.fillText(Line, 0,canvas.height/HeightCellNum*4+20);

    
    ctx.fillStyle = 'white'; // 上書きする色を設定（この場合は背景色）
    ctx.fillRect(0, canvas.height/HeightCellNum*9, canvas.width/3, 30); // テキストの領域を上書きします
    
    ctx.font = '20px Arial';
    Line = 'After Next';
    
    ctx.fillStyle = 'black';
    ctx.fillText(Line, 0,canvas.height/HeightCellNum*9+20);

    ctx.fillStyle = 'white'; // 上書きする色を設定（この場合は背景色）
    ctx.fillRect(0, canvas.height/HeightCellNum*14, canvas.width/3, 30); // テキストの領域を上書きします
    
    ctx.font = '20px Arial';
    Line = 'Hold';
    
    ctx.fillStyle = 'black';
    ctx.fillText(Line, 0,canvas.height/HeightCellNum*14+20);
    

}





function drawScore(){//現在の点数を書く
    ctx.fillStyle = 'white'; // 上書きする色を設定します（この場合は背景色）
    ctx.fillRect(0, canvas.height/HeightCellNum*15, canvas.width/3, 30); // テキストの領域を上書きします
    
    ctx.font = '20px Arial';
    let ScoreLine = 'Score ';
    ScoreLine += score.toString();
    ctx.fillStyle = 'black';
    ctx.fillText(ScoreLine, 0,canvas.height/HeightCellNum*15+20);


}

function PositionUpdate() {//落ちているブロックの位置を更新
    let position = {x: positionX, y: positionY};

    if (!myInstance.checkBlockTouchedBottom(movingBlock, positionY)) {
        positionY += 1;
    }
}

let blockList1 = [];
let blockList2 = [];

function shuffleArray(array) {//blockListのシャッフル(落ちる順番をランダムに)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeBlockList() {//blockListの初期化
    let blocklist = [blocks.I_BLOCK, blocks.O_BLOCK, blocks.T_BLOCK, blocks.L_BLOCK, blocks.J_BLOCK, blocks.S_BLOCK, blocks.Z_BLOCK];
    shuffleArray(blocklist);
    return blocklist;
}


function getNextBlock(blockList) {//次のブロックを得る
    if (blockList.length === 0) {
        blockList = initializeBlockList();
    }
    return blockList.shift();
}





document.addEventListener('keydown', (event) => {//キーイベントを入れる
    handleInput(event, 
        () => { 
            if (gameState === GameState.InitialGameState) {
                gameState = GameState.GAMING;
                blockList1=initializeBlockList();
                blockList2=initializeBlockList();
                movingBlock = JSON.parse(JSON.stringify(getNextBlock(blockList1)));
               
            } else if (gameState === GameState.GAMING) {
            
                
            }else if (gameState === GameState.GAMEOVER) {
                gameState = GameState.InitialGameState;
                gameOverProgress = 0;
                myInstance = new MainBoard();
                movingBlock = JSON.parse(JSON.stringify(getRandomBlock()));
                positionX = Math.floor(myInstance.matrix[0].length / 2) - 2;
                positionY = 0;
                
            }
            
        },  // Space key
        () => { 
            if (gameState === GameState.GAMING && !myInstance.checkBlockTouchedWall(movingBlock, positionX - 1) && !myInstance.checkBlockTouchedFixed(movingBlock, positionX - 1, positionY)) positionX -= 1; 
        },  // Left arrow key
        () => { 
            if (gameState === GameState.GAMING && !myInstance.checkBlockTouchedWall(movingBlock, positionX + 1) && !myInstance.checkBlockTouchedFixed(movingBlock, positionX + 1, positionY)) positionX += 1; 
        },   // Right arrow key
           
        () => { 
            if (gameState === GameState.GAMING) {
                let simulatedBlock = blocks.simulateRotate(movingBlock);
                if (!myInstance.checkBlockTouchedWall(simulatedBlock, positionX) 
                    && !myInstance.checkBlockTouchedFixed(simulatedBlock, positionX, positionY)) {
                    movingBlock = blocks.rotate(movingBlock); 
                }
            }
        },  // Z key
        () => { 
            if (gameState === GameState.GAMING) {
                let simulatedBlock = blocks.simulateRotateInverse(movingBlock);
                if (!myInstance.checkBlockTouchedWall(simulatedBlock, positionX) 
                    && !myInstance.checkBlockTouchedFixed(simulatedBlock, positionX, positionY)) {
                    movingBlock = blocks.rotateInverse(movingBlock); 
                }
            }
        } ,  // X key
        () => {
            if (gameState === GameState.GAMING) {
            //if (slow === 0) {
                
                gameState = GameState.PauseGame;
                //slow=1;
            } else if (gameState === GameState.PauseGame) {
            //} else if (slow === 1) {
                gameState = GameState.GAMING;
                //slow=0;
            }
        }, // P key
        () => {
            if (gameState === GameState.GAMING && canHold) {
                if (holdBlock === null) {
                    holdBlock = movingBlock;
                    movingBlock = JSON.parse(JSON.stringify(getNextBlock(blockList1)));
                    positionX = Math.floor(myInstance.matrix[0].length / 2) - 2;
                    positionY = 0;
                } else {
                    if (!myInstance.checkBlockTouchedWall(holdBlock, positionX)){
                        let tempBlock = movingBlock;
                    
                        movingBlock = holdBlock;
                        holdBlock = tempBlock;
                    }
                }
                canHold = false;
            }
        }, // A key
        () => { 
            if (gameState === GameState.GAMING) {
                // 下向き矢印キーが押されたときの処理
                while (!myInstance.checkBlockTouchedBottom(movingBlock, positionY) && !myInstance.checkBlockTouchedFixed(movingBlock, positionX, positionY + 1)) {
                    positionY += 1;
                }
            }
        }//downKey
    );
});




function update() {//全体のアップデートをつかさどる。再帰関数にして、ループにする
    // ゲームオーバーの判定
    if (myInstance.checkGameOver()) {
        gameState = GameState.GAMEOVER;
    }

    switch (gameState) {
        case GameState.InitialGameState:
            // ゲーム開始前の状態
            ctx.fillStyle = 'black';
            //ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillRect(BoardStartX, 0, canvas.width/3*2, canvas.height);
            ctx.fillRect(0, 0, canvas.height /HeightCellNum*5*0.8, canvas.height/HeightCellNum*5*0.8);
            
            ctx.fillRect(0, canvas.height/HeightCellNum*5, canvas.height /HeightCellNum*5*0.8, canvas.height/HeightCellNum*5*0.8); 
            
            ctx.fillRect(0, canvas.height/HeightCellNum*10, canvas.height /HeightCellNum*5*0.8, canvas.height/HeightCellNum*5*0.8);
            
            drawNext();

            ctx.fillStyle = 'white';
            ctx.font = '25px Arial';
            var text = 'Press Space';

            var matrix = ctx.measureText(text);

            ctx.fillText(text, canvas.width*2/3-matrix.width/2, canvas.height / 2);
            
            holdBlock = null;
            canHold = true;
            score = 0;
            break;

        case GameState.GAMING:
            // 状態更新関数を呼び出す
            if (myInstance.checkBlockTouchedBottom(movingBlock, positionY) || myInstance.checkBlockTouchedFixed(movingBlock, positionX, positionY + 1)) {
                myInstance.fixBlock(movingBlock, positionX, positionY);


                if(switchBlock == 0){//次のブロックを呼ぶ
                    movingBlock = JSON.parse(JSON.stringify(getNextBlock(blockList1)));
                  if(blockList1.length === 0){
                    switchBlock = 1;
                    blockList1 = initializeBlockList();
                  }
                }else if(switchBlock == 1){
                    movingBlock = JSON.parse(JSON.stringify(getNextBlock(blockList2)));
                    if(blockList2.length === 0){
                        switchBlock = 0;
                        blockList2 = initializeBlockList();
                      }
                }



                if (myInstance.checkBlockTouchedFixed(movingBlock, Math.floor(myInstance.matrix[0].length / 2) - 2, 0)) {
                //新しいブロックを置けるかどうか確認  
                    movingBlock = blocks.empty_BLOCK;
                    // 配置できない場合はゲームオーバー
                    gameState = GameState.GAMEOVER;
                } else {
                    // 配置できる場合は通常通り進行
                    positionX = Math.floor(myInstance.matrix[0].length / 2) - 2;
                    positionY = 0;
                    canHold = true;
                }
            } else {
                PositionUpdate();//動くブロックをアップデート
            }

            let num = myInstance.clearFullRows();
            score += scoreValues[num] || 0;

            // 描画関数を呼び出す
            draw();
           
            



            break;

        case GameState.PauseGame:
            // 一時停止状態
            ctx.fillStyle = 'white';
            ctx.font = '25px Arial';
            var text ='paused';
            var matrix = ctx.measureText(text);
            ctx.fillText(text, canvas.width *2/3 -matrix.width/2, canvas.height / 2);
            break;

        case GameState.GAMEOVER:
            // ゲームオーバーの場合は画面全体を黒く塗りつぶす
            ctx.fillStyle = 'black';
            ctx.fillRect(BoardStartX, 0, canvas.width/3*2, gameOverProgress);
            gameOverProgress += canvas.height/HeightCellNum;
            if (gameOverProgress >= canvas.height) {
                ctx.fillStyle = 'white';
                ctx.font = '25px Arial';
                var text = 'Game Over';
                var metrics = ctx.measureText(text);
                ctx.fillText(text, canvas.width / 3*2-metrics.width/2, canvas.height / 2);
            }
            break;

        // 他のゲームの状態がある場合はここに追加
    }

    // 次のフレームを予約
    let div = 1.0;
    if(gameState === GameState.GAMEOVER){
        div =5;//ゲームオーバー演出のために加速
    }else {
        div = 1.0;
    }
    setTimeout(update, 200/div);  //更新
}

// ゲームループを開始
update();

