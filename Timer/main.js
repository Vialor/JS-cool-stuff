'use strict'

function $(selector, base = null) {
    base = (base === null) ? document : base;
    return base.querySelector(selector);
}

function $$(selector, base = null) {
    base = (base === null) ? document : base;
    return Array.from(base.querySelectorAll(selector));
}

var today = new Date();

// stopwatch and countdown
var num = 0;
function counter(){
    num++;
    if (num > 5) { //exit condition
        clearInterval(timer);
        return;
    }
    $("#date").innerHTML = today.toUTCString();
    if (true) $("#time").innerHTML = parseInt($("#time").innerHTML) + 1;
    else $("#time").innerHTML = parseInt($("#time").innerHTML) - 1;
}
var timer = setInterval(counter, 1000);