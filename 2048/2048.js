var board = new Array();
var score = 0;

$(function(){
    newgame();
});

function newgame(){
    // initialize the grid
    init();
    // generate two random num
    generateNumber();
    generateNumber();
}

function init(){
    $("#grid-container").css("display", "block");
    $("#game-over").css("display", "none");

    for (let i = 0; i<4; i++){
        board[i] = new Array();
        for (let j = 0; j<4; j++){
            board[i][j] = 0;

            var gridCell = $("#cell-"+i+"-"+j);
            gridCell.css("top", getPos(i));
            gridCell.css("left", getPos(j));
        }
    }
    updateBoardView();
    score = 0;
}

function updateBoardView(){
    $(".number-cell").remove();
    for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var curNumCell = $('#number-cell-'+i+'-'+j);
            // if (board[i][j] == 16) {
            //     // remove 2048
            //     disappearAnimation(i, j);
            //     board[i][j] = 0;
            //     // setTimeout("board[i][j] = 0", 1000); // wait for animation
            // } else 
            if (board[i][j] == 0){
                curNumCell.css('width', '0');
                curNumCell.css('height', '0');
                curNumCell.css('top', getPos(i)+50); // 50: do generate animation in the middle
                curNumCell.css('left', getPos(j)+50);
            } else {
                curNumCell.css('width', '100px');
                curNumCell.css('height', '100px');
                curNumCell.css('top', getPos(i));
                curNumCell.css('left', getPos(j));
                curNumCell.css('background-color', getNumCellBackgroundColor(board[i][j]));
                curNumCell.css('color', getNumColor(board[i][j]));
                curNumCell.text(board[i][j]);
            }
        }
    }
}

// generate a new number randomly
function generateNumber(){
    if (noSpace(board)) {
        // game over
        $("#grid-container").css("display", "none");
        $("#game-over").css("display", "block");
        return;
    }

    // random position
    let randx = parseInt(Math.floor(Math.random()*4));
    let randy = parseInt(Math.floor(Math.random()*4));
    while (board[randx][randy]!=0){
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }

    // random number
    let newnum = Math.random()<.5 ? 2 : 4;
    
    board[randx][randy] = newnum;
    generateNumberWithAnimation(randx, randy, newnum);
}

// player movement control
$(document).keydown(function(ev){
    switch(ev.keyCode){
        case 37: 
            moveLeft(board);
            $(".score").text(score);
            generateNumber();
            break;
        case 38: 
            moveUp(board);
            $(".score").text(score);
            generateNumber();
            break;
        case 39: 
            moveRight(board);
            $(".score").text(score);
            generateNumber();
            break;
        case 40: 
            moveDown(board);
            $(".score").text(score);
            generateNumber();
            break;
        default: break;
    }
});

function moveLeft(board){
    for (let i=0; i<4; i++){
        for (let j=1; j<4; j++){ // the order of j from 1 to 4 is important
            if (board[i][j]!=0){
                for (let k=0; k<j; k++){ // the order of k from 0 to j is important
                    if ((board[i][k]==0||board[i][k]==board[i][j]) && noBlockHorizontal(i, k, j, board)){
                        moveAnimation(i, j, i, k);
                        if (board[i][k]==board[i][j]) score += board[i][k];
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }

    // above is juat animation, this is the actual move
    // setTimeout: wait for the animation
    setTimeout(updateBoardView, 200);
}

function moveRight(board){
    for (let i=0; i<4; i++){
        for (let j=2; j>=0; j--){
            if (board[i][j]!=0){
                for (let k=3; k>j; k--){
                    if ((board[i][k]==0||board[i][k]==board[i][j]) && noBlockHorizontal(i, j, k, board)){
                        moveAnimation(i, j, i, k);
                        if (board[i][k]==board[i][j]) score += board[i][k];
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
}

function moveUp(board){
    for (let i=1; i<4; i++){
        for (let j=0; j<4; j++){
            if (board[i][j]!=0){
                for (let k=0; k<i; k++){
                    if ((board[k][j]==0||board[k][j]==board[i][j]) && noBlockVertical(j, k, i, board)){
                        moveAnimation(i, j, k, j);
                        if (board[i][k]==board[i][j]) score += board[i][k];
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
}

function moveDown(board){
    for (let i=2; i>=0; i--){
        for (let j=0; j<4; j++){
            if (board[i][j]!=0){
                for (let k=3; k>i; k--){
                    if ((board[k][j]==0||board[k][j]==board[i][j]) && noBlockVertical(j, i, k, board)){
                        moveAnimation(i, j, k, j);
                        if (board[i][k]==board[i][j]) score += board[i][k];
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView, 200);
}