import { game, splashAudio, completeAudio, deathAudio } from './lib/game';

const thanksWill = new Audio('app/assets/sounds/seansong.mp3');
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

const background = new Image();
background.src = "app/assets/images/clouds1.jpg";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  background.onload = () => { ctx.drawImage(background, 0, 0) };


    document.getElementById('mute').addEventListener('click', (e) => {
      if ( thanksWill.muted ) {
        splashAudio.muted = false;
        deathAudio.muted = false;
        completeAudio.muted = false;
        thanksWill.muted = false;
        e.target.src = "app/assets/images/Icons8-Windows-8-Media-Controls-Volume-Up.ico"
      }
      else {
        splashAudio.muted = true;
        deathAudio.muted = true;
        completeAudio.muted = true;
        thanksWill.muted = true;
        e.target.src = "app/assets/images/Icons8-Windows-8-Media-Controls-Mute.ico"
      }
  })


  const startGame = (e) => {
    if (e.keyCode === 13) {
      document.removeEventListener('keydown', startGame);
      game();
      thanksWill.play();
      document.getElementById('start').style.display = 'none';
      const titleCard = document.getElementById('title');
      titleCard.style.opacity = '1';
      fade(titleCard);
    }
  }

  document.addEventListener('keydown', startGame)
})

const fade = (el) => {
    let op = 1;
    let fader = 0.006;
    const timer = setInterval(() => {
        if (op <= 0.1){
            clearInterval(timer);
            el.style.display = 'none';
        } else if (op <= 0.6) {
          fader = 0.1;
        }
        el.style.opacity = op;
        el.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * fader;
    }, 50);
}

window.addEventListener("keydown", function(e) {
if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
}
}, false);
