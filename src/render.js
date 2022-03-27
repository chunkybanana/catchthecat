const ime = new Image();
ime.src = 'imgs/map.png';
const imh = new Image();
imh.src = 'imgs/house.png';
const imc = new Image();
imc.src = 'imgs/cats.png';
const imf = new Image();
imf.src = 'imgs/food.png';
const imn = new Image();
imn.src = 'imgs/npc.png';
const ims = new Image();
ims.src = 'imgs/start.png';
var currentCat, text, leaving = false;
imgp.src = 'imgs/player.png';

function renderBlocks() {
    myGameArea.context.drawImage(ime,1000 - xpos,300 -ypos,2000,2000)
    myGameArea.context.drawImage(imh,5000 - xpos,300 -ypos,140 * 2000/496,100 * 2000/496)
}
function renderPlayer(moved) {
    if (moved) {
        frameCount++;
        if (frameCount >= 5) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= CYCLE_LOOP.length) {
                currentLoopIndex = 0;
            }
        }
    } else {
        currentLoopIndex = 0;
    }
    drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, 302, 302);
}
function renderTS(){
    myGameArea.context.drawImage(ims,700,0);
    if(myGameArea.keys[32]){
        screenNum = 1;
    }
}
const borders = {
    left: [
        {x:1560,from:810,to: 1350},
        {x:10 * 1900/496,from:120* 1900/496,to: 215* 1900/496},
        {x:400,from:880,to: 1100},
        {x:340,from:780,to: 880},
        {x:280,from: 1100,to: 1635},
        {x:65, from: 1465, to: 1635},
        {x:4000, from: 0, to: 300},
    ],
    right: [
        {x:660,from:810,to:1300},
        {x:1900,from:0,to:1900},
        {x:1245,from:1275,to:1350},
        {x:25 * 1900/496,from:120 * 1900/496,to:175 * 1900/496},
        {x:90 * 1900/496,from:155 * 1900/496,to:215 * 1900/496},
        {x: 170,from: 1465, to: 1635},
        {x: 1370, from: 1745, to: 1900},
        {x: 1585, from: 1465, to: 1745},
        {x: 1730, from: 1320, to: 1465},
        {x:4470, from: 0, to: 300},
    ],
    top: [
        {y:1300,from:680,to:800},
        {y:1300,from:880,to:1245},
        {y:1350,from:1245,to:1560},
        {y:120 * 1900/496,from:10 * 1900/496,to:85 * 1900/496},
        {y:175 * 1900/496,from:25 * 1900/496,to:105 * 1900/496},
        {y:1100,from:0,to:400},
        {y:1635,from:170,to:280},
        {y:1635,from:0,to:65},
        {y:1465,from:65,to:170},
        {y: 850, from: 360, to: 470},
        {y: 850, from: 500, to: 660},
        {y: 0, from: 4000, to: 4470},
    ],
    bottom: [
        {y:1900,from:0,to:1900},
        {y:90 * 1900/496,from:0 * 1900/496,to:120 * 1900/496},
        {y:200 * 1900/496,from:0 * 1900/496,to:85 * 1900/496},
        {y: 770, from: 1050,to: 1170},
        {y: 880, from: 340,to: 400},
        {y: 1100, from: 0,to: 280},
        {y:1745, from: 1370, to: 1585},
        {y:1465, from: 1585, to: 1730},
        {y:1320, from: 1730, to: 1900},
        {y: 300, from: 4010, to: 4470},

    ]
}
function renderCatScreen(){
    var ctx = myGameArea.context;
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,2100,700);
    ctx.fillStyle = 'black';
    ctx.fillRect(750,400,600,200);
    ctx.fillStyle = 'white';
    ctx.fillRect(752,402,296,96);
    ctx.fillRect(1052,402,296,96);
    ctx.fillRect(752,502,296,96);
    ctx.fillRect(1052,502,296,96);
    ctx.fillStyle = 'black';
    ctx.font = '70px Calibri';
    ctx.fillText('Pat',852,470);
    ctx.fillText('Feed',835,570);
    ctx.fillText('Run away',1060,570);
    ctx.fillText('Battle',1110,470);
    ctx.font = '20px Calibri';
    ctx.fillText(text,750,370);
    ctx.drawImage(imc,64 * (currentCat % 4),64 * Math.floor(currentCat / 4),64,64,922,0,256,256);
    if(!leaving){
        if(myGameArea.click && myGameArea.x > 52 && myGameArea.x < 348 && myGameArea.y > 402 && myGameArea.y < 498){
            if(handWounded){
                text = 'You can\'t pat, your hand has been bitten! Go get it bandaged up. ';
            } else {
                var r = Math.random() * 100;
                if(food == 'Fish'){
                    if(r < 30){
                        if(myCats.length < 10){                    
                            text = 'You have befriended a cat!';
                            var k = prompt('Name the cat?');
                            myCats.push({
                                name: k,
                                num: currentCat,
                                level: playerLevel(),
                                health: (playerLevel() * 5) + Math.floor(Math.random() * 10) + 20,
                                damage: Math.floor(playerLevel() * 2.5) + Math.floor(Math.random() * 3) + 5,
                                toNext: 0,
                            });
                        } else {
                            text = 'You have befriended a cat, but you have too many.'
                        }          
                    setTimeout(() => screenNum = 1,2000);
                    leaving = true;
                    } else if(r < 90){
                        text = 'The cat blatantly ignores your patting.';
                    } else {
                        text = 'The cat bites your hand then runs away.';
                        handWounded = true;
                        setTimeout(() => screenNum = 1,2000);
                    }
                } else if(food == 'Catnip'){
                    if(r < 60){
                        if(myCats.length < 10){
                            text = 'You have befriended a cat!';
                            var k = prompt('Name the cat?');
                            myCats.push({
                                name: k,
                                num: currentCat,
                                level: playerLevel(),
                                health: (playerLevel() * 5) + Math.floor(Math.random() * 10) + 20,
                                damage: Math.floor(playerLevel() * 2.5) + Math.floor(Math.random() * 3) + 5,
                                toNext: 0,
                            });
                        } else {
                            text = 'You have befriended a cat, but you have too many.'
                        }       
                        leaving = true;
                        setTimeout(() => screenNum = 1,2000);
                    } else {
                        text = 'The cat bites your hand then runs away.';
                        handWounded = true;
                        setTimeout(() => screenNum = 1,2000);
                    }
                } else {    
                    if(r < 15){
                        if(myCats.length < 10){
                            text = 'You have befriended a cat!';
                            var k = prompt('Name the cat?');
                            myCats.push({
                                name: k,
                                num: currentCat,
                                level: playerLevel(),
                                health: (playerLevel() * 5) + Math.floor(Math.random() * 10) + 20,
                                damage: Math.floor(playerLevel() * 2.5) + Math.floor(Math.random() * 3) + 5,
                                toNext: 0,
                            });
                        } else {
                            text = 'You have befriended a cat, but you have too many.'
                        }            
                        leaving = true;   
                        setTimeout(() => screenNum = 1,2000);
                    } else if(r < 70){
                        text = 'The cat blatantly ignores your patting.';
                    } else if(r < 80){
                        text = 'You scare the cat and it runs away.';
                        setTimeout(() => screenNum = 1,2000);
                    } else {
                        text = 'The cat bites your hand then runs away.';
                        handWounded = true;
                        setTimeout(() => screenNum = 1,2000);
                    }
                }
                myGameArea.click = false;
            }
        }
        if(myGameArea.click && myGameArea.x > 52 && myGameArea.x < 348 && myGameArea.y > 502 && myGameArea.y < 598){
            screenNum = 3;
        }
        if(myGameArea.click && myGameArea.x > 352 && myGameArea.x < 648 && myGameArea.y > 502 && myGameArea.y < 598){
            screenNum = 1;
        }
        if(myGameArea.click && myGameArea.x > 352 && myGameArea.x < 648 && myGameArea.y > 402 && myGameArea.y < 498){
            if(myCats.length == 0){
                text = 'You have no cats.';
            } else {
                enemymh = (playerLevel() * 5) + Math.floor(Math.random() * 10) + 20;
                enemyh = enemymh;
                enemyd = Math.floor(playerLevel() * 2.5) + Math.floor(Math.random() * 3) + 5;
                screenNum = 5;
            }
        }
    }
}
function fishOrCatnip(){
    var ctx = myGameArea.context;
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,2100,700);
    ctx.fillStyle = 'black';
    ctx.fillRect(750,400,600,100);
    ctx.fillStyle = 'white';
    ctx.fillRect(752,402,296,96);
    ctx.fillRect(1052,402,296,96);
    ctx.fillStyle = 'black';
    ctx.font = '70px Calibri';
    ctx.fillText('Fish',852,470);
    ctx.fillText('Catnip',1135,470);
    ctx.fillText('Fish or catnip?',750,370);
    ctx.drawImage(imf,0,0,16,16,700,636,64,64);
    ctx.fillText(foodAmount.fish,765,685);
    ctx.drawImage(imf,0,16,16,16,850,636,64,64);
    ctx.fillText(foodAmount.catnip,915,685);
    if(myGameArea.click && myGameArea.x > 52 && myGameArea.x < 348 && myGameArea.y > 402 && myGameArea.y < 498){
        food = 'Fish';
        if(foodAmount.fish == 0){
            text = 'You have no fish';
        } else {
            foodAmount.fish--;
            if(Math.random() < 0.9){
                text = 'The cat gobbles up your fish.';
            } else {
                text = 'The cat sniffs the fish, then walks away.';
                setTimeout(() => screenNum = 1,2000);
            }
        }
        screenNum = 2;
        myGameArea.click = false;
    }
    if(myGameArea.click && myGameArea.x > 352 && myGameArea.x < 648 && myGameArea.y > 402 && myGameArea.y < 498){
        food = 'Catnip';
        if(foodAmount.catnip == 0){
            text = 'You have no catnip';
        } else {
            foodAmount.catnip--;
            if(Math.random() < 0.9){
                text = 'The cat gobbles up your catnip.';
            } else {
                text = 'The cat sniffs the catnip, then walks away.';
                setTimeout(() => screenNum = 1,2000);
            }
        }
        screenNum = 2;
        myGameArea.click = false;
    }
}
function invenTory(){
    var ctx = myGameArea.context;
    ctx.fillStyle = '#ffdddd';
    ctx.fillRect(0,0,2100,700);
    for(var x in myCats){
        ctx.fillStyle = x == catSelec ? 'gold' : 'white';
        ctx.fillRect(700 + x * 70,100,70,70);
        ctx.drawImage(imc,64 * (myCats[x].num % 4),64 * Math.floor(myCats[x].num / 4),64,64,x * 70 + 703, 103,64,64);
    }
    if(myGameArea.click && myGameArea.y > 100 && myGameArea.y < 170 && myGameArea.x > 0 && myGameArea.x < 700){
        catSelec = Math.floor(myGameArea.x / 70);
    }
    if(catSelec !== undefined && catSelec >= 0 && catSelec < myCats.length){
        ctx.font = '25px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(myCats[catSelec].name,700,330);
        ctx.fillText('Lvl ' + myCats[catSelec].level,700,360);
        ctx.fillText(myCats[catSelec].health + ' Health points',700,390);
        ctx.fillText(myCats[catSelec].damage + ' Attack strength',700,420);
        ctx.fillText(myCats[catSelec].toNext + ' / ' + myCats[catSelec].level + ' XP to next level.',700,450);

        ctx.fillRect(700,490,100,50);
        ctx.font = '25px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Set free',703,520);
        ctx.drawImage(imc,64 * (myCats[catSelec].num % 4),64 * Math.floor(myCats[catSelec].num / 4),64,64,700,170,128,128);
    }
    if(myGameArea.click && myGameArea.y > 490 && myGameArea.y < 540 && myGameArea.x > 0 && myGameArea.x < 100){
        myCats.splice(catSelec,1);
        myGameArea.click = false;
    }
}
function chooseCat(){
    var ctx = myGameArea.context;
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,2100,700);
    for(var x in myCats){
        ctx.drawImage(imc,64 * (myCats[x].num % 4),64 * Math.floor(myCats[x].num / 4),64,64,x * 70 + 703, 103,64,64);
    }
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Choose a cat to battle',750,200);
    if(myGameArea.click && myGameArea.y > 100 && myGameArea.y < 170 && myGameArea.x > 0 && myGameArea.x < 700){
        catSelec = Math.floor(myGameArea.x / 70);
        if(catSelec < myCats.length){
            screenNum = 6;
            playerh = myCats[catSelec].health;
            text = 'Start the battle!';
            turn = 'Yours';
        }
    }
}
function renderBattle(){
    var ctx = myGameArea.context;
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,2100,700);
    ctx.drawImage(imc,64 * (myCats[catSelec].num % 4),64 * Math.floor(myCats[catSelec].num / 4),64,64,700,50,256,256);
    ctx.drawImage(imc,64 * (currentCat % 4),64 * Math.floor(currentCat / 4),64,64,1144,50,256,256);
    ctx.fillStyle = 'red';
    ctx.fillRect(700,2,256,46);
    ctx.fillRect(1144,2,256,46);
    ctx.fillStyle = 'lime';
    ctx.fillRect(700,2,(playerh * 256)/ myCats[catSelec].health,46);
    ctx.fillRect(1144,2,enemyh / enemymh * 256,46);
    ctx.fillStyle = 'black';
    ctx.fillRect(998,598,104,54);
    ctx.fillStyle = 'white';
    ctx.font = '25px Arial';
    ctx.fillRect(1000,600,100,50);
    ctx.fillStyle = 'black';
    ctx.fillText(text,700,400);
    ctx.fillText(text == 'Start the battle!' ? 'Start' : 'Continue',1000,630);
    if(!leaving){
        if(myGameArea.click && myGameArea.x > 300 && myGameArea.x < 400 && myGameArea.y > 600 && myGameArea.y < 650){
            if(turn == 'Yours'){
                enemyh -= myCats[catSelec].damage;
                if(enemyh <= 0){
                    enemyh = 0;
                    text = 'You win!';
                    myCats[catSelec].toNext++;
                    if(myCats[catSelec].toNext == myCats[catSelec].level){
                        myCats[catSelec].toNext = 0;
                        myCats[catSelec].level++;
                        myCats[catSelec].health += Math.floor(Math.random() * 3) + 4;
                        myCats[catSelec].damage += Math.floor(Math.random() * 2) + 2;
                    }
                    coins += 10;
                    setTimeout(() => screenNum = 1,2000);
                    leaving = true;
                } else {
                    text = 'Your cat attacks. ';
                    turn = 'Enemys';
                }
            } else {
                playerh -= myCats[catSelec].damage;
                if(playerh <= 0){
                    playerh = 0;
                    text = 'You lose. Better luck next time!';
                    setTimeout(() => screenNum = 1,2000);
                    leaving = true;
                } else {
                    text = 'The other cat attacks. ';
                    turn = 'Yours';
                }
            }
            myGameArea.click = false;
        }
    }
}
function shop(){
    var ctx = myGameArea.context;
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,2100,700);
    ctx.drawImage(imn,922,0,256,512);
    ctx.fillStyle = '#983a11';
    ctx.fillRect(700,300,700,200);
    ctx.drawImage(imf,0,32,16,16,1200,0,64,64);
    ctx.font = '35px Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText(coins,1264,50);
    ctx.drawImage(imf,0,48,16,16,750,330,64,64);
    ctx.font = '20px Calibri';
    ctx.fillText('Bandages for your hand',700,415);
    ctx.fillText('10',700,445);
    ctx.drawImage(imf,0,32,16,16,730,430,16,16);
    if(myGameArea.click && myGameArea.x > 50 && myGameArea.x < 114 && myGameArea.y > 330 && myGameArea.y < 404){
        if(coins >= 10){
            coins -= 10;
            handWounded = false;
        }
        myGameArea.click = false;
    }
    ctx.drawImage(imf,0,0,16,16,1000,330,64,64);
    ctx.fillText('Fish',950,415);
    ctx.fillText('20',950,445);
    ctx.drawImage(imf,0,32,16,16,980,430,16,16);
    if(myGameArea.click && myGameArea.x > 300 && myGameArea.x < 364 && myGameArea.y > 330 && myGameArea.y < 404){
        myGameArea.click = false;
        if(coins >= 20){
            coins -= 20;
            foodAmount.fish++;
        }
    }
    ctx.drawImage(imf,0,16,16,16,1300,330,64,64);
    ctx.fillText('Catnip',1250,415);
    ctx.fillText('50',1250,445);
    ctx.drawImage(imf,0,32,16,16,1280,430,16,16);
    if(myGameArea.click && myGameArea.x > 600 && myGameArea.x < 664 && myGameArea.y > 330 && myGameArea.y < 404){
        myGameArea.click = false;
        if(coins >= 50){
            coins -= 50;
            foodAmount.catnip++;
        }
    }
    ctx.drawImage(imf,0,64,16,16,700,0,64,64);
    if(myGameArea.click && myGameArea.x > 0 && myGameArea.y > 0&& myGameArea.x < 64 && myGameArea.y < 64){
        screenNum = 1;
        myGameArea.click = false;
        xpos = 840;
        ypos = 1350;
    }
}