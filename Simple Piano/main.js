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
        if (e.keyCode == 66){ // beat
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
        } else { // play notes
            key.classList.add('playing');
            audio.currentTime = 0;
            audio.play();
        }
    }
   
    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    window.addEventListener('keydown',playSound);
};
