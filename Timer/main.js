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

function showNote(){
    $(".notification").style.display = "block";
    $(".notification").innerText = $(".note-text").value;
    $(".timer").classList.add("blur");
}

function hideNote(){
    $(".notification").style.display = "none";
    $(".timer").classList.remove("blur");
}


// onload
onload = function(){
    // var
    const menu = $(".menu");
    const option = $(".option");
    const notebook = $(".note-book");
    let timer = null;

    function clockmode(){
        clearInterval(timer);
        $(".countdown-panel").style.display = "none";
        $(".stopwatch-panel").style.display = "none";
            function counter(){
                var today = new Date();
                $("#date").innerHTML = today.toString();
                $("#hour").innerText = toDou(today.getHours());
                $("#minute").innerText = toDou(today.getMinutes());
                $("#second").innerText = toDou(today.getSeconds());
            }
            timer = setInterval(counter, 1000);
            counter(); //initialize
    }

    function stopwatchmode(){
        clearInterval(timer);
        $(".countdown-panel").style.display = "none";
        $(".stopwatch-panel").style.display = "block";
        $(".play").style.display = "block";
        $(".pause").style.display = "none";
        $("#date").innerHTML = '';
        let timestamp = 0;
        counter();

        function counter(){
            const hour = Math.floor(timestamp / 60 / 60);
            const minute = Math.floor(timestamp / 60) - 60 * hour;
            const second = timestamp % 60;
            $("#hour").innerText = toDou(hour);
            $("#minute").innerText = toDou(minute);
            $("#second").innerText = toDou(second);
        }
        
        $(".play").onclick = function(){
            $(".play").style.display = "none";
            $(".pause").style.display = "block";
            counter();
            timestamp++;
            timer = setInterval(function(){
                counter();
                timestamp++;
            }, 1000);
        };
        $(".restart").onclick = function(){
            $(".play").style.display = "block";
            $(".pause").style.display = "none";
            clearInterval(timer);
            timestamp = 0;
            counter();
        };
        $(".pause").onclick = function(){
            $(".play").style.display = "block";
            $(".pause").style.display = "none";
            clearInterval(timer);
        }
    }

    function countdownmode(){
        clearInterval(timer);
        $(".stopwatch-panel").style.display = "none";
        $(".countdown-panel").style.display = "block";
    }

    // timer main logic
    $(".mode0").addEventListener('click', clockmode);
    $(".mode1").addEventListener('click', stopwatchmode);
    $(".mode2").addEventListener('click', countdownmode);
    clockmode(); //initialize

    //menu behavior
    let menuTimer = null;
    option.onmouseover = menu.onmouseover = function(){
        clearInterval(menuTimer);
        option.style.visibility = 'visible';
    };
    option.onmouseout = menu.onmouseout = function(){
        menuTimer = setTimeout(function(){
            option.style.visibility = 'hidden'}, 200);
    };

    //notebook behavior
    let noteTimer = null;
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
    notebook.onmouseover = $('.note-tab').onmouseover = function(){
        showNotes(0, 10);
    };
    notebook.onmouseout = $('.note-tab').onmouseover = function(){
        showNotes(-120, -10);
    };

    // notification
    $(".note-btn").onclick = function(ev){
        showNote();
        ev.cancelBubble = true;
    }
    document.onclick = function(){
        hideNote();
    }

}
