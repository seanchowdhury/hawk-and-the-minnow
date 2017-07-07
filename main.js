import Player from './lib/player';
import Platform from './lib/platform';
import Exit from './lib/exit';

document.addEventListener("DOMContentLoaded", () =>{
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  ctx.height = 1000;
  const background = new Image();
  background.src = "/home/sean/Desktop/hawk_and_minnow/app/assets/images/bg.png";
  background.onload = () => {
    var ptrn = ctx.createPattern(background, 'repeat-x');
    ctx.fillStyle = ptrn;
  }
  const player = new Player(50, -500);
  const platformArray = [];
  const platform = new Platform(0, 300, 900, 300);
  const platform2 = new Platform(150, 260, 150, 400);
  const platform3 = new Platform(450, 260, 150, 600);
  const platform4 = new Platform(600, 220, 150, 500);
  const platform5 = new Platform(750, 180, 150, 500);
  const exit = new Exit(815, 150);
  platformArray.push(platform);
  platformArray.push(platform2);
  platformArray.push(platform3);
  platformArray.push(platform4);
  platformArray.push(platform5);

  const clamp = (value, min, max) => {
    if(value < min) return min;
    else if(value > max) return max;
    return value;
  }
  let vx = 0;

  var motionTrailLength = 10;
  var positions = [];

  function storeLastPosition(xPos, yPos) {
    // push an item
    positions.push({
      xPos,
      yPos
    });

    //get rid of first item
    if (positions.length > motionTrailLength) {
      positions.shift();
    }
  }

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

    ctx.fillStyle = "rgba(96, 252, 255, .98)";
    ctx.fillRect(platform.xPos, platform.yPos, platform.width, platform.height)
    ctx.fillRect(platform2.xPos, platform2.yPos, platform2.width, platform2.height)
    ctx.fillRect(platform3.xPos, platform3.yPos, platform3.width, platform3.height)
    ctx.fillRect(platform4.xPos, platform4.yPos, platform4.width, platform4.height)
    ctx.fillRect(platform5.xPos, platform5.yPos, platform5.width, platform5.height)
    // for (var i = 0; i < positions.length; i++) {
    //   var ratio = (i + 1) / positions.length;
    //   const trailColor = `${player.trailColor}, ${ratio / 2})`;
    //   console.log(trailColor);
    //   ctx.fillStyle = trailColor;
    //   ctx.fillRect(positions[i].xPos-5, positions[i].yPos-5, 20, 20);
    // }
    ctx.fillStyle = player.color;
    ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
    ctx.fillStyle = `#${exit.color}`;
    ctx.fillRect(exit.xPos, exit.yPos, exit.width, exit.height);
    ctx.strokeStyle = `#${exit.borderColor}`;
    ctx.lineWidth=5;
    ctx.strokeRect(exit.xPos, exit.yPos, exit.width, exit.height);
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
        if(player.xPos + player.width + 2 >= platform.xPos && player.xPos < platform.xPos + platform.width){
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
        if (player.yPos+player.height >= platform.yPos && player.yPos < platform.yPos + platform.height) {
          player.inWater = true;
          return true;
        }
        player.inWater = false;
      }

    })
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
    renderLevel();
    requestAnimFrame(() => {
      update();
    })
  }

  const checkBounds = () => {
    if (player.yPos > 1200) {
      player.xPos = 50;
      player.yPos = 200;
      player.ySpeed = 0;
    }
  }
  update();
})
