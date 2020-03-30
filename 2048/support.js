// num cell and grid cell position
function getPos(x){
    return 20 + 120*x;
}

// num cell helper func
function getNumCellBackgroundColor(num){
    switch(num){
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#99cc00"; break;
        case 1024: return "#33b5e5"; break;
    }
    return "black"; // should not happen
}

function getNumColor(num){
    return num<=4 ? "#776e65" : "white";
}

// if the board has no space
function noSpace(board){
    for(let i=0; i<4; i++){
        for (let j=0; j<4; j++){
            if (board[i][j]==0) return false;
        }
    }
    return true;
}

function noBlockHorizontal(row, col1, col2, board){
    // col1 < col2, if there is num between col1 and col2
    for (let i=col1+1; i<col2; i++){
        if (board[row][i] != 0) return false;
    }
    return true;
}

function noBlockVertical(col, row1, row2, board){
    // row1 < row2
    for (let i=row1+1; i<row2; i++){
        if (board[i][col] != 0) return false;
    }
    return true;
}
