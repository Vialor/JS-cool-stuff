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
}

function updateBoardView(){
    $(".number-cell").remove();
    for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var curNumCell = $('#number-cell-'+i+'-'+j);
            if (board[i][j] == 2048) board[i][j] = 0; // remove 2048
            if (board[i][j] == 0){
                curNumCell.css('width', '0');
                curNumCell.css('height', '0');
            } else {
                curNumCell.css('width', '100px');
                curNumCell.css('height', '100px');
                curNumCell.css('top', getPos(i));
                curNumCell.css('left', getPos(j));
                curNumCell.css('background-color', getNumCellBackgroundColor(board[i][j]));
                curNumCell.css('color', getNumColor(board[i][j]));
                curNumCell.txt(board[i][j]);
            }
        }
    }
}

// generate a new number randomly
function generateNumber(){
    if (noSpace(board)) return false; // lost condition

    // random position
    let randx = parseInt(Math.floor(Math.random()*4));
    let randy = parseInt(Math.floor(Math.random()*4));
    while (board[randx][randy]!=0){
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }

    // random number
    let newnum = Math.random()<.5 ? 2 : 4;

    // show res
    board[randx][randy] = newnum;
    generateNumberAnimation(randx, randy, newnum);
    return true;
}