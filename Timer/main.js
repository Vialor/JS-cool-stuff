'use strict'
// basic func
function $(selector, base = null) {
    base = (base === null) ? document : base;
    return base.querySelector(selector);
}

function $$(selector, base = null) {
    base = (base === null) ? document : base;
    return Array.from(base.querySelectorAll(selector));
}

function toDou(n){
    return (n<10) ? '0'+n : n;
}

// onload
onload = function(){
    // var
    var timer = null;
    var noteTimer = null;
    var menuTimer = null;
    var menu = $("#menu");
    var option = $("#option");
    var notebook = $("#note-book");

    // timer
    function counter(){
        var today = new Date();
        if (false) { //exit condition
            clearInterval(timer);
            return;
        }
        $("#date").innerHTML = today.toString();
        $("#hour").innerText = toDou(today.getHours());
        $("#minute").innerText = toDou(today.getMinutes());
        $("#second").innerText = toDou(today.getSeconds());
    }
    timer = setInterval(counter, 1000);
    counter(); //initialize

    //menu behavior
    option.onmouseover = menu.onmouseover = function(){
        clearInterval(menuTimer);
        option.style.visibility = 'visible'
    };
    option.onmouseout = menu.onmouseout = function(){
        menuTimer = setTimeout(function(){
            option.style.visibility = 'hidden'}, 200);
    };

    //notebook behavior
    function showNotes(stop, speed){
        clearInterval(noteTimer);
        noteTimer = setInterval(function(){
            if (notebook.offsetLeft == stop){
                clearInterval(noteTimer);
            } else {
                notebook.style.left = notebook.offsetLeft + speed +'px';
            }
        }, 30);
    }
    notebook.onmouseover = $('#note-tab').onmouseover = function(){
        showNotes(0, 10);
    };
    notebook.onmouseout = $('#note-tab').onmouseover = function(){
        showNotes(-120, -10);
    };

}
