const CYCLE_LOOP = [0, 1, 0, 2];
let currentDirection = 0, currentLoopIndex = 0, frameCount = 0, imgp = new Image();
function drawFrame(frameX, frameY, canvasX, canvasY) {
    myGameArea.context.drawImage(imgp, frameX * 32, frameY * 32, 32, 32,700 +  canvasX, canvasY, 96, 96);
}
function move() {
    var k = false;
    //up
    if (myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[119] || myGameArea.keys[87])) {
        ypos -= speed;
        if (ypos <= 0) {
            ypos = 0;
        }
        if(xpos > 470 && xpos < 500 && ypos > 800 && ypos < 850){
            xpos = 4000;
            ypos = 290;
        }
        if(xpos > 800 && xpos < 880 && ypos > 1250 && ypos < 1300){
            screenNum = 7;
        }
        for(var x of borders.top){
            if(ypos <= x.y && ypos > x.y - 20 && xpos >= x.from && xpos <= x.to){
                ypos = x.y;
            }
        }
        currentDirection = 3;
        k = true;
    } else if (myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[115] || myGameArea.keys[83])) {
            //down
        ypos += speed;
        if(Math.abs(ypos - (65 * 1900/496) - (xpos - (140 * 1900/496))) < 25  && xpos > 133 * 1900/496 && xpos < 290 * 1900 / 496){
            ypos = xpos - (75 * 1900/496) ;
        }
        if(Math.abs(xpos + ypos - 1932.701) < 20 && xpos > 1100 && xpos < 1325){
            ypos = 1932.701 - xpos;
        }
        if(Math.abs(xpos + ypos - 752.701) < 20 && xpos >= 420 && xpos <= 520){
            ypos = 752.701 - xpos;
        }
        if(Math.abs(xpos - ypos - 722.3) < 20 && xpos >= 1325 && xpos <= 1580){
            ypos = xpos - 722.3;
        }
        if(xpos >= 4000 && xpos <= 4010 && ypos > 300 && ypos < 350){
            xpos = 480;
            ypos = 860;
        }
        for(var x of borders.bottom){
            if(ypos >= x.y && ypos < x.y + 20 && xpos >= x.from && xpos <= x.to){
                ypos = x.y;
            }
        }

        currentDirection = 0;
        k = true;
    }
    if (myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[97] || myGameArea.keys[65])) {
            //left
            xpos -= speed;
            if (xpos <= 0) {
                xpos = 0;
            }
            
            if(Math.abs(ypos - (65 * 1900/496) - (xpos - (140 * 1900/496))) < 25  && xpos > 133 * 1900/496 && xpos < 290 * 1900 / 496){
                xpos = ypos + (75 * 1900/496) ;
            }
            if(Math.abs(xpos - ypos - 722.3) < 20 && xpos >= 1325 && xpos <= 1580){
                xpos = ypos + 722.3;
            }
            for(var x of borders.left){
                if(xpos <= x.x && xpos > x.x - 20 && ypos >= x.from && ypos <= x.to){
                    xpos = x.x;
                }
            }
        currentDirection = 1;
        k = true;
    } else if (myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[100] || myGameArea.keys[68])) {
            //right
            xpos += speed;
            if(Math.abs(xpos + ypos - 1932.701) < 20 && xpos > 1100 && xpos < 1325){
                xpos = 1932.701 - ypos;
            }
            if(Math.abs(xpos + ypos - 752.701) < 20 && xpos >= 420 && xpos <= 520){
                xpos = 752.701 - ypos;
            }
            for(var x of borders.right){
                if(xpos >= x.x && xpos < x.x + 20 && ypos >= x.from && ypos <= x.to){
                    xpos = x.x;
                }
            }
        currentDirection = 2;
        k = true;
    }
    return k;
}