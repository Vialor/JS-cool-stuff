window.onload = function(){
    var beatTimer = null;
    var isBeating = false;
    var beatInterval = 1000;

    function removeTransition(e) {
        if(e.propertyName !== 'transform')return;
        e.target.classList.remove('playing');
    }


    function playSound(e){
        const audio =  document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
        if(!audio) return;
        if (e.keyCode == 66){
            if(isBeating==true){
                isBeating = false;
                clearInterval(beatTimer);
            } else {
                isBeating = true;
                beatTimer = setInterval(function(){ 
                        key.classList.add('playing');
                        audio.play();
                        setTimeout(function(){ key.classList.remove('playing'); }, beatInterval*.9);
                 }, beatInterval);
            }
        } else {
            key.classList.add('playing');
            audio.currentTime = 0;
            audio.play();
        }
    }
   
    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    window.addEventListener('keydown',playSound);

    // beater
    var status = 0;
    function keyB(){
        const audio =  document.querySelector(`audio[data-key="66"]`);
        const key = document.getElementById('beat');
        var beat = null;
        if (status == 0){
            status = 1;
            beat = setInterval(function(){ 
            // key.classList.add('playing');
                audio.play();
                console.log("aaa");
            // key.classList.remove('playing');
            }, 1000);
        }
        else{
            status = 0;
            clearInterval(beat);
        }
    }
};
