export function handleInput(event, action, moveLeftAction, moveRightAction, rotateLeftAction, rotateRightAction, pressPAction,pressAAction,pressDownAction) {
    if (event.code === 'Space') {//space key
        action();
    } else if (event.code === 'ArrowLeft') {//左キー
        moveLeftAction();
    } else if (event.code === 'ArrowRight') {//右キー
        moveRightAction();
    }else if (event.code === 'KeyZ') {//Zキー
        rotateLeftAction();
    } else if (event.code === 'KeyX') {//Xキー
        rotateRightAction();
    }  else if (event.code === 'KeyP') {//Pキー
        pressPAction();
    }  else if (event.code === 'KeyA') {//Aキー
        pressAAction();
    }  else if (event.code === 'ArrowDown') {//下キー
        pressDownAction();
    }
}