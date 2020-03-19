'use strict'

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

function week(n){
    var weeklst = [];
}

onload = function(){
    var timer = null;
    function counter(){
        var today = new Date();
        if (false) { //exit condition
            clearInterval(timer);
            return;
        }
        $("#date").innerHTML = today.toUTCString();
        $("#hour").innerText = toDou(today.getHours());
        $("#minute").innerText = toDou(today.getMinutes());
        $("#second").innerText = toDou(today.getSeconds());
    }
    timer = setInterval(counter, 1000);
    counter(); //initialize

    //menu behavior
    var menu = $("#menu");
    var option = $("#option");
    var menuTimer = null;
    option.onmouseover = menu.onmouseover = function(){
        clearInterval(menuTimer);
        option.style.display = 'block'
    };
    option.onmouseout = menu.onmouseout = function(){
        menuTimer = setTimeout(function(){
            option.style.display = 'none'}, 200);
    };
}
