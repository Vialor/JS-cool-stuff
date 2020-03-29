var board = new Array();
var score = 0;

$(function(){
    newgame();
});

function newgame(){
    // initialize the grid
    init();
    // generate two random num
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

            if (board[i][j] == 0){
                curNumCell.css('top', getPos(i));
                curNumCell.css('left', getPos(j));
            } else{

            }
        }
    }

}
