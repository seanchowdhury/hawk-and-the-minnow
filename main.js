import { game, splashAudio, completeAudio, deathAudio } from './lib/game';

const thanksWill = new Audio('/home/sean/Desktop/hawk_and_minnow/app/assets/sounds/seansong.mp3');
thanksWill.volume = .5;
if (typeof thanksWill.loop == 'boolean')
{
    thanksWill.loop = true;
}
else
{
    thanksWill.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('mute').addEventListener('click', (e) => {
      if ( thanksWill.muted ) {
        splashAudio.muted = false;
        deathAudio.muted = false;
        completeAudio.muted = false;
        thanksWill.muted = false;
        e.target.innerHTML = 'mute'
      }
      else {
        splashAudio.muted = true;
        deathAudio.muted = true;
        completeAudio.muted = true;
        thanksWill.muted = true;
        e.target.innerHTML = 'unmute'
      }
  })

  const startGame = document.getElementById('start')
  startGame.addEventListener('click', (e) => {
    game();
    thanksWill.play();
    startGame.style.display = 'none';
    fade(document.getElementById('title'));
  })
})

const fade = (el) => {
    const timer = setInterval(() => {
        if (op <= 0.1){
            clearInterval(timer);
            el.style.display = 'none';
        }
        el.style.opacity = op;
        el.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}
