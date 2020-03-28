'use strict'

function $(selector, base = null) {
    base = (base === null) ? document : base;
    return base.querySelector(selector);
}

function $$(selector, base = null) {
    base = (base === null) ? document : base;
    return Array.from(base.querySelectorAll(selector));
}

window.onload = function(){
    $("#login-btn").addEventListener("click", function(){
        $("#login-form").style.display='block';});
    $("#close").addEventListener("click", function(){
        $("#login-form").style.display='none';});

    // drag login form
    $("#login-form").onmousedown = function(ev){
        let disX = ev.clientX - $("#login-form").offsetLeft;
        let disY = ev.clientY - $("#login-form").offsetTop;
        document.onmousemove = function(ev){
            $("#login-form").style.left = ev.clientX - disX + 'px';
            $("#login-form").style.top = ev.clientY - disY + 'px';

            // border control
            if ($("#login-form").offsetLeft < 0){
                $("#login-form").style.left = 0 + 'px';
            } else if ($("#login-form").offsetLeft >
                document.documentElement.clientWidth-$("#login-form").offsetWidth){
                $("#login-form").style.left = 
                    document.documentElement.clientWidth-$("#login-form").offsetWidth + 'px';
            }
            if ($("#login-form").offsetTop < 0){
                $("#login-form").style.top = 0 + 'px';
            } else if ($("#login-form").offsetTop >
            document.documentElement.clientHeight-$("#login-form").offsetHeight){
            $("#login-form").style.top = 
                document.documentElement.clientHeight-$("#login-form").offsetHeight + 'px';
            }
        };
        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
        };
        return false; // prevent default action
    };
};
