import Player from './player';
import Platform from './platform';
import Exit from './exit';
import { levels } from './levelCreateUtil';

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
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

export const game = () => {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  const background = new Image();
  background.src = "app/assets/images/clouds1.jpg";
  background.onload = () => {
    var ptrn = ctx.createPattern(background, 'repeat-x');
    ctx.fillStyle = ptrn;
  }
  const clamp = (value, min, max) => {
    if(value < min) return min;
    else if(value > max) return max;
    return value;
  }
  let vx = 0;

  var motionTrailLength = 10;
  var positions = [];

  const storeLastPosition = (xPos, yPos) => {
    positions.push({
      xPos,
      yPos
    });

    if (positions.length > motionTrailLength) {
      positions.shift();
    }
  }
  const platformColor = 'rgb(19, 44, 86)'

  let levelCounter = 0;
  let level = levels[levelCounter];
  let player = level.player;
  let exit = level.exit;
  let platformArray = level.platformArray;
  let renderArray = level.renderArray;

  const renderLevel = () => {
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(background,vx,0);
    ctx.drawImage(background, background.width-Math.abs(vx), 0);
    if (Math.abs(vx) > background.width) {
      vx = 0;
    }
    vx -= 0.1;
    var camX = clamp(-player.xPos + canvas.width/2, 0, 2000 - canvas.width);
    var camY = clamp(-player.yPos + canvas.height/2, 0, 2000 - canvas.height);

    ctx.translate( camX, camY );
    ctx.font="15px Press-Start-2P";
    ctx.fillStyle = "black";

    if (levelCounter === 0) {
      ctx.fillText("Use the left and right arrow keys to move.",-140,400);
      ctx.fillText("Press the up arrow key to jump", 170, 100);
    }
    if (levelCounter === 1) {
      ctx.fillText("You're going to need help from your friend for this one.", -400, 100)
      ctx.fillText("Try holding the 'Z' key while jumping.", 350, 400)
    }

    ctx.fillStyle = "rgba(0, 75, 150, 1)";
    ctx.lineWidth = 2;
    if (player.inWater) {
      ctx.strokeStyle = `#${exit.color}`;
    } else {
      ctx.strokeStyle = 'white';
    }
    renderArray.forEach((platform) => {
      roundRect(ctx, platform[0], platform[1], platform[2], platform[3], 10, platformColor, platform[4])
    })
    ctx.fillStyle = player.color;
    ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
    ctx.fillStyle = `#${exit.color}`;
    ctx.lineWidth=5;
    ctx.strokeStyle = `#${exit.borderColor}`;
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
        if (player.yPos <= platform.yPos + platform.height && player.yPos > platform.yPos + (platform.height/2)) {
          player.yPos = platform.yPos + platform.height;
          player.ySpeed = 1;
          return true;
        }
        if (player.yPos+player.height >= platform.yPos) {
          if(player.yPos > platform.yPos+platform.height) {
            player.isStopped = false;
            return false;
          } else {
            player.isStopped = true;
            player.yPos = platform.yPos - player.height;
            player.ySpeed = 0;
            return true;
          }
        }
      } else {
        player.isStopped = false;
        return false;
      }
    })
  }

  const xCollisionCheck = () => {
    platformArray.some((platform) => {
      if (player.yPos+player.height > platform.yPos && player.yPos < platform.yPos + platform.height){
        if(player.xPos + player.width + 3 >= platform.xPos && player.xPos < platform.xPos + platform.width){
          player.rightBlocked = true;
        }
        if(player.xPos <= platform.xPos + platform.width + 3 && player.xPos + player.width > platform.xPos){
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
      }
    }
  }

  const update = () => {
    storeLastPosition(player.xPos, player.yPos);
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
