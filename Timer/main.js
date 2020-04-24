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

function displayTime(timestamp){
    const hour = Math.floor(timestamp / 60 / 60);
    const min = Math.floor(timestamp / 60) - 60 * hour;
    const sec = timestamp % 60;
    $("#hour").innerText = toDou(hour);
    $("#minute").innerText = toDou(min);
    $("#second").innerText = toDou(sec);
}

function readTime(timeStr){
    // 00:00:00 to timestamp
    const hour = parseInt(timeStr.slice(0, 2));
    const min = parseInt(timeStr.slice(3, 5));
    const sec = parseInt(timeStr.slice(6));
    return sec + 60*min + 3600*hour;
}

const setReg = /^\d{2}[:][0-5]\d[:][0-5]\d$/
let timer = null;

// onload
onload = function(){
    // var
    const menu = $(".menu");
    const option = $(".option");
    const notebook = $(".note-book");

    function clockmode(){
        clearInterval(timer);
        $(".countdown-panel").style.display = "none";
        $(".stopwatch-panel").style.display = "none";
            function displayTime(){
                var today = new Date();
                $("#date").innerHTML = today.toString();
                $("#hour").innerText = toDou(today.getHours());
                $("#minute").innerText = toDou(today.getMinutes());
                $("#second").innerText = toDou(today.getSeconds());
            }
            timer = setInterval(displayTime, 1000);
            displayTime(); //initialize
    }

    function stopwatchmode(){
        // record order
        let order = 1;

        clearInterval(timer);
        $(".countdown-panel").style.display = "none";
        $(".stopwatch-panel").style.display = "block";
        $(".play1").style.display = "block";
        $(".pause1").style.display = "none";
        $("#date").innerHTML = '';
        let timestamp = 0;
        displayTime(timestamp);
        
        $(".play").onclick = function(){
            $(".play1").style.display = "none";
            $(".pause1").style.display = "block";
            displayTime(timestamp);
            timer = setInterval(function(){
                timestamp++;
                displayTime(timestamp);
            }, 1000);
        };
        $(".restart").onclick = function(){
            $(".play1").style.display = "block";
            $(".pause1").style.display = "none";
            clearInterval(timer);
            timestamp = 0;
            displayTime(timestamp);

            // clear record
            const record = $(".stopwatch-record");
            while (record.firstChild) {
                record.removeChild(record.lastChild);
            }
            order = 1;
        };
        $(".pause").onclick = function(){
            $(".play1").style.display = "block";
            $(".pause1").style.display = "none";
            clearInterval(timer);
        }
        $(".plus").onclick = function(){
            const newNode = document.createElement("div");
            newNode.className = "time-record";

            const hour = Math.floor(timestamp / 60 / 60);
            const minute = Math.floor(timestamp / 60) - 60 * hour;
            const second = timestamp % 60;
            const timeStr = order + ". " + toDou(hour) + ":" + toDou(minute) + ":" + toDou(second);
            order++;
            newNode.textContent = timeStr;

            $(".stopwatch-record").appendChild(newNode);
        }
    }

    function countdownmode(){
        clearInterval(timer);
        $(".stopwatch-panel").style.display = "none";
        $(".countdown-panel").style.display = "block";
        $(".play2").style.display = "block";
        $(".pause2").style.display = "none";
        $("#date").innerHTML = '';

        let timestamp = 0;
        displayTime(timestamp);
        
        $("#set-time-btn").onclick = function(){
            const timeStr = $(".note-content").value;
            if (setReg.test(timeStr)){
                timestamp = readTime(timeStr);
                displayTime(timestamp);
            } else{
                alert("Invalid input. Please try again");
            }
        };

        $(".play2").onclick = function(){
            $(".play2").style.display = "none";
            $(".pause2").style.display = "block";
            displayTime(timestamp);
            if (timestamp!=0){
                timer = setInterval(function(){
                    if (timestamp==0){
                        $(".play2").style.display = "block";
                        $(".pause2").style.display = "none";
                        clearInterval(timer);
                        const audio = new Audio('clock_sound.wav');
                        audio.play();
                        return;
                    }
                    timestamp--;
                    displayTime(timestamp);
                }, 1000);
            }
        };

        $(".pause2").onclick = function(){
            $(".play2").style.display = "block";
            $(".pause2").style.display = "none";
            clearInterval(timer);
        }
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
