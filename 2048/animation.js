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

function moveAnimation(fromx, fromy, tox, toy){
    let curNumCell = $("#number-cell-"+fromx+"-"+fromy);
    curNumCell.animate({
        top: getPos(tox),
        left: getPos(toy)
    }, 200);
}
