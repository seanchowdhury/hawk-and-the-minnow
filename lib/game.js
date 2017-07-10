import Player from './player';
import Platform from './platform';
import Exit from './exit';
import { levels } from './levelCreateUtil';

const roundRect = (ctx, x, y, width, height, radius, fill, stroke) => {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }

  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

export const splashAudio = new Audio('app/assets/sounds/splash2.wav');
splashAudio.volume = 0.15;
export const deathAudio = new Audio('app/assets/sounds/deathsound.wav');
deathAudio.volume = 0.4;
export const completeAudio = new Audio('app/assets/sounds/levelcomplete2.wav');
completeAudio.volume = .4;
const background = new Image();
background.src = "app/assets/images/clouds1.jpg";

const clamp = (value, min, max) => {
  if(value < min) return min;
  else if(value > max) return max;
  return value;
}

let vx = 0;
const platformColor = 'rgb(19, 44, 86)'
let levelCounter = 0;
let level = levels[levelCounter];
let player = level.player;
let exit = level.exit;
let platformArray = level.platformArray;
let renderArray = level.renderArray;
let showHelp = [false, false, false, false, false, false, false, false];

export const game = () => {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  background.onload = () => {
    var ptrn = ctx.createPattern(background, 'repeat-x');
    ctx.fillStyle = ptrn;
  }
  const renderLevel = () => {
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw background
    ctx.drawImage(background,vx,0);
    ctx.drawImage(background, background.width-Math.abs(vx), 0);
    //control camera
    if (Math.abs(vx) > background.width) {
      vx = 0;
    }
    vx -= 0.1;
    var camX = clamp(-player.xPos + canvas.width/2, 0, 2000 - canvas.width);
    var camY = clamp(-player.yPos + canvas.height/2, 0, 2000 - canvas.height);
    //draw text
    ctx.translate( camX, camY );
    ctx.font="15px Press-Start-2P";
    ctx.fillStyle = "black";
    renderText();
    //draw platforms
    ctx.fillStyle = "rgba(0, 75, 150, .8)";
    ctx.lineWidth = 2;
    if (player.inWater) {
      ctx.strokeStyle = `#${exit.color}`;
    } else {
      ctx.strokeStyle = 'white';
    }
    renderArray.forEach((platform) => {
      roundRect(ctx, platform[0], platform[1], platform[2], platform[3], 10, platformColor, platform[4])
    })
    //draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.xPos, player.yPos, player.width, player.height)
    //draw exit
    ctx.fillStyle = `${exit.color}`;
    ctx.lineWidth=5;
    ctx.strokeStyle = `${exit.borderColor}`;
    roundRect(ctx, exit.xPos, exit.yPos, exit.width, exit.height, 10, exit.color, exit.borderColor);
  }

  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000/60);
    };
  })();

  const yCollisionCheck = () => {
    platformArray.some((platform) => {
      if (player.xPos+player.width > platform.xPos && player.xPos < platform.xPos + platform.width){
        if (player.yPos + player.height >= platform.yPos && player.yPos < platform.yPos + player.height) {
          player.yPos = platform.yPos - player.height;
          player.isStopped = true;
          player.ySpeed = 0;
          return true;
        } else if (player.yPos <= platform.yPos + platform.height && player.yPos > platform.yPos) {
          player.yPos = platform.yPos + platform.height;
          player.ySpeed = 0.5;
          return true;
        }
        player.isStopped = false;
      } else {
        player.isStopped = false;
      }
    })
  }

  const xCollisionCheck = () => {
    platformArray.some((platform) => {
      if (player.yPos+player.height > platform.yPos && player.yPos < platform.yPos + platform.height){
        if(player.xPos + player.width >= platform.xPos && player.xPos < platform.xPos + (platform.width / 2) ) {
          player.xPos = platform.xPos - player.width - 1;
          player.rightBlocked = true;
        }
        if(player.xPos <= platform.xPos + platform.width && player.xPos + player.width > platform.xPos){
          player.xPos = platform.xPos + platform.width + 1;
          player.leftBlocked = true;
        }
      }
    })
  }

  const divingCollisionCheck = () => {
    platformArray.some((platform) => {
      if (player.xPos + player.width >= platform.xPos && player.xPos <= platform.xPos + platform.width ) {
        if (player.yPos+player.height >= platform.yPos && player.yPos < platform.yPos + platform.height) {
          splashAudio.play();
          player.inWater = true;
          return true;
        }
        player.inWater = false;
      }

    })
  }

  const breachingCollisionCheck = () => {
    platformArray.some((platform) => {
      if (player.xPos + player.width >= platform.xPos && player.xPos <= platform.xPos + platform.width ) {
        if (player.yPos + player.height >= platform.yPos && player.yPos < platform.yPos + platform.height) {
          player.inWater = true;
          return true;
        }
      }
      player.inWater = false;
    })
  }

  const checkFinishLevel = () => {
    if (player.xPos + player.width > exit.xPos && player.xPos <= exit.xPos + exit.width ) {
      if (player.yPos + player.height >= exit.yPos && player.yPos < exit.yPos + exit.height) {
        completeAudio.play();
        level = levels[levelCounter += 1]
        player = level.player;
        exit = level.exit;
        platformArray = level.platformArray;
        renderArray = level.renderArray;
        player.xSpeed = 0;
        player.ySpeed = 0;
        switch (levelCounter) {
          case 1:
            document.getElementById('subtitle').style.display = 'block';
            break;
          case 7:
            window.setTimeout( () => {
              const congrats = new Audio('app/assets/sounds/congrats.mp3');
              congrats.volume = 0.4;
              congrats.play();
            }, 2000)
        default:
            break;
        }
      }
    }
  }

  const renderText = () => {
    switch (levelCounter) {
      case 0:
        ctx.fillText("Use the left and right arrow keys to move.",-140,400);
        ctx.fillText("Press the up arrow key to jump.", 170, 100);
        break;
      case 1:
        ctx.fillText("You can leap over the highest obstacles! I believe in you!", -400, 100)
        if (player.xPos >= 438) {
          window.setTimeout( () => {
            showHelp[1] = true;
          }, 3000)
        }
        if (showHelp[1] === true) {
          ctx.fillText("Sorry you were tricked...", 325, 375)
          ctx.fillText("Try holding the spacebar or 'Z' key while", 325, 400)
          ctx.fillText("in air/jumping and dive into the water!", 325, 425)
        }
        break;
      case 2:
        if (player.xPos >= 793) {
          window.setTimeout( () => {
            showHelp[2] = true;
          }, 5000)
        }
        if (showHelp[2] === true) {
          ctx.fillText("I wonder if there is a fancy", 715, 325 )
          ctx.fillText("ability that could help us here...", 715, 350 )
          ctx.fillText("pssst, it's the 'Z' key!", 715, 375 )
        }
        break;
      case 3:
        ctx.fillText("Whatever you do, don't panic!", -450, -1100);
        ctx.fillText("or was it look down...", -450, -600);
        if (player.xPos >= 910 && player.yPos <= -1000) {
          window.setTimeout( () => {
            showHelp[3] = true;
          }, 3000)
        }
        if (showHelp[3] === true) {
          ctx.fillText("It almost looked like you were", 380, -1100);
          ctx.fillText('flying when you raced up here', 380, -1075);
          ctx.fillText('You got this!', 970, 450)
        }
        break;
      case 5:
        if (player.xPos >= 210 && player.xPos <= 230 && player.yPos >= 270 && player.yPos <= 300) {
          showHelp[5] = true;
        }
        if (showHelp[5] === true) {
          ctx.fillText("Brute force huh?", 30, 250)
          ctx.fillText("I mean that's one way", 0, 275)
        }
        break;
      case 7:
        ctx.fillText("Congrats! Those were all the levels I've made so far.", -470, 150);
        ctx.fillText("Here are some random platforms to mess around with.", -470, 175);
        ctx.fillText("If you want an even better version of this game", -470, 200)
        ctx.fillText("go checkout and support Daniel Linssen at:", -470, 225);
        ctx.fillText("managore.itch.io/sunandmoon", -470, 250);
        ctx.fillText("Shoutouts to Will aka 'Yung Also Watches",-470, 275);
        ctx.fillText("Desus and Mero' Johnson for the music", -470, 300);
        ctx.fillText("and all the wonderful people who upload", -470, 325);
        ctx.fillText("free art assets to the internet <3", -470, 350);
        ctx.fillText("Thanks so much for playing!", -470, 375);
      default:
        break;
    }
  }

  const update = () => {
    player.xMove();
    if (player.inWater){
      player.update();
      breachingCollisionCheck();
    } else {
      if(!player.isDiving){
        xCollisionCheck();
      }

      player.update();
      exit.update();
      if (!player.isDiving) {
        yCollisionCheck();
      } else {
        divingCollisionCheck();
      }
    }
    checkBounds();
    checkFinishLevel();
    renderLevel();
    requestAnimFrame(() => {
      update();
    })
  }

  const checkBounds = () => {
    if (player.yPos > 1200) {
      deathAudio.play();
      player.xPos = level.playerRespawn[0];
      player.yPos = 200;
      player.ySpeed = 0;
    }
  }
  update();
}
