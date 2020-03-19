onload = function(){
    var auto_scroll = document.getElementById('auto-scroll');
    var auto_left= document.getElementById('auto-left');
    var auto_right= document.getElementById('auto-right');
    var ul = auto_scroll.getElementsByTagName('ul')[0];
    var speed = -2;
    var auto_scroll_timer = null;
    ul.innerHTML += ul.innerHTML;

    function autoScroll(){
        if (ul.offsetLeft < -ul.offsetWidth/2){
            ul.style.left = 0;
        } // go left
        if (ul.offsetLeft > 0){
            ul.style.left = -ul.offsetWidth/2 + 'px';
        } // go right
        ul.style.left = ul.offsetLeft + speed +'px';
    };

    auto_scroll.onmouseover = function(){
        clearInterval(auto_scroll_timer);
    };
    auto_scroll.onmouseout = function(){
        auto_scroll_timer = setInterval(autoScroll, 30);
    };
    auto_left.onclick = function(){
        speed = -2;
    };
    auto_right.onclick = function(){
        console.log("222");
        speed = 2;
    };
};