function generateNumberWithAnimation(i, j, randnum){
    let curNumCell = $("#number-cell-"+i+"-"+j);
    curNumCell.css('background-color', getNumCellBackgroundColor(randnum));
    curNumCell.css('color', getNumColor(randnum));
    curNumCell.text(randnum);

    curNumCell.animate({
        width: "100px",
        height: "100px",
        top: getPos(i),
        left: getPos(j)
    }, 100);
}

function disappearAnimation(i, j){
    let curNumCell = $("#number-cell-"+i+"-"+j);

    curNumCell.animate({
        width: "0",
        height: "0",
        top: getPos(i)+50,
        left: getPos(j)+50
    }, 1000);
}

function moveAnimation(fromx, fromy, tox, toy){
    let curNumCell = $("#number-cell-"+fromx+"-"+fromy);
    curNumCell.animate({
        top: getPos(tox),
        left: getPos(toy)
    }, 200);
}
