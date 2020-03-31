'use strict'

function $(selector, base = null) {
    base = (base === null) ? document : base;
    return base.querySelector(selector);
}

function $$(selector, base = null) {
    base = (base === null) ? document : base;
    return Array.from(base.querySelectorAll(selector));
}

let userInfo;

function checkForm() {
    var name = $("#username");
    var pwd = $('#password');
    for (let i=0; i<userInfo.length; i++){
        let account = userInfo[i];
        if (account["name"]==name.value&&account["password"]==pwd.value){
            alert("Pass!");
            return true;
        }
    }
    alert("Fail TAT");
    return false;
}

window.onload = function(){
    //read JSON
    let requestURL = './data.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'text';
    request.send();
    request.onload = function() {
        userInfo = JSON.parse(request.response)["userInfo"];
    };

    // btn listener
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
    };
};
